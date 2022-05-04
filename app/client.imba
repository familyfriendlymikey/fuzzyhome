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
		state.links = await db.reload!
		sort_links!

	def reload_db
		state.links = await db.reload!
		state.scored_links = fzy state.links, state.query

	def navigate link
		link.last_modified = Date.now!
		link.frequency = (link.frequency or 0) + 1
		await db.put link
		window.location.href = link.link

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

	def handle_click_create
		let query = state.query.trim!
		return if query === ''
		split_query = query.split /\s+/
		return if split_query.length < 2
		let link = split_query.pop!
		let name = split_query.join(" ")
		let frequency = 1
		let last_modified = Date.now!
		return if name_exists name
		await db.put { name, link, frequency, last_modified }
		state.query = ''
		reload_db!

	def handle_input
		sort_links!

	def handle_click_delete
		let link = state.scored_links[0]
		return unless link
		return unless window.confirm "Do you really want to delete {link..name}?"
		await db.delete link
		state.query = ''
		reload_db!

	def handle_click_import e
		let data = await upload_json_file e
		return unless Array.isArray(data)
		for link in data
			if name_exists link.name
				console.log "Name already exists: {link.name}"
				continue
			await db.put { name: link.name, link: link.link }
		reload_db!

	def handle_click_export
		download_json_file JSON.stringify(state.links)

	def handle_paste e
		return if state.query.length > 0
		global.setTimeout(&, 0) do
			window.location.href = 'https://www.google.com/search?q=' + state.query.trim!

	def render
		<self>

			css self
				d:flex fld:column jc:flex-start ai:center
				bxs:0px 0px 10px rgba(0,0,0,0.35)
				w:80% h:80% max-width:700px min-height:205px
				p:40px pt:20px box-sizing:border-box rd:10px

			css .buttons
				d:flex fld:row jc:space-around w:100% h:50px

			css button, label
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
				g:20px w:100% mt:20px ofy:auto fl:1
				px:20px

			css .link
				d:flex fld:row jc:space-between ai:center

			css a
				tt:capitalize td:none c:blue3 fs:20px

			css .frequency
				fs:15px c:blue3

			css img
				mr:10px rd:3px h:20px w:20px

			<.buttons>
				<button@click=handle_click_create> "CREATE"
				<button@click=handle_click_delete> "DELETE"
				<button@click=handle_click_export> "EXPORT"
				<label>
					"IMPORT"
					<input[d:none]
						@change=handle_click_import
						@click=(this.value = '')
						type="file"
					>
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
			<.links>
				for obj in state.scored_links
					<.link@click.prevent=handle_click_link(obj)>
						<[d:flex]>
							<img height=20 width=20 src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url={obj.link}">
							<a href=obj.link> obj.name
						<.frequency> obj.frequency or 0

imba.mount <app>
