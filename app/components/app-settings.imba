tag app-settings

	active = no

	def end
		active = no

	def handle_click_github
		global.location.href = "https://github.com/familyfriendlymikey/fuzzyhome"

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

	def render

		<self>

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

			if $community-links.active
				<community-links>
			else
				<.settings-container>
					<.settings-button
						@click=end
						@hotkey("esc")=end
					> "BACK"
				<.settings-container>
					<.settings-button
						@click.if(!loading)=$community-links.open
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

				<.settings-container>
					<.settings-button
						@click.if(!loading)=handle_toggle_light_theme
					>
						config.enable_dark_theme ? "DISABLE DARK THEME" : "ENABLE DARK THEME"
