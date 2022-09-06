import download from 'downloadjs'

tag app-settings

	active = no

	def close
		active = no

	def open
		active = yes

	def handle_click_github
		global.location.href = "https://github.com/familyfriendlymikey/fuzzyhome"

	def handle_click_toggle_tips
		config.data.enable_tips = not config.data.enable_tips
		config.save!
		active = no

	def handle_click_toggle_buttons
		config.data.enable_buttons = not config.data.enable_buttons
		config.save!
		active = no

	def handle_click_toggle_search_on_paste
		config.data.enable_search_on_paste = not config.data.enable_search_on_paste
		config.save!
		active = no

	def handle_toggle_light_theme
		config.data.enable_light_theme = not config.data.enable_light_theme
		config.save!
		active = no

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
					let link = await api.create_link_from_text link_text
					if api.name_exists link.name
						throw "Name already exists, add manually if you don't mind duplicates."
					api.add_link link_text
				catch e
					errors.push "{link_text}\n{e}"
			if errors.length > 0
				err "importing some links", errors.join("\n\n")

		loading = yes
		await handle_import!
		active = no
		loading = no

	def handle_click_export
		loading = yes
		await api.reload_db!
		let links = state.links.map do |link|
			api.construct_link_text link
		let datetime = new Date!.toString!.split(" ")
		let date = datetime.slice(1, 4).join("-").toLowerCase!
		let time = datetime[4].split(":").join("-")
		let filename = "fuzzyhome_v{version}_{date}_{time}.txt"
		download(links.join("\n"), filename, "text/plain")
		active = no
		loading = no

	def render

		<self>
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

			if refs.community-links.active
				<app-community-links>

			else
				<.settings-container>

					<.settings-button
						@click=close
						@hotkey("esc")=close
						@hotkey("shift+tab")=close
					> "BACK"

				<.settings-container>

					<.settings-button @click=(refs.community-links.open! and close!)>
						"VIEW COMMUNITY LINKS"

				<.settings-container>

					<label.settings-button>
						"IMPORT"
						<input[d:none]
							disabled=state.loading
							@change=handle_click_import
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
						config.data.enable_tips ? "DISABLE TIPS" : "ENABLE TIPS"

					<.settings-button @click=handle_click_toggle_buttons>
						config.data.enable_buttons ? "DISABLE BUTTONS" : "ENABLE BUTTONS"

				<.settings-container>

					<.settings-button @click=handle_click_toggle_search_on_paste>
						config.data.enable_search_on_paste ? "DISABLE SEARCH ON PASTE" : "ENABLE SEARCH ON PASTE"

					<.settings-button @click=config.cycle_theme>
						"THEME: {config.data.theme.toUpperCase!}"

				<.settings-container>

					<.settings-button @click=api.delete_all_bang_history>
						"DELETE ALL BANG HISTORY"
