tag app-edit

	def mount
		$dn.setSelectionRange 0, 0
		$dn.focus!
		new_link_text = api.construct_link_text state.editing_link

	def handle_click_set_default_bang
		config.set_default_bang state.editing_link
		state.editing_link = no

	def handle_delete
		try
			await api.delete_link state.editing_link
			state.editing_link = no
		catch e
			err "deleting link", e

	def save
		try
			api.update_link state.editing_link, new_link_text
			state.editing_link = no
		catch e
			err "saving link", e

	get tips
		let result = []
		let temp

		temp = {
				click_handler: handle_delete.bind(this)
				hotkey_handler: handle_delete.bind(this)
				hotkey: 'shift+backspace'
				hotkey_display_name: "Shift + Backspace"
				content: "Delete Link"
		}
		result.push temp

		temp = {
				click_handler: save.bind(this)
				hotkey_handler: save.bind(this)
				hotkey: 'return'
				hotkey_display_name: "Return"
				content: "Update Link"
		}
		result.push temp

		if state.editing_link.is_bang
			temp = {
					click_handler: handle_click_set_default_bang.bind(this)
					hotkey_display_name: "Click"
					content: "Set Default Bang"
			}
			result.push temp

		temp = {
				click_handler: api.cancel_edit
				hotkey_handler: api.cancel_edit
				hotkey: 'esc'
				hotkey_display_name: "Esc"
				content: "Cancel"
		}
		result.push temp

		result

	def render

		<self>
			css d:flex fld:column gap:20px w:100%

			<div>
				<input$dn autofocus bind=new_link_text>

			<app-tips tips=tips>
