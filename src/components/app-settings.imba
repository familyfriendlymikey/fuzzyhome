tag app-settings

	<self>
		css w:100% of:auto

		<.button-row>

			<button
				@click=(state.view = 'home')
				@hotkey("esc")
			> "BACK"

		<.button-row>

			<button @click=api.help>
				"HELP"

			<button @click=config.cycle_theme>
				"THEME: {config.data.theme.toUpperCase!}"

		if config.data.theme is 'timed'

			<.button-row>

				<button @click=config.set_timed_theme_start>
					"light theme start: {config.data.timed_theme_start}"

				<button @click=config.set_timed_theme_end>
					"light theme end: {config.data.timed_theme_end}"

		<.button-row>

			<button @click=config.toggle_focus>
				"FOCUS ON OPEN: {config.data.focus}"

			<button @click=config.set_default_bang>
				"change default bang"

		<.button-row>

			<button @click=config.toggle_open_urls>
				"OPEN URLS: {config.data.open_urls}"
