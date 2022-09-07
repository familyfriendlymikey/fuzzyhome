let p = console.log

export default class GlobalTips

	def constructor
		store = $1

		navigate_to_link = {
			click_handler: store.link.handle_click.bind(store)
			hotkey_handler: store.link.handle_click.bind(store)
			hotkey: 'return'
			hotkey_display_name: 'Return'
			content: "Navigate To Link"
		}

		use_bang = {
			click_handler: store.link.handle_click.bind(store)
			hotkey_handler: store.link.handle_click.bind(store)
			hotkey: 'return'
			hotkey_display_name: 'Return'
			content: "Use Bang"
		}

		create_link = {
			click_handler: store.link.handle_add.bind(store)
			hotkey_handler: store.link.handle_add.bind(store)
			hotkey: 'shift+return'
			hotkey_display_name: 'Shift + Return'
			content: "Create Link \"{store.home.query.trim!}\""
		}

		edit_link = {
			click_handler: store.edit.open.bind(store)
			hotkey_handler: store.edit.open.bind(store)
			hotkey: 'shift+backspace'
			hotkey_display_name: "Shift + Backspace"
			content: "Edit Link"
		}

		toggle_effective_names = {
			click_handler: store.links.toggle_effective_names.bind(store)
			hotkey_handler: store.links.toggle_effective_names.bind(store)
			hotkey: 'tab'
			hotkey_display_name: "Tab"
			content: "Toggle Effective Names"
		}

		toggle_settings = {
			click_handler: store.settings.open.bind(store)
			hotkey_handler: store.settings.open.bind(store)
			hotkey: 'shift+tab'
			hotkey_display_name: "Shift + Tab"
			content: "Toggle Settings"
		}

		cut_math_result = {
			click_handler: store.home.handle_cut.bind(store)
			hotkey_display_name: "Cut (If No Selection)"
			content: "Cut Math Result"
		}

		cut_all_text = {
			click_handler: store.home.handle_cut.bind(store)
			hotkey_display_name: "Cut (If No Selection)"
			content: "Cut All Text"
		}

		increment_link_selection_index = {
			click_handler: store.links.increment_selection_index.bind(store)
			hotkey_handler: store.links.increment_selection_index.bind(store)
			hotkey: 'down'
			hotkey_display_name: "Down Arrow"
			content: "Move Selection Down"
		}

		decrement_link_selection_index = {
			click_handler: store.links.decrement_selection_index.bind(store)
			hotkey_handler: store.links.decrement_selection_index.bind(store)
			hotkey: 'up'
			hotkey_display_name: "Up Arrow"
			content: "Move Selection Up"
		}

		instant_search = {
			hotkey_display_name: "Paste (If Input Empty)"
			content: "Instant Search"
		}

		use_bang_history_item = {
			click_handler: store.bang.handle_click.bind(store)
			hotkey_handler: store.bang.handle_click.bind(store)
			hotkey: 'return'
			hotkey_display_name: "Return"
			content: "Use History Item"
		}

		search = {
			click_handler: store.bang.handle_click.bind(store)
			hotkey_handler: store.bang.handle_click.bind(store)
			hotkey: 'return'
			hotkey_display_name: "Return"
			content: "Search"
		}

		delete_bang_history_item = {
			click_handler: store.bang.delete_history_item.bind(store)
			hotkey_handler: store.bang.delete_history_item.bind(store)
			hotkey: 'shift+backspace'
			hotkey_display_name: "Shift + Backspace"
			content: "Delete History Item"
		}

		unset_active_bang = {
			click_handler: store.bang.unset_active_bang.bind(store)
			hotkey_handler: store.bang.unset_active_bang.bind(store)
			hotkey: 'esc'
			hotkey_display_name: "Esc"
			content: "Back"
		}

		delete_bang_history = {
			click_handler: store.bang.delete_history.bind(store)
			hotkey_display_name: "Click"
			content: "Delete Bang History"
		}

		close_community_links = {
			click_handler: store.community_links.close.bind(store)
			hotkey_handler: store.community_links.close.bind(store)
			hotkey: "esc"
			hotkey_display_name: "Esc"
			content: "Exit Community Links"
		}

		add_community_link = {
			click_handler: store.community_links.add.bind(store)
			hotkey_handler: store.community_links.add.bind(store)
			hotkey: "shift+return"
			hotkey_display_name: "Shift + Return Or Click"
			content: "Add To Your Links"
		}

		increment_community_link_selection_index = {
			click_handler: store.community_links.increment_selection_index.bind(store)
			hotkey_handler: store.community_links.increment_selection_index.bind(store)
			hotkey: 'down'
			hotkey_display_name: "Down Arrow"
			content: "Move Selection Down"
		}

		decrement_community_link_selection_index = {
			click_handler: store.community_links.decrement_selection_index.bind(store)
			hotkey_handler: store.community_links.decrement_selection_index.bind(store)
			hotkey: 'up'
			hotkey_display_name: "Up Arrow"
			content: "Move Selection Up"
		}
