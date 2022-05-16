let p = console.log

import { sortBy } from 'lodash'
import { version } from '../package.json'
import fzy from './utils/fzy'
import download_json_file from './utils/download'
import upload_json_file from './utils/upload'
import idb_wrapper from './utils/idb_wrapper'
import state from './state'

let db = new idb_wrapper 'fuzzyhome', 'links', 1
db.open!

global css body
	d:flex fld:column jc:flex-start ai:center
	m:0 w:100% h:100% bg:#20222f
	ff:sans-serif fw:1

tag app

	settings_active = no

	get render? do mounted?

	def mount
		unless global.localStorage.fuzzyhome_visited
			await put_link { name: "fuzzy home help", link: "github.com/familyfriendlymikey/fuzzyhome" }
			await put_link { name: "google", link: "google.com" }
			await put_link { name: "youtube", link: "youtube.com" }
			global.localStorage.fuzzyhome_visited = yes

		if not global.localStorage.fuzzyhome_config
			let search_engine_url = 'www.google.com/search?q='
			let search_engine_hostname = 'www.google.com'
			let search_engine_frequency = 0
			let search_engine_icon = await fetch_image_as_base_64 'google.com'
			state.config = {
				search_engine_url
				search_engine_hostname
				search_engine_icon
				search_engine_frequency
			}
			save_config!
		else
			load_config!

		state.links = await db.reload!
		sort_links!

	def reload_db
		state.links = await db.reload!
		sort_links!

	def navigate link
		link.last_opened = Date.now!
		link.frequency = link.frequency + 1
		await db.put link
		window.location.href = "//{link.link}"

	def sort_links
		if state.query.trim!.length > 0
			state.scored_links = fzy state.links, state.query
		else
			state.scored_links = sortBy(state.links) do |link|
				-link.frequency

	def handle_click_link link
		navigate link

	def use_search_engine
		state.config.search_engine_frequency += 1
		save_config!
		window.location.href = "//{state.config.search_engine_url}{state.query}"

	def handle_return
		if state.scored_links.length < 1
			use_search_engine!
		else
			navigate state.scored_links[0]

	def handle_shift_return
		use_search_engine!

	def name_exists query
		for { name } in state.links
			if query.trim!.toLowerCase! === name.trim!.toLowerCase!
				return yes
		return no

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

	def handle_click_create
		loading_create = yes
		let query = state.query.trim!

		if query === ''
			loading_create = no
			return

		split_query = query.split /\s+/

		if split_query.length < 2
			loading_create = no
			return

		let link = split_query.pop!
		let name = split_query.join(" ")
		await put_link { link, name }
		state.query = ''
		reload_db!
		loading_create = no

	def can_put_link text
		let split_text = text.trim!.split(/\s+/)
		return no if split_text.length < 2
		split_text.pop!
		let name = split_text.join " "
		return no if name_exists name
		return no if name.toLowerCase! === 'search'
		yes

	def put_link { link, name, frequency=1, last_opened=Date.now! }
		name = name.trim!
		return if name_exists name
		return if name.toLowerCase! === 'search'
		link = link.trim!.replace(/(^\w+:|^)\/\//, '')
		let url = new URL("https://{link}")
		let img = await fetch_image_as_base_64(url.hostname)
		await db.put { name, link, frequency, last_opened, img }

	def handle_input
		sort_links!

	def handle_click_delete link
		return unless link
		return unless window.confirm "Do you really want to delete {link..name}?"
		await db.delete link
		state.query = ''
		reload_db!

	def handle_click_import e
		loading_import = yes
		let data = await upload_json_file e

		unless Array.isArray(data)
			loading_import = no
			return

		for link in data
			await put_link(link)

		reload_db!
		loading_import = no
		settings_active = no

	def handle_click_export
		download_json_file JSON.stringify(state.links), "fuzzyhome_"
		settings_active = no

	def save_config
		global.localStorage.fuzzyhome_config = JSON.stringify(state.config)

	def load_config
		state.config = JSON.parse(global.localStorage.fuzzyhome_config)

	def handle_click_config
		let link = window.prompt("Please enter the URL of your search engine.")
		return unless link
		link = link.trim!.replace(/(^\w+:|^)\/\//, '')
		let url = new URL("https://{link}")
		state.config.search_engine_icon = await fetch_image_as_base_64 url.hostname
		state.config.search_engine_url = link
		state.config.search_engine_hostname = url.hostname
		save_config!
		settings_active = no

	def handle_paste e
		return if state.query.length > 0
		global.setTimeout(&, 0) do
			window.location.href = "//{state.config.search_engine_url}{state.query.trim!}"

	def toggle_settings
		if settings_active
			settings_active = no
		else
			settings_active = yes

	def render
		<self>

			css self
				d:flex fld:column jc:flex-start ai:center
				bxs:0px 0px 10px rgba(0,0,0,0.35)
				w:80vw h:auto max-width:700px
				p:30px box-sizing:border-box rd:10px
				mt:10vh max-height:80vh

			css .buttons
				d:flex fld:row jc:space-around w:100% h:50px
				bg:purple4/10 rd:5px

			css .button
				d:flex fld:column jc:center ai:center
				bg:none c:purple4 bd:none cursor:pointer fl:1
				fs:14px ff:sans-serif fw:1

			css $input
				bd:1px solid purple4
				w:100% h:50px ta:center fs:20px bg:none rd:5px
				bc:purple4 outline:none c:blue3 caret-color:blue3 px:20px
				transition:background 0.5s
				@focus bg:purple4/10
				@placeholder fs:10px c:blue3

			css .links
				d:flex fld:column jc:flex-start
				w:100% ofy:auto fl:1
				px:20px

			css .link
				d:flex fld:row jc:space-between ai:center
				px:15px py:10px rd:5px
				@first bg:blue3/5

			css a
				tt:capitalize td:none c:blue3 fs:20px

			css .frequency
				fs:15px c:blue3

			css .link-icon
				mr:10px rd:3px h:20px w:20px bd:none

			css .disabled
				@important c:gray4 cursor:default

			css .settings-or-create
				h:35px
				d:flex fld:column jc:center ai:center

			css .create
				d:inline fs:20px c:purple4 cursor:pointer

			css .toggle-settings
				fs:25px c:purple4 cursor:pointer d:inline mt:-10px

			css .delete
				bd:1px solid purple4/50
				transition:opacity 100ms
				px:7px rd:3px fs:15px mr:15px
				c:purple4 cursor:pointer o:0

			css .link@hover .delete
				o:100

			css .link-left
				d:flex fl:1 cursor:pointer

			css .link-right
				d:flex

			<[d:flex fld:column jc:space-between ai:center w:100%]>
				if settings_active
					<.buttons>
						if loading_import
							<.button.disabled> "IMPORT"
						else
							<label.button>
								"IMPORT"
								<input[d:none]
									@change=handle_click_import
									@click=(this.value = '')
									type="file"
								>
						<.button@click=handle_click_export> "EXPORT"
						<.button@click=handle_click_config> "CONFIG"
						<.button@click=(global.location.href="https://github.com/familyfriendlymikey/fuzzyhome")> "HELP"
				else
					<[d:flex fld:row jc:space-between ai:center w:100%]>
						<input$input
							@hotkey('mod+k').capture=$input..focus
							bind=state.query
							placeholder="v{version}"
							@hotkey('return').capture=handle_return
							@hotkey('shift+return').capture=handle_shift_return
							@hotkey('esc').capture=$input..blur
							@input=handle_input
							@paste=handle_paste
						>

				<.settings-or-create>
					if can_put_link(state.query) and not settings_active
							if loading_create
								<.create.disabled>
									"   +"
							else
								<.create@click=handle_click_create>
									"   +"
					else
						<.toggle-settings@click=toggle_settings> "..."

			if state.scored_links.length > 0
				<.links>
					for obj in state.scored_links
						<.link>
							<.link-left@click.prevent=handle_click_link(obj)>
								<img.link-icon height=20 width=20 src=obj.img>
								<a href=obj.link> obj.name
							<.link-right>
								<.delete@click=handle_click_delete(obj)> "x"
								<.frequency> obj.frequency
			else
				<.links>
					<.link>
						<.link-left>
							<img.link-icon src=state.config.search_engine_icon>
							<a[tt:none]> "Search {state.config.search_engine_hostname}"
						<.link-right>
							<.frequency> state.config.search_engine_frequency
		$input.focus!

imba.mount <app>
