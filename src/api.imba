import state from './state.imba'

import config from './config.imba'
import { find, omit, orderBy } from 'lodash'
import fzi from 'fzi'
import { cloneDeep } from 'lodash'
import Mexp from 'math-expression-evaluator'
let mexp = new Mexp

export default new class api

	def reload-bookmarks
		let bookmarks = await global.chrome.bookmarks.getTree!
		const bookmarks-bar = bookmarks[0].children[0].children
		state.links = traverse bookmarks-bar

		# CONVERTING OLD BANGS
		for link in state.links
			if /^!/.test(link.name)
				link.url += '$0'
				link.name = link.name.slice(1)
				save(link)

		sort_links!
		state.loaded = yes
		imba.commit!
		state.links

	def save link
		await global.chrome.bookmarks.update link.id,
			title: link.name
			url: link.url

	def pin_link link
		Pins[link.url] ^= 1
		sort_links!
		global.chrome.storage.sync.set {pins:Pins}
		imba.commit!

	def edit-link link
		state.editing-link = link

	def increment_link_frequency link
		# CONVERTING OLD TYPE OF FREQ STORAGE
		Frequencies[link.id] = Math.max((Frequencies[link.id] or 0), (Frequencies[link.url] or 0))
		Frequencies[link.id] += 1

		# Chrome sync storage can only be
		# - 8kb per item
		# - 100kb total
		# - 512 items total
		# So < 512 frequencies is the max

		let key = "freq_{link.id}"
		let val = Frequencies[link.id]
		try await global.chrome.storage.sync.set {[key]:val}

	def get-link-from-node { id, title, url }
		return unless url
		{
			id
			url
			name: title.split(/\s+/).join(" ")
			get display-name
				return name unless alias
				name.split(" ").slice(0,-1).join(" ")
			get bang?
				/\$\d+/.test(url)
			get alias
				let split-text = name.split " "
				let last = split-text[-1]
				if last.startsWith("(") and last.endsWith(")")
					split-text.pop!.slice(1,-1)
		}

	def traverse stack
		const links = []
		while stack.length > 0
			const node = stack.pop!
			const link = get-link-from-node(node)
			links.push(link) if link
			node..children..forEach do stack.push $1
		links

	def bfs title, queue
		while queue.length > 0
			const node = queue.shift!
			return node.children if node.title.toLowerCase! is title.toLowerCase!
			if node.children
				queue = queue.concat(node.children)

	def sort_links
		if state.query.trim!.length <= 0
			const pinned = do Pins[$1.url] or no
			const freq = do Math.max((Frequencies[$1.id] or 0), (Frequencies[$1.url] or 0))
			state.sorted_links = orderBy(state.links, [pinned, freq], ['desc', 'desc'])
		else
			state.sorted_links = fzi.search state.query, state.links, (do $1.name), (do $1.alias)

	def parse_url url
		throw "invalid url" if url === null
		let get_url = do |s|
			let url = new URL s
			throw _ unless (url.host and url.href)
			url
		try
			return get_url url
		try
			return get_url "https://{url}"
		throw "invalid url"

	def get_pretty_date
		Date!.toString!.split(" ").slice(0, 4).join(" ")

	get selected_link
		state.sorted_links[state.link_selection_index]

	def set_link_selection_index index
		state.link_selection_index = index

	def increment_link_selection_index
		set_link_selection_index Math.min(state.sorted_links.length - 1, state.link_selection_index + 1)

	def decrement_link_selection_index
		set_link_selection_index Math.max(0, state.link_selection_index - 1)

	def navigate link
		await increment_link_frequency link
		window.location.href = link.url
		state.query = ''

	get math_result
		try
			mexp.eval(state.query)
		catch
			no

	def handle_cut e
		return unless e.target.selectionStart == e.target.selectionEnd
		let s = math_result
		s ||= state.query
		await window.navigator.clipboard.writeText(s)
		state.query = ''
		sort_links!

	def handle_click_link link
		link ??= selected_link
		if link.bang?
			state.query = ''
			state.active_bang = link
		else
			navigate link

	get bang
		state.active_bang or config.data.default_bang

	get encoded_bang_query
		bang.url.replace /\$\d+/g, do
			return window.encodeURIComponent(state.query) if $1 is '$0'
			let i = parseInt($1.slice(1)) - 1
			let replacement = state.query.split(/\t/)[i] or ''
			window.encodeURIComponent(replacement)

	get url-query
		return unless config.data.open_urls
		let re = new RegExp(config.data.url_regex)
		return unless re.test state.query.trim!
		let q = state.query.trim!
		unless /^https?:\/\//.test(q)
			q = 'https://' + q
		q

	def handle_url
		window.location.href = url-query
		state.query = ''

	def handle_bang
		return if state.loading
		await increment_link_frequency bang
		window.location.href = encoded_bang_query
		state.query = ''

	def unset_active_bang
		state.active_bang = no
		sort_links!

	def get-icon url
		let { host } = parse_url url
		"https://icon.horse/icon/{host}"

	def help
		let url = "https://github.com/familyfriendlymikey/fuzzyhome"
		window.open url,'_blank'
