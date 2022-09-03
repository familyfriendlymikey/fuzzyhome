tag app-links

	def handle_click_delete link
		return unless window.confirm "Do you really want to delete {link..display_name}?"
		handle_delete link

	def handle_click_pin link
		api.pin_link link

	def handle_edit
		return unless state.sorted_links.length > 0
		refs.edit.open api.selected_link

	get tips
		let tips = []

		tips.push <>
			<.tip
				@click=api.handle_click_link
				@hotkey('return').force.if(!loading)=api.handle_click_link
			>
				<.tip-hotkey> "Return"
				<.tip-content> "Navigate To Link"

		tips.push <>
			<.tip
				@click=handle_shift_return
				@hotkey('shift+return').capture.if(!state.loading)=handle_shift_return
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
			<.tip
				@click=handle_edit
				@hotkey('shift+backspace').capture.if(!state.loading)=handle_edit
			>
				<.tip-hotkey> "Shift + Backspace"
				<.tip-content> "Edit Link"

		tips

	get tips_more
		let tips_more = []

		tips_more.push <>
			<.tip
				@click.if(!state.loading)=api.toggle_effective_names
				@hotkey('tab').capture.if(!state.loading)=api.toggle_effective_names
			>
				<.tip-hotkey> "Tab"
				<.tip-content> "Toggle Effective Names"

		tips_more.push <>
			<.tip
				@click.if(!state.loading)=refs.settings.open
				@hotkey('shift+tab').capture.if(!state.loading)=refs.settings.open
			>
				<.tip-hotkey> "Shift + Tab"
				<.tip-content> "Toggle Settings"

		tips_more.push <>
			<.tip @click.if(!loading)=api.handle_cut>
				if api.math_result
					<.tip-hotkey> "Cut (Math, If No Selection)"
					<.tip-content> "Cut Math Result"
				else
					<.tip-hotkey> "Cut (If No Selection)"
					<.tip-content> "Cut All Text"

		tips_more.push <>
			<.tip.noclick
				@hotkey('down').capture.if(!state.loading)=api.increment_link_selection_index
				@hotkey('up').capture.if(!state.loading)=api.decrement_link_selection_index
			>
				<.tip-hotkey> "Up/Down Arrow"
				<.tip-content> "Move Selection"

		tips_more.push <>
			<.tip.noclick>
				<.tip-hotkey> "Paste (If Input Empty)"
				<.tip-content> "Instant Search"

		tips_more

	def render

		<self>
			css w:100% d:flex fld:column gap:15px ofy:hidden

			<app-tips tips=tips>
			<app-tips-more$tips-more tips=tips_more>

			unless $tips-more.active
				<.links>
					css ofy:scroll
					for link, index in state.sorted_links
						<app-link link=link index=index>

