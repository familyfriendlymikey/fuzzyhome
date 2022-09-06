tag app-bang

	def unmount
		state.bang_selection_index = -1

	get tips
		let result = []
		let temp

		temp = {
				click_handler: api.handle_bang.bind(api)
				hotkey_handler: api.handle_bang.bind(api)
				hotkey: 'return'
				hotkey_display_name: "Return"
		}
		if state.bang_selection_index > -1
			temp.content = "Use History Item"
		else
			temp.content = "Search"
		result.push temp

		temp = {
			click_handler: api.handle_add_link.bind(api)
			hotkey_handler: api.handle_add_link.bind(api)
			hotkey: 'shift+return'
			hotkey_display_name: 'Shift + Return'
			content: "Create Link \"{state.query.trim!}\""
		}
		result.push temp

		if state.bang_selection_index > -1
			temp = {
					click_handler: api.delete_bang_history_item.bind(api)
					hotkey_handler: api.delete_bang_history_item.bind(api)
					hotkey: 'shift+backspace'
					hotkey_display_name: "Shift + Backspace"
					content: "Delete History Item"
			}
			result.push temp

		if state.active_bang
			temp = {
					click_handler: api.unset_active_bang.bind(api)
					hotkey_handler: api.unset_active_bang.bind(api)
					hotkey: 'esc'
					hotkey_display_name: "Esc"
					content: "Back"
			}
			result.push temp

		def handle_delete_bang_history
			api.delete_bang_history!
			$tips.show_more = no
		temp = {
				click_handler: handle_delete_bang_history
				hotkey_display_name: "Click"
				content: "Delete Bang History"
		}
		result.push temp

		temp = {
				click_handler: api.handle_cut.bind(api)
		}
		if api.math_result
			temp.hotkey_display_name = "Cut (If No Selection)"
			temp.content = "Cut All Text"
		else
			temp.hotkey_display_name = "Cut (Math, If No Selection)"
			temp.content = "Cut Math Result"
		result.push temp

		temp = {
				hotkey_display_name: "Paste (If Input Empty)"
				content: "Instant Search"
		}
		result.push temp

		result

	def render

		<self
			@hotkey("tab").force=api.increment_bang_selection_index
			@hotkey("up").force=api.decrement_bang_selection_index
			@hotkey("down").force=api.increment_bang_selection_index
			@hotkey("shift+tab").force=api.decrement_bang_selection_index
		>
			css w:100% d:flex fld:column gap:15px ofy:hidden

			<app-tips$tips tips=tips>

			unless $tips.show_more

				<.bang
					.selected=(state.bang_selection_index is -1)
					[c:$bang-c]=(state.bang_selection_index is -1)
					@pointerover=(state.bang_selection_index = -1)
					@click=api.handle_bang
				>
					css d:flex fld:row jc:space-between ai:center
						px:16px py:11px rd:5px cursor:pointer c:$text-c

					<.link-left>
						css d:flex fl:1 ofy:hidden

						<img.link-icon src=api.bang.icon>
							css w:20px h:20px mr:10px rd:3px

						<.display-name> "...{api.encoded_bang_query_nourl}"
							css fs:20px of:hidden text-overflow:ellipsis

					<.link-right>
						css d:flex fld:row jc:space-between ai:center

						<.frequency> api.bang.frequency
							css fs:15px ml:7px

				<.history>
					css d:flex fld:column jc:start ai:center ofy:auto

					for item, index in api.sorted_bang_history
						<.item
							@pointerover=(state.bang_selection_index = index)
							@click=api.handle_bang
							[c:$bang-c]=(state.bang_selection_index is index)
							.selected=(state.bang_selection_index is index)
						> item
							css w:100% fs:17px c:$text-c rd:5px p:10px 10px
								box-sizing:border-box cursor:pointer
