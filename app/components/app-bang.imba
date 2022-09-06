tag app-bang

	def unmount
		state.bang_selection_index = -1

	get tips
		let result = []

		if state.bang_selection_index > -1
			result.push <>
				<.tip
					@click=api.handle_bang
					@hotkey('return').force=api.handle_bang
				>
					<.tip-hotkey> "Return"
					<.tip-content> "Use History Item"
		else
			result.push <>
				<.tip
					@click=api.handle_bang
					@hotkey('return').force=api.handle_bang
				>
					<.tip-hotkey> "Return"
					<.tip-content> "Search"

		result.push <>
			<.tip.ellipsis
				@click=api.handle_add_link
				@hotkey('shift+return').force=api.handle_add_link
			>
				<.tip-hotkey> "Shift + Return"
				<.tip-content.ellipsis>
					<span[ws:pre]> "Create Link "
					let sq = state.query.trim!.split /\s+/
					if sq.length >= 2
						let url = sq.pop!
						<span> '"'
						<span> sq.join " "
						<span[c:blue3 ws:pre]> " {url}"
						<span> '"'
					else
						<span> "\"{sq.join " "}\""

		if state.bang_selection_index > -1
			result.push <>
				<.tip
					@click=api.delete_bang_history_item
					@hotkey('shift+backspace').force=api.delete_bang_history_item
				>
					<.tip-hotkey> "Shift + Backspace"
					<.tip-content> "Delete History Item"

		if state.active_bang
			result.push <>
				<.tip
					@click=api.unset_active_bang
					@hotkey('esc').force=api.unset_active_bang
				>
					<.tip-hotkey> "Esc"
					<.tip-content> "Back"

		result.push <>
			<.tip@click=(api.delete_bang_history! and $tips.show_more = no)>
				<.tip-hotkey> "Click"
				<.tip-content> "Delete Bang History"

		result.push <>
			<.tip @click=api.handle_cut>
				if api.math_result
					<.tip-hotkey> "Cut (Math, If No Selection)"
					<.tip-content> "Cut Math Result"
				else
					<.tip-hotkey> "Cut (If No Selection)"
					<.tip-content> "Cut All Text"

		result.push <>
			<.tip.noclick>
				<.tip-hotkey> "Paste (If Input Empty)"
				<.tip-content> "Instant Search"

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
					[c:$bang-color]=(state.bang_selection_index is -1)
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
							[c:$bang-color]=(state.bang_selection_index is index)
							.selected=(state.bang_selection_index is index)
						> item
							css w:100% fs:17px c:$text-c rd:5px p:10px 10px
								box-sizing:border-box cursor:pointer
