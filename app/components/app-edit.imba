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
