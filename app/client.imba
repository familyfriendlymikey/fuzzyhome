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
	d:flex fld:column jc:center ai:center
	m:0 w:100% h:100% bg:#20222f
	ff:sans-serif fw:1

tag app

	def mount
		$input.focus!
		unless global.localStorage.fuzzyhome_visited
			await put_link { name: "fuzzy home help", link: "github.com/familyfriendlymikey/fuzzyhome" }
			await put_link { name: "google", link: "google.com" }
			await put_link { name: "youtube", link: "youtube.com" }
			global.localStorage.fuzzyhome_visited = yes
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

	def handle_return
		return if state.scored_links.length < 1
		navigate state.scored_links[0]

	def handle_shift_return
		window.location.href = 'https://www.google.com/search?q=' + state.query

	def name_exists query
		for { name } in state.links
			if query.trim!.toLowerCase! === name.trim!.toLowerCase!
				return yes
		return no

	def fetch_image_as_base_64 url
		return new Promise! do |resolve, reject|
			let res
			try
				res = await global.fetch("https://icon.horse/icon/{url}")
			catch
				reject 'icon not found error'
				return
			let blob = await res.blob!
			let reader = new FileReader!
			reader.onload = do
				resolve this.result
			reader.onerror = do
				reject 'blob to base64 error'
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

	def put_link { link, name, frequency=1, last_opened=Date.now! }
		link = link.replace(/(^\w+:|^)\/\//, '')
		let url = new URL("https://{link}")
		return if name_exists name
		let img
		try
			img = await fetch_image_as_base_64(url.hostname)
		catch
			img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAH0lEQVR42mO8seXffwYqAsZRA0cNHDVw1MBRA0eqgQCDRkbJSQHxEQAAAABJRU5ErkJggg=='
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

	def handle_click_export
		download_json_file JSON.stringify(state.links)

	def handle_paste e
		return if state.query.length > 0
		global.setTimeout(&, 0) do
			window.location.href = 'https://www.google.com/search?q=' + state.query.trim!

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
				w:80% h:80% max-width:700px min-height:205px
				p:30px box-sizing:border-box rd:10px

			css .buttons
				d:flex fld:row jc:space-around w:100% h:50px

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
				w:100% mt:10px ofy:auto fl:1
				px:20px

			css .link
				d:flex fld:row jc:space-between ai:center
				px:15px py:10px rd:5px
				@first bg:blue3/5

			css a
				tt:capitalize td:none c:blue3 fs:20px

			css .frequency
				fs:15px c:blue3

			css img
				mr:10px rd:3px h:20px w:20px bd:none

			css .disabled
				@important c:gray4 cursor:default

			css .create
				c:purple4 cursor:pointer py:10px

			css .delete
				bd:1px solid purple4/50
				transition:opacity 100ms
				px:7px rd:3px fs:15px mr:15px
				c:purple4 cursor:pointer o:0

			css .link@hover .delete
				o:100

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
						<.button@click=(global.location.href="https://github.com/familyfriendlymikey/fuzzyhome")> "HELP"
				else
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
				<[fs:25px c:purple4 cursor:pointer]@click=toggle_settings> "..."
			let split_query = state.query.trim!.split(/\s+/)
			if split_query.length > 1
				let last = split_query.pop!
				let joined = split_query.join " "
				if name_exists joined
					<.create.disabled> "name already exists"
				else
					if loading_create
						<.create.disabled>
							<span> "+ {joined} {last}"
					else
						<.create@click=handle_click_create>
							<span> "+ {joined} "
							<span[c:purple2]> last
				
			<.links>
				for obj in state.scored_links
					<.link>
						<[d:flex fl:1 cursor:pointer]@click.prevent=handle_click_link(obj)>
							<img height=20 width=20 src=obj.img>
							<a href=obj.link> obj.name
						<[d:flex]>
							<.delete@click=handle_click_delete(obj)> "x"
							<.frequency> obj.frequency

imba.mount <app>
