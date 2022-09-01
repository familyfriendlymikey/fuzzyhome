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
import db from './db'
import state from './state'
import api from './api'
import { config, save_config } from './config'

import app-community-links from './components/app-community-links'
import app-settings from './components/app-settings'
import app-prompt from './components/app-prompt'
import app-edit from './components/app-edit'
import app-links from './components/app-links'
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
	get config
		config
	get p
		console.log

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

	get can_add
		return no if state.loading
		return no if settings_active
		let query = state.query.trim!
		return no if query is ''
		let split_query = query.split /\s+/
		return no if split_query.length < 2
		yes

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

	def handle_input
		selection_index = 0
		sort_links!

	def name_exists new_name
		state.links.some! do |{name}| new_name is name

	def handle_paste e
		return unless config.enable_search_on_paste
		return if state.query.length > 0
		global.setTimeout(&, 0) do
			return if math_result isnt no
			bang ||= config.default_bang
			handle_bang!

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

		<self.disabled=state.loading>
			css d:flex fld:column jc:flex-start ai:center
				w:80vw max-width:700px max-height:80vh
				bxs:0px 0px 10px rgba(0,0,0,0.35)
				box-sizing:border-box p:30px rd:10px mt:10vh

			if fatal_error
				<[c:blue2]>
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
				<app-links>

imba.mount <app>
