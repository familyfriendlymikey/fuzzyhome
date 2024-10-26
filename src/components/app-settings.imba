tag app-settings

	<self>
		css w:100% of:auto d:htl flw:wrap g:10px
			> fl:49% h:50px miw:max-content

		<button @click=(state.view = 'home') @hotkey("esc")>
			css w:100% fl:none
			"BACK"

		<button @click=api.help>
			"HELP"

		<button @click=config.cycle_theme>
			"THEME: {config.data.theme.toUpperCase!}"

		if config.data.theme is 'timed'

			<button @click=config.set_timed_theme_start>
				"LIGHT THEME START: {config.data.timed_theme_start}"

			<button @click=config.set_timed_theme_end>
				"LIGHT THEME END: {config.data.timed_theme_end}"

		<button @click=config.toggle_focus>
			"FOCUS ON OPEN: {config.data.focus}"

		<button @click=config.set_default_bang>
			"CHANGE DEFAULT BANG"

		<button @click=config.toggle_open_urls>
			"OPEN URLS: {config.data.open_urls}"

		if config.data.open_urls
			<button @click=config.set_url_regex>
				"URL REGEX: {config.data.url_regex}"

		<button @click=config.toggle_case>
			"CASE: {config.data.case.toUpperCase!}"

		for own k,v of config.data.hotkey
			<button @click=config.set_hotkey(k)>
				"HOTKEY {k.toUpperCase!.a-z}: {v}"
