tag app-links

	def handle_edit
		return unless state.sorted_links.length > 0
		refs.edit.open api.selected_link

	get tips
		let result = []
		let temp

		temp = {
			click_handler: api.handle_click_link.bind(api)
			hotkey_handler: api.handle_click_link.bind(api)
			hotkey: 'return'
			hotkey_display_name: 'Return'
		}
		temp.content = api.selected_link.is_bang ? "Use Bang" : "Navigate To Link"
		result.push temp

		temp = {
			click_handler: api.handle_add_link.bind(api)
			hotkey_handler: api.handle_add_link.bind(api)
			hotkey: 'shift+return'
			hotkey_display_name: 'Shift + Return'
			content: "Create Link \"{state.query.trim!}\""
		}
		result.push temp

		temp = {
				click_handler: handle_edit.bind(this)
				hotkey_handler: handle_edit.bind(this)
				hotkey: 'shift+backspace'
				hotkey_display_name: "Shift + Backspace"
				content: "Edit Link"
		}
		result.push temp

		temp = {
				click_handler: api.toggle_effective_names.bind(api)
				hotkey_handler: api.toggle_effective_names.bind(api)
				hotkey: 'tab'
				hotkey_display_name: "Tab"
				content: "Toggle Effective Names"
		}
		result.push temp

		temp = {
				click_handler: (do refs.settings.open!).bind(this)
				hotkey_handler: (do refs.settings.open!).bind(this)
				hotkey: 'shift+tab'
				hotkey_display_name: "Shift + Tab"
				content: "Toggle Settings"
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
				hotkey_handler: api.increment_link_selection_index.bind(api)
				hotkey: 'down'
				hotkey_display_name: "Down Arrow"
				content: "Move Selection Down"
		}
		result.push temp

		temp = {
				hotkey_handler: api.decrement_link_selection_index.bind(api)
				hotkey: 'up'
				hotkey_display_name: "Up Arrow"
				content: "Move Selection Up"
		}
		result.push temp

		temp = {
				hotkey_display_name: "Paste (If Input Empty)"
				content: "Instant Search"
		}
		result.push temp

		result

	def render

		<self>
			css w:100% d:flex fld:column gap:15px ofy:hidden

			<app-tips$tips tips=tips>

			<.links>
				css ofy:scroll
				for link, index in state.sorted_links
					<app-link link=link index=index handle_edit=handle_edit>

