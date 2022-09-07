tag app-bang

	def unmount
		state.bang_selection_index = -1

	get tips
		let result = []

		if state.bang_selection_index > -1
			result.push global_tips.use_bang_history_item
		else
			result.push global_tips.search

		result.push global_tips.create_link

		if state.bang_selection_index > -1
			result.push global_tips.delete_bang_history_item

		if state.active_bang
			result.push global_tips.unset_active_bang

		result.push global_tips.delete_bang_history

		if api.math_result
			result.push global_tips.cut_math_result
		else
			result.push global_tips.cut_all_text

		if config.data.enable_search_on_paste
			result.push global_tips.instant_search

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
