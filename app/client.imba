let p = console.log

import { orderBy } from 'lodash'
import { version } from '../package.json'
import db from './db'
import fzi from 'fzi'
import download from 'downloadjs'
import { nanoid } from 'nanoid'
import { parse_url } from './utils'
import initial_config from './config'

let state = {
	query: ''
	links: []
	scored_links: []
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
	loading = no
	fatal_error = no
	bang = no

	get render? do mounted?

	def mount
		try
			await reload_db!
			p state.links
		catch e
			err "loading database", e
			fatal_error = yes
			return
		unless global.localStorage.fuzzyhome_visited
			await add_initial_links!
			global.localStorage.fuzzyhome_visited = yes
		await load_config!

	def add_initial_links
		let initial_links = [
			"tutorial github.com/familyfriendlymikey/fuzzyhome"
			"!brave search search.brave.com/search?q="
			"!youtube search youtube.com/results?search_query="
			"photopea photopea.com"
			"twitch twitch.tv"
			"messenger messenger.com"
			"instagram instagram.com"
			"localhost 3000 http://localhost:3000"
		]
		for link in initial_links
			try
				add_link link
			catch e
				err "adding link", e

	def validate_config
		throw _ if config.default_bang.id === null
		throw _ if config.default_bang.url === null
		throw _ if config.default_bang.img === null
		throw _ if config.default_bang.name === null
		throw _ if config.default_bang.frequency === null

	def reset_config
		p "resetting config"
		config = initial_config
		save_config!

	def save_config
		global.localStorage.fuzzyhome_config = JSON.stringify(config)

	def load_config
		try
			config = JSON.parse(global.localStorage.fuzzyhome_config)
			validate_config!
		catch
			reset_config!

	def err s, e
		p e
		window.alert("Error {s}:\n\n{e}")

	def reload_db
		state.links = await db.links.toArray()
		sort_links!

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
		return no if loading
		return no if settings_active
		let query = state.query.trim!
		return no if query === ''
		let split_query = query.split /\s+/
		return no if split_query.length < 2
		yes

	def create_link_from_text text
		text = text.trim!
		throw "text is empty" if text === ''
		let split_text = text.split(/\s+/)
		throw "no url provided" if split_text.length < 2
		let url = split_text.pop!
		let host
		{ href:url, host } = parse_url url
		let img = await fetch_image_as_base_64 host
		let name = split_text.join(" ")
		{ name, url, frequency:0, img }

	def handle_add
		loading = yes
		try
			await add_link state.query
			state.query = ''
			sort_links!
		catch e
			err "adding link", e
		loading = no

	def add_link text
		let link = await create_link_from_text text
		link.id = nanoid!
		await db.links.add link
		await reload_db!
		imba.commit!
		return link

	def handle_edit link
		def edit_link
			let input = window.prompt "Enter the new link name and url:", "{link.name} {link.url}"
			return if input === null
			try
				await update_link link, input
			catch e
				return err "editing link", e
		loading = yes
		await edit_link!
		loading = no

	def update_link old_link, new_link_text
		let new_link = await create_link_from_text new_link_text
		new_link.frequency = old_link.frequency
		let result = await db.links.update old_link.id, new_link
		throw "link id not found" if result === 0
		await reload_db!
		imba.commit!
		return new_link

	def handle_click_link link
		await increment_link_frequency link
		window.location.href = link.url

	def handle_bang
		await increment_link_frequency active_bang
		window.location.href = encoded_bang_query

	def handle_click_bang
		handle_bang!

	def navigate link
		await increment_link_frequency link
		window.location.href = link.url

	def handle_return
		if bang or state.scored_links.length < 1
			return handle_bang!
		let link = state.scored_links[selection_index]
		if link.name.startsWith '!'
			state.query = ''
			bang = link
		else
			navigate link

	def handle_del
		if state.query.length < 1
			bang = no
			sort_links!

	def handle_click_delete link
		handle_delete link

	def handle_delete link

		def delete_link
			return unless window.confirm "Do you really want to delete {link..name}?"
			try
				await db.links.delete(link.id)
			catch e
				err "deleting link", e
			try
				await reload_db!
			catch e
				err "reloading db after successful delete", e
			selection_index = Math.min selection_index, state.scored_links.length - 1

		loading = yes
		await delete_link!
		loading = no

	def handle_click_edit link
		handle_edit link

	def handle_shift_backspace
		return unless state.scored_links.length > 0
		handle_delete state.scored_links[selection_index]

	def handle_shift_return
		handle_add!

	def handle_click_add
		handle_add!

	def handle_input
		selection_index = 0
		sort_links!

	def handle_click_import e
		loading = yes
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
		settings_active = no
		loading = no

	def handle_click_export
		loading = yes
		let datetime = new Date!.toString!.split(" ")
		let date = datetime.slice(1, 4).join("-").toLowerCase!
		let time = datetime[4].split(":").join("-")
		let filename = "fuzzyhome_v{version}_{date}_{time}.json"
		const blob = await db.export({ prettyJson: yes })
		download(blob, filename, "application/json")
		settings_active = no
		loading = no

	def handle_click_github
		global.location.href = "https://github.com/familyfriendlymikey/fuzzyhome"

	def handle_paste e
		return if state.query.length > 0
		global.setTimeout(&, 0) do
			bang = config.default_bang
			handle_bang!

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
				bg:purple4/10 c:blue3 caret-color:blue3
				outline:none rd:5px
				@placeholder fs:10px c:blue3

			css .loading-container
				d:flex fld:row jc:space-around ai:center
				w:100% h:50px
				bg:purple4/10 rd:5px c:gray4

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
				c:gray4 cursor:default user-select:none

			css .links
				d:flex fld:column jc:flex-start fl:1
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
				tt:capitalize fs:20px
				overflow-wrap:anywhere

			css .bang-text
				tt:none word-break:break-all

			css .link-right
				d:flex fld:row jc:space-between ai:center

			css .link-buttons
				d:flex fld:row jc:flex-start ai:center pr:25px gap:5px

			css .link-button
				o:0
				px:7px rd:3px c:purple4 fs:15px cursor:pointer
				bd:1px solid purple4/50

			css .selected .link-button
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
				if settings_active
					<.settings-container>
						<label.settings-button .disabled=loading>
							"IMPORT"
							<input[d:none]
								disabled=loading
								@change=handle_click_import
								@click=(this.value = '')
								type="file"
							>
						<.settings-button
							.disabled=loading
							@click.if(!loading)=handle_click_export
						> "EXPORT"
						<.settings-button
							.disabled=loading
							@click.if(!loading)=handle_click_github
						> "GITHUB"
				else
					<input$main-input
						bind=state.query
						placeholder=pretty_date
						@hotkey('return').capture=handle_return
						@hotkey('shift+return').capture.if(can_add)=handle_shift_return
						@hotkey('shift+backspace').capture=handle_shift_backspace
						@hotkey('down').capture=increment_selection_index
						@hotkey('up').capture=decrement_selection_index
						@keydown.del=handle_del
						@input=handle_input
						@paste=handle_paste
						@blur=this.focus
						.disabled=loading
						disabled=loading
					>

				if state.query.trim!.split(/\s+/).length < 2
					<.middle-button
						[mt:-10px py:5px fs:25px]
						.disabled=loading
						@click.if(!loading)=toggle_settings
					> "..."
				elif can_add
					<.middle-button@click=handle_click_add> "+"
				else
					<.middle-button.disabled> "+"

				<.links>
					if bang or state.scored_links.length < 1
						<a.link.selected
							href=encoded_bang_query
							@click=handle_click_bang
						>
							<.link-left>
								<img.link-icon src=active_bang.img>
								<.name.bang-text> encoded_bang_query
							<.link-right[jc:flex-end]>
								<.frequency> active_bang.frequency
					else
						for link, index in state.scored_links
							<a.link
								href=link.url
								@pointerover=(selection_index = index)
								@click.prevent=handle_click_link(link)
								.selected=(index == selection_index)
							>
								<.link-left>
									<img.link-icon src=link.img>
									<.name> link.name
								<.link-right>
									<.link-buttons>
										<.link-button[fs:12px]@click.prevent.stop=handle_click_edit(link)> "✎"
										<.link-button@click.prevent.stop=handle_click_delete(link)> "x"
									<.frequency> link.frequency
			$main-input.focus!

imba.mount <app>
