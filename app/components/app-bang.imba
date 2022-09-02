tag app-bang

	get encoded_bang_query
		"{bang.url}{window.encodeURIComponent(state.query)}"

	def handle_bang
		await api.increment_link_frequency bang
		window.location.href = encoded_bang_query

	def render

		<self
			.selected
			@click=handle_bang
		>
			css d:flex fld:row jc:space-between ai:center
				px:16px py:11px rd:5px cursor:pointer c:#FAD4AB

			<.link-left>
				css d:flex fl:1

				<img.link-icon src=bang.icon>
					css w:20px h:20px mr:10px rd:3px

				<.display-name> encoded_bang_query
					css tt:capitalize fs:20px overflow-wrap:anywhere
					css tt:none word-break:break-all

			<.link-right>
				css d:flex fld:row jc:space-between ai:center
				css .buttons-disabled .link-button visibility:hidden
				css .selected .link-button visibility:visible

				<.frequency> bang.frequency
					css fs:15px ml:7px
