tag app-settings

	<self>
		css w:100% of:auto

		css .settings-container
			d:flex fld:row jc:space-around ai:center
			w:100% h:50px
			mt:10px
			gap:10px

		css .settings-button
			bg:none bd:none fs:14px d:box fl:1
			rd:5px tt:uppercase
			transition:background 100ms
			h:100% px:5px
			of:hidden text-overflow:ellipsis white-space:nowrap
			bg:$button-bg c:$button-c
			@hover bg:$button-hover-bg

		<.settings-container>

			<.settings-button
				@click=(state.view = 'home')
				@hotkey("esc")
			> "BACK"

		<.settings-container>

			<.settings-button @click=api.help>
				"HELP"

			<.settings-button @click=config.cycle_theme>
				"THEME: {config.data.theme.toUpperCase!}"

		if config.data.theme is 'timed'

			<.settings-container>

				<.settings-button@click=config.set_timed_theme_start>
					"light theme start: {config.data.timed_theme_start}"

				<.settings-button@click=config.set_timed_theme_end>
					"light theme end: {config.data.timed_theme_end}"

		<.settings-container>

			<.settings-button @click=config.toggle_focus>
				"FOCUS ON OPEN: {config.data.focus}"

			<.settings-button @click=config.set_default_bang>
				"change default bang"

		<.settings-container>

			<.settings-button @click=config.toggle_open_urls>
				"OPEN URLS: {config.data.open_urls}"
