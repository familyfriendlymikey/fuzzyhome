import api from './api'
import state from './state'

let tips = {}

tips.navigate_to_link = {
	click_handler: api.handle_click_link.bind(api)
	hotkey_handler: api.handle_click_link.bind(api)
	hotkey: 'return'
	hotkey_display_name: 'Return'
	content: "Navigate To Link"
}

tips.use_bang = {
	click_handler: api.handle_click_link.bind(api)
	hotkey_handler: api.handle_click_link.bind(api)
	hotkey: 'return'
	hotkey_display_name: 'Return'
	content: "Use Bang"
}

tips.create_link = {
	click_handler: api.handle_add_link.bind(api)
	hotkey_handler: api.handle_add_link.bind(api)
	hotkey: 'shift+return'
	hotkey_display_name: 'Shift + Return'
	content: "Create Link \"{state.query.trim!}\""
}

tips.edit_link = {
	click_handler: api.handle_edit.bind(api)
	hotkey_handler: api.handle_edit.bind(api)
	hotkey: 'shift+backspace'
	hotkey_display_name: "Shift + Backspace"
	content: "Edit Link"
}

tips.toggle_effective_names = {
	click_handler: api.toggle_effective_names.bind(api)
	hotkey_handler: api.toggle_effective_names.bind(api)
	hotkey: 'tab'
	hotkey_display_name: "Tab"
	content: "Toggle Effective Names"
}

tips.toggle_settings = {
	click_handler: api.open_settings.bind(api)
	hotkey_handler: api.open_settings.bind(api)
	hotkey: 'shift+tab'
	hotkey_display_name: "Shift + Tab"
	content: "Toggle Settings"
}

tips.cut_math_result = {
	click_handler: api.handle_cut.bind(api)
	hotkey_display_name: "Cut (If No Selection)"
	content: "Cut Math Result"
}

tips.cut_all_text = {
	click_handler: api.handle_cut.bind(api)
	hotkey_display_name: "Cut (If No Selection)"
	content: "Cut All Text"
}

tips.increment_link_selection_index = {
	click_handler: api.increment_link_selection_index.bind(api)
	hotkey_handler: api.increment_link_selection_index.bind(api)
	hotkey: 'down'
	hotkey_display_name: "Down Arrow"
	content: "Move Selection Down"
}

tips.decrement_link_selection_index = {
	click_handler: api.decrement_link_selection_index.bind(api)
	hotkey_handler: api.decrement_link_selection_index.bind(api)
	hotkey: 'up'
	hotkey_display_name: "Up Arrow"
	content: "Move Selection Up"
}

tips.instant_search = {
	hotkey_display_name: "Paste (If Input Empty)"
	content: "Instant Search"
}

tips.use_bang_history_item = {
	click_handler: api.handle_bang.bind(api)
	hotkey_handler: api.handle_bang.bind(api)
	hotkey: 'return'
	hotkey_display_name: "Return"
	content: "Use History Item"
}

tips.search = {
	click_handler: api.handle_bang.bind(api)
	hotkey_handler: api.handle_bang.bind(api)
	hotkey: 'return'
	hotkey_display_name: "Return"
	content: "Search"
}

tips.delete_bang_history_item = {
	click_handler: api.delete_bang_history_item.bind(api)
	hotkey_handler: api.delete_bang_history_item.bind(api)
	hotkey: 'shift+backspace'
	hotkey_display_name: "Shift + Backspace"
	content: "Delete History Item"
}

tips.unset_active_bang = {
	click_handler: api.unset_active_bang.bind(api)
	hotkey_handler: api.unset_active_bang.bind(api)
	hotkey: 'esc'
	hotkey_display_name: "Esc"
	content: "Back"
}

tips.delete_bang_history = {
	click_handler: api.delete_bang_history.bind(api)
	hotkey_display_name: "Click"
	content: "Delete Bang History"
}

tips.close_community_links = {
	click_handler: api.close_community_links.bind(api)
	hotkey_handler: api.close_community_links.bind(api)
	hotkey: "esc"
	hotkey_display_name: "Esc"
	content: "Exit Community Links"
}

tips.add_community_link = {
	click_handler: api.add_community_link.bind(api)
	hotkey_handler: api.add_community_link.bind(api)
	hotkey: "shift+return"
	hotkey_display_name: "Shift + Return Or Click"
	content: "Add To Your Links"
}

tips.increment_community_link_selection_index = {
	click_handler: api.increment_community_link_selection_index.bind(api)
	hotkey_handler: api.increment_community_link_selection_index.bind(api)
	hotkey: 'down'
	hotkey_display_name: "Down Arrow"
	content: "Move Selection Down"
}

tips.decrement_community_link_selection_index = {
	click_handler: api.decrement_community_link_selection_index.bind(api)
	hotkey_handler: api.decrement_community_link_selection_index.bind(api)
	hotkey: 'up'
	hotkey_display_name: "Up Arrow"
	content: "Move Selection Up"
}


export default tips
