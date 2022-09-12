let p = console.log

import download from 'downloadjs'

export default class Settings

	def constructor
		store = $1

	active = no

	def open
		active = yes

	def close
		active = no

	def handle_click_github
		global.location.href = "https://github.com/familyfriendlymikey/fuzzyhome"

	def handle_click_toggle_tips
		store.config.data.enable_tips = not store.config.data.enable_tips
		store.config.save!
		close!

	def handle_click_toggle_buttons
		store.config.data.enable_buttons = not store.config.data.enable_buttons
		store.config.save!
		close!

	def handle_click_toggle_search_on_paste
		store.config.data.enable_search_on_paste = not store.config.data.enable_search_on_paste
		store.config.save!
		close!

	def handle_toggle_light_theme
		store.config.data.enable_light_theme = not store.config.data.enable_light_theme
		store.config.save!
		close!

	def handle_import e

		def handle_import
			let errors = []
			try
				let text = await e.target.files[0].text!
				var links = text.split "\n"
			catch e
				return store.err "importing db", e
			for link_text in links
				try
					let link = await create_link_from_text link_text
					if name_exists link.name
						throw "Name already exists, add manually if you don't mind duplicates."
					add_link link_text
				catch e
					errors.push "{link_text}\n{e}"
			if errors.length > 0
				store.err "importing some links", errors.join("\n\n")

		store.loading = yes
		await handle_import!
		close!
		store.loading = no
		close!

	def handle_click_export
		store.loading = yes
		await store.reload_db!
		let links = store.links.links.map do |link|
			construct_link_text link
		let datetime = new Date!.toString!.split(" ")
		let date = datetime.slice(1, 4).join("-").toLowerCase!
		let time = datetime[4].split(":").join("-")
		let filename = "fuzzyhome_v{version}_{date}_{time}.txt"
		download(links.join("\n"), filename, "text/plain")
		close!
		store.loading = no

	get view

		<div>
			css w:100%

			css .settings-container
				d:flex fld:row jc:space-around ai:center
				w:100% h:50px
				mt:10px
				gap:10px

			css .settings-button, .settings-container button
				d:flex fld:column jc:center ai:center fl:1
				bg:none bd:none cursor:pointer fs:14px
				rd:5px
				transition:background 100ms
				h:100%
				bg:$button-bg c:$button-c
				@hover bg:$button-hover-bg

			if store.community_links.active
				<(store.community_links.view)>

			else
				<.settings-container>

					<.settings-button
						@click=close
						@hotkey("esc")=close
						@hotkey("shift+tab")=close
					> "BACK"

				<.settings-container>

					<.settings-button @click=(open_community_links! and close!)>
						"VIEW COMMUNITY LINKS"

				<.settings-container>

					<label.settings-button>
						"IMPORT"
						<input[d:none]
							disabled=store.loading
							@change=handle_import
							@click=(this.value = '')
							type="file"
						>

					<.settings-button @click=handle_click_export>
						"EXPORT"

				<.settings-container>

					<.settings-button @click=handle_click_github>
						"TUTORIAL"

					<.settings-button @click=handle_click_github>
						"GITHUB"

				<.settings-container>

					<.settings-button @click=handle_click_toggle_tips>
						store.config.data.enable_tips ? "DISABLE TIPS" : "ENABLE TIPS"

					<.settings-button @click=handle_click_toggle_buttons>
						store.config.data.enable_buttons ? "DISABLE BUTTONS" : "ENABLE BUTTONS"

				<.settings-container>

					<.settings-button @click=handle_click_toggle_search_on_paste>
						store.config.data.enable_search_on_paste ? "DISABLE SEARCH ON PASTE" : "ENABLE SEARCH ON PASTE"

					<.settings-button @click=store.config.cycle_theme>
						"THEME: {store.config.data.theme.toUpperCase!}"

				<.settings-container>

					<.settings-button @click=(delete_all_bang_history! and close!)>
						"DELETE ALL BANG HISTORY"
