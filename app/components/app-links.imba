tag app-links

	get tips
		let result = []

		result.push <>
			<.tip
				@click=api.handle_click_link
				@hotkey('return').force=api.handle_click_link
			>
				<.tip-hotkey> "Return"
				if api.selected_link.is_bang
					<.tip-content> "Use Bang"
				else
					<.tip-content> "Navigate To Link"

		result.push <>
			<.tip
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

		result.push <>
			<.tip
				@click=handle_edit
				@hotkey('shift+backspace').force=handle_edit
			>
				<.tip-hotkey> "Shift + Backspace"
				<.tip-content> "Edit Link"

		result.push <>
			<.tip
				@click=api.toggle_effective_names
				@hotkey('tab').force=api.toggle_effective_names
			>
				<.tip-hotkey> "Tab"
				<.tip-content> "Toggle Effective Names"

		result.push <>
			<.tip
				@click=refs.settings.open
				@hotkey('shift+tab').force=refs.settings.open
			>
				<.tip-hotkey> "Shift + Tab"
				<.tip-content> "Toggle Settings"

		result.push <>
			<.tip @click=api.handle_cut>
				if api.math_result
					<.tip-hotkey> "Cut (Math, If No Selection)"
					<.tip-content> "Cut Math Result"
				else
					<.tip-hotkey> "Cut (If No Selection)"
					<.tip-content> "Cut All Text"

		result.push <>
			<.tip.noclick
				@hotkey('down').force=api.increment_link_selection_index
				@hotkey('up').force=api.decrement_link_selection_index
			>
				<.tip-hotkey> "Up/Down Arrow"
				<.tip-content> "Move Selection"

		result.push <>
			<.tip.noclick>
				<.tip-hotkey> "Paste (If Input Empty)"
				<.tip-content> "Instant Search"

		result

	def render

		<self>
			css w:100% d:flex fld:column gap:15px ofy:hidden

			<app-tips$tips tips=tips>

			unless $tips.show_more
				<.links>
					css ofy:scroll
					for link, index in state.sorted_links
						<app-link link=link index=index>

