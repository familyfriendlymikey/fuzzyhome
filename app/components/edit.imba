let p = console.log

export default class Edit

	def constructor
		store = $1

	link = no

	def mount
		# $dn.setSelectionRange 0, 0
		# $dn.focus!
		new_link_text = store.link.construct_text store.edit.link

	def open
		return if store.loading
		return unless store.links.sorted.length > 0
		try
			link = store.links.selected_link_e
		catch e
			err "editing link, selected link is undefined"

	def save
		try
			store.link.update store.edit.link, new_link_text
			store.edit.link = no
		catch e
			err "saving link", e

	def cancel
		store.edit.link = no

	def handle_click_set_default_bang
		store.config.set_default_bang store.edit.link
		store.edit.link = no

	def handle_delete
		try
			await store.link.delete store.edit.link
			store.edit.link = no
		catch e
			err "deleting link", e

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
				hotkey: 'shift+return'
				hotkey_display_name: "Shift + Return"
				content: "Update Link"
		}
		result.push temp

		if store.edit.link.is_bang
			temp = {
					click_handler: handle_click_set_default_bang.bind(this)
					hotkey_display_name: "Click"
					content: "Set Default Bang"
			}
			result.push temp

		temp = {
				click_handler: store.edit.cancel
				hotkey_handler: store.edit.cancel
				hotkey: 'esc'
				hotkey_display_name: "Esc"
				content: "Cancel"
		}
		result.push temp

		result

	get view

		<self>
			css d:flex fld:column gap:20px w:100%

			<div>
				<input autofocus bind=new_link_text>

			# <app-tips tips=tips>
			<(store.tips.view)>
