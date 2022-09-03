tag app-bang

	get tips
		let tips = []

		tips.push <>
			<.tip
				@click=api.handle_bang
				@hotkey('return').capture.if(!state.loading)=api.handle_bang
			>
				<.tip-hotkey> "Return"
				<.tip-content> "Search"

		tips.push <>
			<.tip
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

		tips.push <>
			if state.active_bang
				<.tip
					@click=api.unset_active_bang
					@hotkey('esc').capture.if(!state.loading)=unset_active_bang
				>
					<.tip-hotkey> "Esc"
					<.tip-content> "Back"
			else
				<.tip.noclick>
					<.tip-hotkey> "Paste (If Input Empty)"
					<.tip-content> "Instant Search"

		tips.push <>
			<.tip
				@click.if(!state.loading)=api.toggle_effective_names
				@hotkey('tab').capture.if(!state.loading)=api.toggle_effective_names
			>
				<.tip-hotkey> "Tab"
				<.tip-content> "Toggle Effective Names"

		tips.push <>
			<.tip @click.if(!loading)=api.handle_cut>
				if api.math_result
					<.tip-hotkey> "Cut (Math, If No Selection)"
					<.tip-content> "Cut Math Result"
				else
					<.tip-hotkey> "Cut (If No Selection)"
					<.tip-content> "Cut All Text"

		if state.active_bang
			tips.push <>
				<.tip.noclick>
					<.tip-hotkey> "Paste (If Input Empty)"
					<.tip-content> "Instant Search"

		tips

	def render

		<self>
			css w:100% d:flex fld:column gap:15px

			<app-tips$tips tips=tips>

			unless $tips.show_more
				<.bang.selected@click=api.handle_bang>
					css d:flex fld:row jc:space-between ai:center
						px:16px py:11px rd:5px cursor:pointer c:#FAD4AB

					<.link-left>
						css d:flex fl:1

						<img.link-icon src=api.bang.icon>
							css w:20px h:20px mr:10px rd:3px

						<.display-name> api.encoded_bang_query
							css fs:20px word-break:break-all

					<.link-right>
						css d:flex fld:row jc:space-between ai:center

						<.frequency> api.bang.frequency
							css fs:15px ml:7px
