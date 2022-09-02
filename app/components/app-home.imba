tag app-home

	def mount
		$links-input.focus!

	def handle_paste e
		return unless config.data.enable_search_on_paste
		return if state.query.length > 0
		global.setTimeout(&, 0) do
			return if api.math_result isnt no
			bang ||= config.data.default_bang
			handle_bang!

	def handle_click_copy s
		try
			await window.navigator.clipboard.writeText(s)
			state.query = ''
			api.sort_links!

	def handle_input
		api.set_link_selection_index 0
		api.sort_links!

	def render

		<self>
			css w:100% d:flex fld:column ofy:hidden gap:20px

			<.header>
				css d:flex fld:row w:100%
				css .side c:purple3/90 fs:15px d:flex ja:center w:30px cursor:pointer
				css .side svg w:15px d:flex
				css .left jc:left
				css .right jc:right

				<.side.left@click=api.toggle_effective_names>

					if config.data.enable_effective_names
						<svg src="../assets/eye.svg">

					else
						<svg src="../assets/eye-off.svg">

				<input$links-input
					bind=state.query
					@input.if(!state.loading)=handle_input
					@paste.if(!state.loading)=handle_paste
					@cut=api.handle_cut
					disabled=state.loading
				>

				if (let m = api.math_result) isnt no
					<.side.right@click=handle_click_copy(m)>
						"= {Math.round(m * 100)/100}"
						css c:blue3 fs:20px ml:10px w:unset

				else
					<.side.right @click.if(!state.loading)=refs.settings.open>
						<svg src="../assets/settings.svg">

			if state.active_bang or state.sorted_links.length < 1
				<app-bang>

			else
				<app-links>