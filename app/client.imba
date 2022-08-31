let p = console.log

import sw from './sw.imba?serviceworker'
navigator..serviceWorker..register(sw).then! do |reg| reg.update!

import { orderBy, omit } from 'lodash'
import pkg from '../package.json'
let version = pkg.version
import db from './db'
import fzi from 'fzi'
import download from 'downloadjs'
import { nanoid } from 'nanoid'
import { parse_url } from './utils'
import initial_config from './config'
import { evaluate as eval_math } from 'mathjs'
import community_links from './community_links'

let state = {
	query: ''
	links: []
	sorted_links: []
}

global._fuzzyhome_delete_everything = do |prompt=yes|
	return if prompt and window.confirm "This will delete everything. Are you sure?"
	indexedDB.deleteDatabase("fuzzyhome")
	delete localStorage.fuzzyhome_config
	delete localStorage.fuzzyhome_visited
	location.reload!

p "fuzzyhome version {version}"

tag app

	selection_index = 0
	settings_active = no
	loading = no
	fatal_error = no
	bang = no
	holding_shift = no
	editing_link = no
	prior_query = ''
	viewing_community_links = no

	get render? do mounted?

	def mount
		unless global.localStorage.fuzzyhome_visited
			await add_initial_links!
			global.localStorage.fuzzyhome_visited = yes
		try
			await reload_db!
			p "links:", state.links
		catch e
			err "loading database", e
			fatal_error = yes
			return
		await load_config!

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

	def load_config
		try
			config = JSON.parse(global.localStorage.fuzzyhome_config)
			validate_config!
		catch
			reset_config!

	def validate_config
		p "config:", config
		throw _ if config.default_bang.id == null
		throw _ if config.default_bang.url == null
		throw _ if config.default_bang.icon == null
		throw _ if config.default_bang.name == null
		throw _ if config.default_bang.frequency == null
		throw _ if config.default_bang.display_name == null

	def reset_config
		p "resetting config"
		config = initial_config
		save_config!

	def save_config
		global.localStorage.fuzzyhome_config = JSON.stringify(config)

	def err s, e
		p "error:"
		p e
		window.alert("Error {s}:\n\n{e}")

	def reload_db
		state.links = await db.links.toArray()
		sort_links!

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

	def sort_links
		let links
		if viewing_community_links
			p community_links
			links = community_links.filter do |link|
				not state.links.some do |my_link|
					link.id is my_link.id
			p links
		else
			links = state.links

		if state.query.trim!.length > 0
			if config.enable_effective_names
				state.sorted_links = fzi links, state.query
			else
				state.sorted_links = fzi links, state.query, "display_name"
		else
			state.sorted_links = orderBy(links, ['is_pinned', 'frequency'], ['desc', 'desc'])

	def increment_link_frequency link
		try
			await db.links.update link.id, { frequency: link.frequency + 1 }
		catch e
			err "putting link", e

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
		return no if loading
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
		p omit(link, "icon")
		return link

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
		loading = yes
		await edit_link!
		loading = no

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

	def handle_click_link link
		if viewing_community_links
			add_community_link link
		elif link.is_bang
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

	def handle_delete link

		def delete_link
			try
				await db.links.delete(link.id)
			catch e
				err "deleting link", e
			try
				await reload_db!
			catch e
				err "reloading db after successful delete", e

		loading = yes
		await delete_link!
		state.query = prior_query
		prior_query = ''
		editing_link = no
		sort_links!
		selection_index = Math.min selection_index, state.sorted_links.length - 1
		loading = no

	def handle_click_edit link
		handle_edit link

	def handle_click_pin link
		link.is_pinned = !link.is_pinned
		try
			let result = await db.links.update link.id, link
			throw "Link id not found." if result is 0
		catch e
			return err "pinning link", e
		await reload_db!
		imba.commit!

	def handle_click_set_default_bang
		if editing_link.is_bang isnt true
			return err "setting default bang", "Link is not a bang."
		config.default_bang = editing_link
		save_config!
		editing_link = no
		state.query = prior_query
		prior_query = ''
		sort_links!

	def handle_shift_backspace
		if editing_link
			await handle_delete editing_link
		else
			return unless state.sorted_links.length > 0
			handle_edit selected_link

	def add_community_link link
		await db.links.add link
		await reload_db!
		imba.commit!

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
		loading = yes
		await go!
		editing_link = no
		state.query = ''
		sort_links!
		loading = no

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

	def handle_click_import e
		def handle_import
			let errors = []
			try
				let text = await e.target.files[0].text!
				var links = text.split "\n"
			catch e
				return err "importing db", e
			for link_text in links
				try
					let link = await create_link_from_text link_text
					if name_exists link.name
						throw "Name already exists, add manually if you don't mind duplicates."
					add_link link_text
				catch e
					errors.push "{link_text}\n{e}"
			if errors.length > 0
				err "importing some links", errors.join("\n\n")
		loading = yes
		await handle_import!
		settings_active = no
		loading = no

	def handle_click_export
		loading = yes
		await reload_db!
		let links = state.links.map do |link|
			construct_link_text link
		let datetime = new Date!.toString!.split(" ")
		let date = datetime.slice(1, 4).join("-").toLowerCase!
		let time = datetime[4].split(":").join("-")
		let filename = "fuzzyhome_v{version}_{date}_{time}.txt"
		download(links.join("\n"), filename, "text/plain")
		settings_active = no
		loading = no

	get math_result
		try
			let result = Number(eval_math state.query)
			throw _ if isNaN result
			result
		catch
			no

	def handle_click_github
		global.location.href = "https://github.com/familyfriendlymikey/fuzzyhome"

	def handle_paste e
		return unless config.enable_search_on_paste
		return if state.query.length > 0
		global.setTimeout(&, 0) do
			return if math_result isnt no
			bang ||= config.default_bang
			handle_bang!

	def handle_click_toggle_tips
		config.enable_tips = not config.enable_tips
		save_config!
		settings_active = no

	def handle_click_toggle_buttons
		config.enable_buttons = not config.enable_buttons
		save_config!
		settings_active = no

	def handle_click_toggle_search_on_paste
		config.enable_search_on_paste = not config.enable_search_on_paste
		save_config!
		settings_active = no

	def handle_toggle_light_theme
		config.enable_dark_theme = not config.enable_dark_theme
		save_config!
		settings_active = no

	def handle_click_toggle_effective_names
		config.enable_effective_names = not config.enable_effective_names
		save_config!
		settings_active = no

	def handle_click_toggle_simplify_ui
		config.enable_simplify_ui = not config.enable_simplify_ui
		save_config!

	get pretty_date
		Date!.toString!.split(" ").slice(0, 4).join(" ")

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

	def handle_click_view_community_links
		viewing_community_links = yes
		settings_active = no
		sort_links!

	def render

		css .disabled *
			@important c:gray4 cursor:default user-select:none pointer-events:none

		css .disabled $main-input
			@important bg:gray4/10 bc:gray4

		<self .disabled=loading>

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
				mt:10px
				gap:10px

			css .settings-button, .settings-container button
				d:flex fld:column jc:center ai:center fl:1
				bg:none c:purple4 bd:none cursor:pointer fs:14px
				bg:purple4/10 rd:5px
				h:100%

			css .middle-button
				d:flex fld:row w:100%
				c:purple4 fs:20px cursor:pointer
				fs:14px pt:15px

			css .tip
				d:flex fld:column bdr:1px solid blue3/10 min-width:0 fl:1 p:5px
				@last bd:none

			css .tip-hotkey
				fs:12px c:purple3/50

			css .tip-content
				pt:2px fs:14px c:purple3

			css .links
				d:flex fld:column jc:flex-start fl:1
				w:100% ofy:auto pt:15px

			css .link
				d:flex fld:row jc:space-between ai:center
				px:16px py:11px rd:5px cursor:pointer c:blue3

			css .link-left
				d:flex fl:1

			css .selected
				bg:blue3/5

			css a
				td:none

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
						There was an error loading the database.
						This could be due to a user setting
						disallowing local storage, or a random error.
						Consider refreshing.
						Check developer console for more information.
					"""
			if settings_active
				<.settings-container>
					<.settings-button
						@click=(settings_active = no)
					> "BACK"
				<.settings-container>
					<.settings-button
						@click.if(!loading)=handle_click_view_community_links
					>
						"VIEW COMMUNITY LINKS"
				<.settings-container>
					<label.settings-button>
						"IMPORT"
						<input[d:none]
							disabled=loading
							@change=handle_click_import
							@click=(this.value = '')
							type="file"
						>
					<.settings-button
						@click.if(!loading)=handle_click_export
					> "EXPORT"
				<.settings-container>
					<.settings-button
						@click.if(!loading)=handle_click_github
					> "TUTORIAL"
					<.settings-button
						@click.if(!loading)=handle_click_github
					> "GITHUB"
				<.settings-container>
					<.settings-button
						@click=handle_click_toggle_tips
					>
						config.enable_tips ? "DISABLE TIPS" : "ENABLE TIPS"
					<.settings-button
						@click=handle_click_toggle_buttons
					>
						config.enable_buttons ? "DISABLE BUTTONS" : "ENABLE BUTTONS"
				<.settings-container>
					<.settings-button
						@click=handle_click_toggle_search_on_paste
					>
						config.enable_search_on_paste ? "DISABLE SEARCH ON PASTE" : "ENABLE SEARCH ON PASTE"
					<.settings-button
						@click=handle_click_toggle_effective_names
					>
						config.enable_effective_names ? "DISABLE EFFECTIVE NAMES" : "ENABLE EFFECTIVE NAMES"
				<.settings-container>
					<.settings-button
						@click.if(!loading)=handle_toggle_light_theme
					>
						config.enable_dark_theme ? "DISABLE DARK THEME" : "ENABLE DARK THEME"

			else

				<.header>
					css
						d:flex fld:row w:100%

					css $main-input
						fl:1

					css .side
						c:purple3/90 fs:15px
						d:flex ja:center w:30px
						cursor:pointer

					css .side svg
						w:15px

					css .left
						d:flex jc:left

					css .right
						d:flex jc:right

					<.side.left
						@click=handle_click_toggle_simplify_ui
					>
						if config.enable_simplify_ui
							<svg src="./assets/eye-off.svg">
						else
							<svg src="./assets/eye.svg">

					<input$main-input
						bind=state.query
						# placeholder=pretty_date
						@hotkey('return').capture.if(!loading)=handle_return
						@hotkey('shift+return').capture.if(!loading)=handle_shift_return
						@hotkey('esc').capture.if(!loading)=handle_esc
						@hotkey('shift+backspace').capture.if(!loading)=handle_shift_backspace
						@hotkey('down').capture.if(!loading)=increment_selection_index
						@hotkey('up').capture.if(!loading)=decrement_selection_index
						@keydown.del.if(!loading)=handle_del
						@input.if(!loading)=handle_input
						@paste.if(!loading)=handle_paste
						@blur=this.focus
						@cut=handle_cut
						disabled=loading
					>

					let m = math_result
					if m isnt no and m.toString! isnt state.query.trim!
						<.side.right[c:blue3 fs:20px ml:10px w:unset]
							@click=handle_click_copy(m)
						> "= {Math.round(m * 100)/100}"
					else
						<.side.right @click.if(!loading)=toggle_settings>
							<svg src="./assets/settings.svg">

				if viewing_community_links
						<.middle-button>

							<.tip[jc:start ta:center fl:1]
								@click=handle_esc
							>
								<.tip-hotkey> "Esc"
								<.tip-content> "Exit Community Links"

							<.tip[jc:end ta:center fl:1]
								@click=handle_shift_return
							>
								<.tip-hotkey> "Shift + Return"
								<.tip-content> "Add To Your Links"

				elif config.enable_tips and not config.enable_simplify_ui
					if editing_link
						<.middle-button>

							<.tip[jc:start ta:left fl:1]
								@click=handle_esc
							>
								<.tip-hotkey> "Esc"
								<.tip-content> "Cancel Edits"

							if editing_link.is_bang
								<.tip[jc:end ta:center fl:1]
									@click=handle_click_set_default_bang
								>
									<.tip-hotkey> "Click"
									<.tip-content> "Set Default Bang"

							<.tip[jc:center ta:center fl:1 px:15px]
								@click=handle_shift_return
							>
								<.tip-hotkey> "Shift + Return"
								<.tip-content[of:hidden text-overflow:ellipsis white-space:nowrap]>
									"Update Link"

							<.tip[jc:end ta:right fl:1]
								@click=handle_shift_backspace
							>
								<.tip-hotkey> "Shift + Backspace"
								<.tip-content> "Delete Link"

					else
						<.middle-button>
							<.tip[jc:start ta:left fl:1] @click=handle_return>
								<.tip-hotkey> "Return"
								<.tip-content> "Navigate To Link"
							<.tip[jc:center ta:center fl:2 px:15px]
								@click=handle_shift_return
							>
								<.tip-hotkey> "Shift + Return"
								<.tip-content[of:hidden text-overflow:ellipsis white-space:nowrap]>
									<span> "Add New Link"
									<span[ws:pre]> " "
									let sq = state.query.trim!.split /\s+/
									if sq.length >= 2
										let url = sq.pop!
										<span> '"'
										<span> sq.join ' '
										<span[ws:pre]> ' '
										<span[c:blue3]> url
										<span> '"'
									else
										<span> '"'
										<span> sq.join ' '
										<span> '"'
							<.tip[jc:end ta:right fl:1]
								@click=handle_shift_backspace
							>
								<.tip-hotkey> "Shift + Backspace"
								<.tip-content> "Edit Link"

				unless editing_link
					<.links>
						if not viewing_community_links and (bang or state.sorted_links.length < 1)
							<a.link.selected
								href=encoded_bang_query
								@click=handle_click_bang
							>
								<.link-left>
									<img.link-icon src=active_bang.icon>
									<.display-name.bang-text> encoded_bang_query
								<.link-right[jc:flex-end]>
									<.frequency> active_bang.frequency
						else
							for link, index in state.sorted_links
								<a.link
									href=link.url
									@pointerover=(selection_index = index)
									@click.prevent=handle_click_link(link)
									.selected=(index is selection_index)
								>
									<.link-left>
										<img.link-icon src=link.icon>
										<.display-name
											[c:#FAD4AB]=link.is_bang
										> link.display_name
										if link.display_name isnt link.name and config.enable_effective_names
											<.name>
												<span.parens> "("
												<span> link.name
												<span.parens> ")"
									<.link-right>
										<.link-buttons .buttons-disabled=(not config.enable_buttons or config.enable_simplify_ui)>
											<.link-button@click.prevent.stop=handle_click_edit(link)>
												<svg src='./assets/edit-2.svg'>
											<.link-button@click.prevent.stop=handle_click_delete(link)>
												<svg src='./assets/trash.svg'>
											<.link-button
												@click.prevent.stop=handle_click_pin(link)
												[visibility:visible c:purple3/50]=(link.is_pinned and (index isnt selection_index or not config.enable_buttons or config.enable_simplify_ui))
											>
												<svg src='./assets/star.svg'>
										<.frequency> link.frequency
			$main-input.focus!

imba.mount <app>
