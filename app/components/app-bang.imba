tag app-bang

	def unmount
		state.bang_selection_index = -1

	get tips
		let result = []

		if state.bang_selection_index > -1
			result.push <>
				<.tip
					@click=api.handle_bang
					@hotkey('return').capture.if(!state.loading)=api.handle_bang
				>
					<.tip-hotkey> "Return"
					<.tip-content> "Search History Item"
		else
			result.push <>
				<.tip
					@click=api.handle_bang
					@hotkey('return').capture.if(!state.loading)=api.handle_bang
				>
					<.tip-hotkey> "Return"
					<.tip-content> "Search"

		result.push <>
			<.tip.ellipsis
				@click=api.handle_add_link
				@hotkey('shift+return').capture.if(!state.loading)=api.handle_add_link
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

		result.push <>
			if state.active_bang
				<.tip
					@click=api.unset_active_bang
					@hotkey('esc').capture.if(!state.loading)=api.unset_active_bang
				>
					<.tip-hotkey> "Esc"
					<.tip-content> "Back"
			else
				<.tip.noclick>
					<.tip-hotkey> "Paste (If Input Empty)"
					<.tip-content> "Instant Search"

		result.push <>
			<.tip @click.if(!loading)=api.handle_cut>
				if api.math_result
					<.tip-hotkey> "Cut (Math, If No Selection)"
					<.tip-content> "Cut Math Result"
				else
					<.tip-hotkey> "Cut (If No Selection)"
					<.tip-content> "Cut All Text"

		if state.active_bang
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
			css w:100% d:flex fld:column gap:15px

			<app-tips$tips tips=tips>

			unless $tips.show_more

				<.bang.selected
					@click=api.handle_bang
				>
					css d:flex fld:row jc:space-between ai:center
						px:16px py:11px rd:5px cursor:pointer c:#FAD4AB

					<.link-left>
						css d:flex fl:1 ofy:hidden

						<img.link-icon src=api.bang.icon>
							css w:20px h:20px mr:10px rd:3px

						<.display-name> api.encoded_bang_query_nourl
							css fs:20px of:hidden text-overflow:ellipsis

					<.link-right>
						css d:flex fld:row jc:space-between ai:center

						<.frequency> api.bang.frequency
							css fs:15px ml:7px

				<.history>
					css d:flex fld:column jc:start ai:center

					for item, index in api.sorted_bang_history
						<.item [c:#FAD4AB]=(state.bang_selection_index is index)> item
							css w:100% fs:17px c:blue3 rd:5px p:10px 10px
								box-sizing:border-box
