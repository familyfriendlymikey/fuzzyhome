import state from './state.imba'

import config from './config.imba'
import { find, omit, orderBy } from 'lodash'
import fzi from 'fzi'
import { cloneDeep } from 'lodash'
import mexp from 'math-expression-evaluator'

export default new class api

	def pin_link link
		Pins[link.url] ^= 1
		sort_links!
		global.chrome.storage.sync.set {pins:Pins}
		imba.commit!

	def increment_link_frequency link
		Frequencies[link.url] ??= 0
		Frequencies[link.url] += 1
		global.chrome.storage.sync.set {frequencies:Frequencies}

	def get-link-from-node node
			return unless let url = node..url
			let split_text = node.title.split	/\s+/
			let alias
			let last = split_text[-1]
			if last.startsWith("(")	and	last.endsWith(")")
				alias = split_text.pop!.slice(1,-1)
			let name = split_text.join(" ")
			let is_bang = no
			if name.startsWith "!"
				is_bang = yes
				name = name.slice(1)
			{ name, alias, is_bang, url }

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
			const freq = do Frequencies[$1.url] or 0
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

	def handle_click_link
		let link = selected_link
		if link.is_bang
			state.query = ''
			state.active_bang = link
		else
			navigate link

	get bang
		state.active_bang or config.data.default_bang

	get encoded_bang_query
		"{bang.url}{window.encodeURIComponent(state.query)}"

	get encoded_bang_query_nourl
		"{window.encodeURIComponent(state.query)}"

	def handle_bang
		return if state.loading
		await increment_link_frequency bang
		window.location.href = encoded_bang_query

	def unset_active_bang
		state.active_bang = no
		sort_links!

	def get-icon url
		let { host } = parse_url url
		"https://icon.horse/icon/{host}"

	def help
		let url = "https://github.com/familyfriendlymikey/fuzzyhome"
		window.open url,'_blank'