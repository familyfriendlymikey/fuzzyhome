tag app-edit < app-prompt

	def handle_click_set_default_bang
		if editing_link.is_bang isnt true
			return err "setting default bang", "Link is not a bang."
		config.default_bang = editing_link
		save_config!
		editing_link = no
		state.query = prior_query
		prior_query = ''
		sort_links!

	def render
		<self>
			<.tips>
				<.tip
					@click=handle_esc
				>
					<.tip-hotkey> "Esc"
					<.tip-content> "Cancel Edits"
				if editing_link.is_bang
					<.tip
						@click=handle_click_set_default_bang
					>
						<.tip-hotkey> "Click"
						<.tip-content> "Set Default Bang"
				<.tip
					@click=handle_shift_return
				>
					<.tip-hotkey> "Shift + Return"
					<.tip-content[of:hidden text-overflow:ellipsis white-space:nowrap]>
						"Update Link"
				<.tip
					@click=handle_shift_backspace
				>
					<.tip-hotkey> "Shift + Backspace"
					<.tip-content> "Delete Link"
