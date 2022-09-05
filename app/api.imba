let p = console.log
import { err } from './utils'

import db from './db'
import state from './state'

import config from './config'
import { omit, orderBy } from 'lodash'
import { nanoid } from 'nanoid'
import fzi from 'fzi'
import { evaluate as eval_math } from 'mathjs'
import { cloneDeep } from 'lodash'

export default new class api

	def add_link text
		let link = await create_link_from_text text
		link.id = nanoid!
		await db.links.add link
		await reload_db!
		imba.commit!
		p omit(link, "icon")
		return link

	def update_link old_link, new_link_text
		let new_link = await create_link_from_text new_link_text
		new_link.frequency = old_link.frequency
		let result = await db.links.update old_link.id, new_link
		throw "Link id not found." if result is 0
		await reload_db!
		imba.commit!
		p omit(old_link, "icon")
		p omit(new_link, "icon")
		return new_link

	def put_link link
		try
			await db.links.update link.id, link
			if config.data.default_bang.id is link.id
				config.set_default_bang link
			await reload_db!
		catch e
			err "putting link", e

	def delete_link link
		def go
			try
				await db.links.delete(link.id)
			catch e
				return err "deleting link", e
			try
				await reload_db!
			catch e
				return err "reloading db after successful delete", e
		state.loading = yes
		await go!
		state.link_selection_index = Math.min state.link_selection_index, state.sorted_links.length - 1
		state.loading = no

	def pin_link link
		link.is_pinned = !link.is_pinned
		try
			let result = await db.links.update link.id, link
			throw "Link id not found." if result is 0
		catch e
			return err "pinning link", e
		await reload_db!
		imba.commit!

	def reload_db
		state.links = await db.links.toArray()
		sort_links!

	def increment_link_frequency link
		link.frequency += 1
		try
			await put_link link
		catch e
			err "putting link", e

	def sort_links
		if state.query.trim!.length <= 0
			state.sorted_links = orderBy(state.links, ['is_pinned', 'frequency'], ['desc', 'desc'])
		elif config.data.enable_effective_names
			state.sorted_links = fzi.sort state.query, state.links, do |x| x.name
		else
			state.sorted_links = fzi.sort state.query, state.links, do |x| x.display_name

	def name_exists new_name
		state.links.some! do |{name}| new_name is name

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
				add_link link_text
			catch e
				err "adding link", e

	def create_link_from_text text, get_icon=yes
		text = text.trim!
		throw "Text is empty." if text is ''
		let split_text = text.split(/\s+/)
		throw "No url provided." if split_text.length < 2
		let url = split_text.pop!
		let host
		{ href:url, host } = parse_url url
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
		let link = { name, display_name, is_bang, is_pinned, url, frequency:0, history:[] }
		if get_icon
			link.icon = await fetch_image_as_base_64 host
		return link

	def fetch_image_as_base_64 host
		let fallback = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAH0lEQVR42mO8seXffwYqAsZRA0cNHDVw1MBRA0eqgQCDRkbJSQHxEQAAAABJRU5ErkJggg=='
		return new Promise! do |resolve|
			let res
			try
				res = await global.fetch("https://icon.horse/icon/{host}")
			catch
				p "Failed to get icon from icon horse."
				return resolve fallback
			# todo: can i use .text() on this or something
			let blob = await res.blob!
			let reader = new FileReader!
			reader.onload = do
				resolve this.result
			reader.onerror = do
				p "Failed to get data from reader."
				resolve fallback
				return
			reader.readAsDataURL(blob)

	def toggle_effective_names
		config.data.enable_effective_names = !config.data.enable_effective_names
		config.save!
		sort_links!

	def construct_link_text link
		link.display_name = link.display_name.trim!
		link.name = link.name.trim!
		link.url = link.url.trim!
		let link_text = ""
		link_text += "!" if link.is_bang
		link_text += link.display_name
		link_text += " `{link.name}" if link.name isnt link.display_name
		link_text += " {link.url}"
		link_text

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
			let result = Number(eval_math state.query)
			throw _ if isNaN result
			throw _ if result.toString! is state.query.trim!
			result
		catch
			no

	def handle_cut e
		return unless e.target.selectionStart == e.target.selectionEnd
		let s = math_result
		s ||= state.query
		await window.navigator.clipboard.writeText(s)
		state.query = ''
		sort_links!

	def handle_add_link
		state.loading = yes
		try
			await add_link state.query
			state.query = ''
			sort_links!
		catch e
			err "adding link", e
		state.loading = no

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
		let history_item = sorted_bang_history[state.bang_selection_index]
		"{bang.url}{window.encodeURIComponent(history_item or state.query)}"

	get encoded_bang_query_nourl
		let history_item = sorted_bang_history[state.bang_selection_index]
		"{window.encodeURIComponent(history_item or state.query)}"

	def update_history bang
		let text
		if state.bang_selection_index > -1
			text = sorted_bang_history.splice(state.bang_selection_index, 1)[0]
		text ||= state.query.trim!
		return unless text
		let i = bang.history.indexOf(text)
		if i > -1
			bang.history.splice(i, 1)
		bang.history.unshift text
		try
			await put_link bang
		catch e
			err "updating bang history", e

	def delete_bang_history_item text
		let i = bang.history.indexOf(text)
		return unless i > -1
		bang.history.splice(i, 1)
		try
			await put_link bang
		catch e
			err "updating bang history", e

	def handle_bang
		await increment_link_frequency bang
		let to_navigate = encoded_bang_query
		await update_history bang
		window.location.href = to_navigate

	def unset_active_bang
		state.active_bang = no
		sort_links!

	def increment_bang_selection_index
		state.bang_selection_index = Math.min(sorted_bang_history.length - 1, state.bang_selection_index + 1)

	def decrement_bang_selection_index
		state.bang_selection_index = Math.max(-1, state.bang_selection_index - 1)

	get sorted_bang_history
		fzi.sort state.query, bang.history
