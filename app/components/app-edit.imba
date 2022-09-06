tag app-edit

	active = no

	def mount
		$dn.setSelectionRange 0, 0
		$dn.focus!

	def open data
		link = data
		new_link_text = value=api.construct_link_text(link)
		active = yes

	def close
		active = no

	def handle_click_set_default_bang
		config.set_default_bang link
		close!

	def handle_delete
		try
			await api.delete_link link
			close!
		catch e
			err "deleting link", e

	def save
		try
			api.update_link link, new_link_text
			close!
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

		if link.is_bang
			temp = {
					click_handler: handle_click_set_default_bang.bind(this)
					hotkey_display_name: "Click"
					content: "Set Default Bang"
			}
			result.push temp

		temp = {
				click_handler: close.bind(this)
				hotkey_handler: close.bind(this)
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
