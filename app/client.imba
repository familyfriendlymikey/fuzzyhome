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
	ff:sans-serif

tag app

	def mount
		$input.focus!
		state.links = await db.reload!
		state.scored_links = state.links

	def reload_db
		state.links = await db.reload!
		state.scored_links = fzy state.links, state.query

	def handle_return
		window.location.href = state.scored_links[0].link

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
		return if name_exists name
		await db.put { name, link }
		state.query = ''
		reload_db!

	def handle_input
		state.scored_links = fzy state.links, state.query

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
				fs:14px ff:sans-serif

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

			css a
				tt:capitalize td:none fs:20px c:blue3

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
			>
			<.links>
				for { name, link } in state.scored_links
					<a href=link> name

imba.mount <app>
