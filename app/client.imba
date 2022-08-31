# TODO, deal with these 3:
# editing_link = no
# prior_query = ''
# viewing_community_links = yes


let p = console.log

# import sw from './sw.imba?serviceworker'
# navigator..serviceWorker..register(sw).then! do |reg| reg.update!

import fzi from 'fzi'
import download from 'downloadjs'
import { nanoid } from 'nanoid'
import { evaluate as eval_math } from 'mathjs'

import pkg from '../package.json'
let version = pkg.version
import { parse_url } from './utils'
import db from './db'
import state from './state'
import api from './api'
import { config, save_config } from './config'

import app-community-links from './components/app-community-links'
import app-settings from './components/app-settings'
import app-prompt from './components/app-prompt'
import app-edit from './components/app-edit'
import './styles'

p "fuzzyhome version {version}"

global._fuzzyhome_delete_everything = do |prompt=yes|
	return if prompt and window.confirm "This will delete everything. Are you sure?"
	indexedDB.deleteDatabase("fuzzyhome")
	delete localStorage.fuzzyhome_config
	delete localStorage.fuzzyhome_visited
	location.reload!

extend tag element
	get state
		state
	get api
		api

tag app

	fatal_error = no

	get render? do mounted?

	def mount
		unless global.localStorage.fuzzyhome_visited
			await add_initial_links!
			global.localStorage.fuzzyhome_visited = yes
		try
			await api.reload_db!
			p "links:", state.links
		catch e
			err "state.loading database", e
			fatal_error = yes
			return

	def add_initial_links
		let initial_links = [
			"tutorial github.com/familyfriendlymikey/fuzzyhome"
			"!brave search `b search.brave.com/search?q="
			"!youtube youtube.com/results?search_query="
			"photopea photopea.com"
			"twitch twitch.tv"
			"messenger `me messenger.com"
			"instagram `in instagram.com"
			"localhost `3000 http://localhost:3000"
		]
		for link_text in initial_links
			try
				api.add_link link_text
			catch e
				err "adding link", e

	def err s, e
		p "error:"
		p e
		window.alert("Error {s}:\n\n{e}")

	get selected_link
		state.sorted_links[selection_index]

	get tip_url
		let split_query = state.query.trim!.split /\s+/
		if split_query.length >= 2
			return ' https://' + split_query.pop!
		else
			return ''

	get tip_name
		let split_query = state.query.trim!.split /\s+/
		let name = split_query.join ' '
		if split_query.length >= 2
			split_query.pop!
			if split_query[-1].startsWith '~'
				split_query.pop!
			name = split_query.join ' '
			if name.startsWith '!'
				name = name.slice(1)
		name

	def toggle_settings
		settings_active = !settings_active

	def increment_selection_index
		selection_index = Math.min(state.sorted_links.length - 1, selection_index + 1)

	def decrement_selection_index
		selection_index = Math.max(0, selection_index - 1)

	get active_bang
		return bang or config.default_bang

	get encoded_bang_query
		"{active_bang.url}{window.encodeURIComponent(state.query)}"

	def fetch_image_as_base_64 host
		let fallback = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAH0lEQVR42mO8seXffwYqAsZRA0cNHDVw1MBRA0eqgQCDRkbJSQHxEQAAAABJRU5ErkJggg=='
		return new Promise! do |resolve|
			let res
			try
				res = await global.fetch("https://icon.horse/icon/{host}")
			catch
				p "Failed to get icon from icon horse."
				resolve fallback
				return
			let blob = await res.blob!
			let reader = new FileReader!
			reader.onload = do
				resolve this.result
			reader.onerror = do
				p "Failed to get data from reader."
				resolve fallback
				return
			reader.readAsDataURL(blob)

	get can_add
		return no if state.loading
		return no if settings_active
		let query = state.query.trim!
		return no if query is ''
		let split_query = query.split /\s+/
		return no if split_query.length < 2
		yes

	def create_link_from_text text
		text = text.trim!
		throw "Text is empty." if text is ''
		let split_text = text.split(/\s+/)
		throw "No url provided." if split_text.length < 2
		let url = split_text.pop!
		let host
		{ href:url, host } = parse_url url
		let icon = await fetch_image_as_base_64 host
		let name
		if split_text[-1].startsWith "`"
			name = split_text.pop!.slice(1)
		let display_name = split_text.join(" ")
		let is_bang = no
		let is_pinned = no
		if display_name.startsWith "!"
			is_bang = yes
			display_name = display_name.slice(1)
		name ||= display_name
		{ name, display_name, is_bang, is_pinned, url, frequency:0, icon }

	def handle_add
		state.loading = yes
		try
			await api.add_link state.query
			state.query = ''
			sort_links!
		catch e
			err "adding link", e
		state.loading = no

	def construct_link_text link
		let link_text = ""
		link_text += "!" if link.is_bang
		link_text += link.display_name
		link_text += " `{link.name}" if link.name isnt link.display_name
		link_text += " {link.url}"
		link_text

	def handle_edit link
		prior_query = state.query
		editing_link = link
		state.query = construct_link_text(link)

	def make_edit link, new_link_text
		def edit_link
			try
				await update_link link, new_link_text
			catch e
				return err "editing link", e
		state.loading = yes
		await edit_link!
		state.loading = no

	def handle_click_link link
		if link.is_bang
			state.query = ''
			bang = link
		else
			navigate link

	def handle_bang
		await increment_link_frequency active_bang
		window.location.href = encoded_bang_query

	def handle_click_bang
		handle_bang!

	def navigate link
		await increment_link_frequency link
		window.location.href = link.url

	def handle_return
		return if editing_link
		if bang or state.sorted_links.length < 1
			return handle_bang!
		let link = selected_link
		if link.is_bang
			state.query = ''
			bang = link
		else
			navigate link

	def handle_del
		if state.query.length < 1
			bang = no
			sort_links!

	def handle_click_delete link
		return unless window.confirm "Do you really want to delete {link..display_name}?"
		handle_delete link

	def handle_click_edit link
		handle_edit link

	def handle_click_pin link
		api.pin_link link

	def handle_shift_backspace
		if editing_link
			await handle_delete editing_link
		else
			return unless state.sorted_links.length > 0
			handle_edit selected_link

	def handle_shift_return
		def go
			if viewing_community_links
				try
					await add_community_link selected_link
				catch e
					err "adding community link", e
			elif editing_link
				try
					await update_link editing_link, state.query
				catch e
					err "updating link", e
			else
				handle_add!
		state.loading = yes
		await go!
		editing_link = no
		state.query = ''
		sort_links!
		state.loading = no

	def handle_esc
		if editing_link
			editing_link = no
			state.query = prior_query
			prior_query = ''
		elif viewing_community_links
			viewing_community_links = no
		sort_links!

	def handle_click_add
		handle_add!

	def handle_input
		selection_index = 0
		sort_links!

	def name_exists new_name
		state.links.some! do |{name}| new_name is name

	get math_result
		try
			let result = Number(eval_math state.query)
			throw _ if isNaN result
			result
		catch
			no

	def handle_paste e
		return unless config.enable_search_on_paste
		return if state.query.length > 0
		global.setTimeout(&, 0) do
			return if math_result isnt no
			bang ||= config.default_bang
			handle_bang!

	def handle_click_toggle_simplify_ui
		config.enable_simplify_ui = not config.enable_simplify_ui
		save_config!

	def handle_click_copy s
		try
			await window.navigator.clipboard.writeText(s)
			state.query = ''
			sort_links!

	def handle_cut e
		return unless e.target.selectionStart == e.target.selectionEnd
		let s = math_result
		s ||= state.query
		await window.navigator.clipboard.writeText(s)
		state.query = ''
		sort_links!

	def render

		<self .disabled=state.loading>

			css self
				d:flex fld:column jc:flex-start ai:center
				w:80vw max-width:700px max-height:80vh
				bxs:0px 0px 10px rgba(0,0,0,0.35)
				box-sizing:border-box p:30px rd:10px mt:10vh

			css .fatal
				c:blue2

			css .loading-container
				d:flex fld:row jc:space-around ai:center
				w:100% h:50px
				bg:purple4/10 rd:5px c:gray4

			css .links
				d:flex fld:column jc:flex-start fl:1
				w:100% ofy:auto pt:15px

			css .link
				d:flex fld:row jc:space-between ai:center
				px:16px py:11px rd:5px cursor:pointer c:blue3

			css .link-left
				d:flex fl:1

			css .link-icon
				w:20px h:20px mr:10px rd:3px

			css .display-name
				tt:capitalize fs:20px
				overflow-wrap:anywhere

			css .name
				d:flex ja:center
				c:gray4 ml:10px fs:14px

			css .parens
				fs:10px c:gray4/80

			css .bang-text
				tt:none word-break:break-all

			css .link-right
				d:flex fld:row jc:space-between ai:center

			css .link-buttons
				d:flex fld:row jc:flex-start ai:center pr:25px gap:5px

			css .link-button
				visibility:hidden
				rd:3px c:purple4 fs:15px cursor:pointer
				px:3px

			css .link-button svg
				w:15px

			css .selected .link-button
				visibility:visible

			css .buttons-disabled .link-button
				visibility:hidden

			css .frequency
				fs:15px ml:7px

			if fatal_error
				<.fatal>
					"""
						There was an error state.loading the database.
						This could be due to a user setting
						disallowing local storage, or a random error.
						Consider refreshing.
						Check developer console for more information.
					"""

			elif $acl.active
				<app-community-links$acl>

			elif $as.active
				<app-settings$as>

			elif $ae.active
				<app-edit$ae>

			else
				<links>

imba.mount <app>
