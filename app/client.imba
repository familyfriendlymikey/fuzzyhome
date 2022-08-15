let p = console.log

import { orderBy } from 'lodash'
import { version } from '../package.json'
import db from './db'
import fzi from 'fzi'
import download from 'downloadjs'
import { nanoid } from 'nanoid'

let state = {
	query: ''
	links: []
	scored_links: []
}

let config = {
	search_engine: {}
}

global._fuzzyhome_delete_everything = do
	return unless window.confirm "This will delete everything. Are you sure?"
	indexedDB.deleteDatabase("fuzzyhome")
	delete localStorage.fuzzyhome_config
	delete localStorage.fuzzyhome_visited

p "fuzzyhome version {version}"

tag app

	selection_index = 0
	settings_active = no
	loading_add = no
	fatal_error = no

	get render? do mounted?

	def mount
		try
			await reload_db!
		catch e
			err "loading database", e
			fatal_error = yes
			return
		unless global.localStorage.fuzzyhome_visited
			await add_link { name: "help", url: "github.com/familyfriendlymikey/fuzzyhome" }
			await add_link { name: "google", url: "google.com" }
			await add_link { name: "youtube", url: "youtube.com" }
			await add_link { name: "3000", url: "localhost:3000" }
			global.localStorage.fuzzyhome_visited = yes

		if not global.localStorage.fuzzyhome_config
			let url = 'www.google.com/search?q='
			let hostname = 'www.google.com'
			let frequency = 0
			let icon = await fetch_image_as_base_64 'google.com'
			config.search_engine = { url, hostname, icon, frequency }
			save_config!
		else
			load_config!

	def save_config
		global.localStorage.fuzzyhome_config = JSON.stringify(config)

	def load_config
		config = JSON.parse(global.localStorage.fuzzyhome_config)

	def err s, e
		p e
		window.alert("Error {s}:\n\n{e}")

	def reload_db
		state.links = await db.links.toArray()
		sort_links!

	def can_add
		return no if loading_add
		return no if settings_active
		await get_valid_link(state.query)

	def sort_links
		if state.query.trim!.length > 0
			state.scored_links = fzi state.links, state.query
		else
			state.scored_links = orderBy(state.links, 'frequency', 'desc')

	def increment_link_frequency link
		try
			await db.links.update link.id, { frequency: link.frequency + 1 }
		catch e
			err "putting link", e

	def toggle_settings
		settings_active = !settings_active

	def increment_selection_index
		selection_index = Math.min(state.scored_links.length - 1, selection_index + 1)

	def decrement_selection_index
		selection_index = Math.max(0, selection_index - 1)

	def increment_search_engine_frequency
		config.search_engine.frequency += 1
		save_config!

	get encoded_search_query
		let encoded_query = window.encodeURIComponent(state.query)
		"{config.search_engine.url}{encoded_query}"

	def use_search_engine
		increment_search_engine_frequency!
		window.location.href = "//{encoded_search_query}"

	def fetch_image_as_base_64 url
		let fallback = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAH0lEQVR42mO8seXffwYqAsZRA0cNHDVw1MBRA0eqgQCDRkbJSQHxEQAAAABJRU5ErkJggg=='
		return new Promise! do |resolve|
			let res
			try
				res = await global.fetch("https://icon.horse/icon/{url}")
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

	def get_valid_link text
		text = text.trim!
		return no if text === ''
		let split_text = text.split(/\s+/)
		return no if split_text.length < 2
		let url = split_text.pop!
		let name = split_text.join(" ")
		{ name, url }

	def strip_url url
		url.trim!.replace(/(^\w+:|^)\/\//, '')

	def add_link { url, name, frequency=1 }
		name = name.trim!
		url = strip_url url
		let img = await fetch_image_as_base_64(url)
		let id = nanoid!
		let link = { id, name, url, frequency, img }
		try
			await db.links.add link
			await reload_db!
		catch e
			err "adding link", e

	def handle_click_link link
		await increment_link_frequency link
		window.location.href = "//{link.url}"

	def handle_click_search
		increment_search_engine_frequency!

	def handle_return
		if state.scored_links.length < 1
			use_search_engine!
		else
			let link = state.scored_links[selection_index]
			await increment_link_frequency link
			window.location.href = "//{link.url}"

	def handle_click_add
		loading_add = yes
		let link = await get_valid_link(state.query)
		unless link
			err "adding link", "Invalid link."
			return
		await add_link(link)
		state.query = ''
		sort_links!
		loading_add = no

	def handle_input
		selection_index = 0
		sort_links!

	def handle_click_delete link
		return unless window.confirm "Do you really want to delete {link..name}?"
		try
			await db.links.delete(link.id)
		catch e
			err "deleting link", e
		state.query = ''
		try
			await reload_db!
		catch e
			err "reloading db after successful delete", e

	def handle_click_import e
		loading_import = yes
		let id_exists = do |newid|
			state.links.some! do |{id}| newid === id
		let filter = do |table, value, key|
			table === 'links' and not id_exists value.id
		try
			await reload_db!
			await db.import(e.target.files[0], { filter })
			await reload_db!
		catch e
			err "importing db", e
		loading_import = no
		settings_active = no

	def set_search_engine url
		let hostname = new URL("https://{url}").hostname
		let icon = await fetch_image_as_base_64 hostname
		config.search_engine = { url, hostname, icon }
		save_config!

	def handle_click_export
		let datetime = new Date!.toString!.split(" ")
		let date = datetime.slice(1, 4).join("-").toLowerCase!
		let time = datetime[4].split(":").join("-")
		let filename = "fuzzyhome_{date}_{time}.json"
		const blob = await db.export({ prettyJson: yes })
		download(blob, filename, "application/json")
		settings_active = no

	def handle_click_config
		let input = window.prompt("Please enter the URL of your search engine.")
		let url = input.trim!.replace(/(^\w+:|^)\/\//, '')
		unless url
			err "changing search engine", "Invalid URL."
			return
		set_search_engine url
		settings_active = no

	def handle_click_github
		global.location.href = "https://github.com/familyfriendlymikey/fuzzyhome"

	def handle_paste e
		return if state.query.length > 0
		global.setTimeout(&, 0) do
			use_search_engine!

	get pretty_date
		Date!.toString!.split(" ").slice(0, 4).join(" ")

	def render
		<self>

			css body
				d:flex fld:column jc:flex-start ai:center
				m:0 w:100% h:100% bg:#20222f
				ff:sans-serif fw:1
				user-select:none

			css self
				d:flex fld:column jc:flex-start ai:center
				w:80vw max-width:700px max-height:80vh
				bxs:0px 0px 10px rgba(0,0,0,0.35)
				box-sizing:border-box p:30px rd:10px mt:10vh

			css .fatal
				c:blue2

			css $main-input
				w:100% h:50px px:20px
				fs:20px ta:center
				bd:1px solid purple4
				bg:none c:blue3 caret-color:blue3
				outline:none rd:5px
				@focus bg:purple4/10
				@placeholder fs:10px c:blue3

			css .settings-container
				d:flex fld:row jc:space-around ai:center
				w:100% h:50px
				bg:purple4/10 rd:5px

			css .settings-button
				d:flex fld:column jc:center ai:center fl:1
				bg:none c:purple4 bd:none cursor:pointer fs:14px

			css .middle-button
				d:flex fld:column jc:center ai:center
				h:35px c:purple4 fs:20px cursor:pointer
				fs:20px

			css .disabled
				@important c:gray4 cursor:default

			css .links
				d:flex fld:column jc:flex-start
				w:100% ofy:auto

			css .link
				d:flex fld:row jc:space-between ai:center
				px:15px py:10px rd:5px cursor:pointer c:blue3

			css .link-left
				d:flex fl:1

			css .selected
				bg:blue3/5

			css a
				td:none

			css .link-icon
				w:20px h:20px mr:10px rd:3px

			css .name
				tt:capitalize fs:20px word-wrap:anywhere

			css .link-right
				d:flex fld:row jc:space-between ai:center w:70px

			css .delete
				o:0
				px:7px rd:3px c:purple4 fs:15px cursor:pointer
				bd:1px solid purple4/50

			css .selected .delete
				o:100

			css .frequency
				fs:15px

			if fatal_error
				<.fatal>
					"""
						There was an error loading the database.
						This could be due to a user setting
						disallowing local storage, or a random error.
						Consider refreshing.
						Check developer console for more information.
					"""
			else
				unless settings_active
					<input$main-input
						bind=state.query
						placeholder=pretty_date
						@hotkey('return').capture=handle_return
						@hotkey('down').capture=increment_selection_index
						@hotkey('up').capture=decrement_selection_index
						@input=handle_input
						@paste=handle_paste
						@blur=this.focus
					>
				else
					<.settings-container>
						unless loading_import
							<label.settings-button>
								"IMPORT"
								<input[d:none]
									@change=handle_click_import
									@click=(this.value = '')
									type="file"
								>
						else
							<.settings-button.disabled> "IMPORT"
						<.settings-button@click=handle_click_export> "EXPORT"
						<.settings-button@click=handle_click_config> "CONFIG"
						<.settings-button@click=handle_click_github> "GITHUB"

				if state.query.trim!.split(/\s+/).length < 2
					<.middle-button[mt:-10px py:5px fs:25px]@click=toggle_settings> "..."
				elif await can_add!
					<.middle-button@click=handle_click_add> "+"
				else
					<.middle-button.disabled> "+"

				<.links>
					if state.scored_links.length > 0
						for link, index in state.scored_links
							<a.link
								href="//{link.url}"
								@pointerover=(selection_index = index)
								@click.prevent=handle_click_link(link)
								.selected=(index == selection_index)
							>
								<.link-left>
									<img.link-icon src=link.img>
									<.name> link.name
								<.link-right>
									<.delete@click.prevent.stop=handle_click_delete(link)> "x"
									<.frequency> link.frequency
					else
						<a.link.selected
							href="//{encoded_search_query}"
							@click=handle_click_search
						>
							<.link-left>
								<img.link-icon src=config.search_engine.icon>
								<.name[tt:none]> encoded_search_query
							<.link-right[jc:flex-end]>
								<.frequency> config.search_engine.frequency
			$main-input.focus!

imba.mount <app>
