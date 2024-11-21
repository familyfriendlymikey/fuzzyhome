tag app-edit

	get render? do mounted?

	def mount
		link = JSON.parse(JSON.stringify(state.editing-link))
		render!
		$name.focus!

	def save
		await api.save(link)
		await api.reload-bookmarks!
		state.editing-link = no

	def cancel
		state.editing-link = no

	def tab
		if $name.focused?
			$link.focus!
		else
			$name.focus!

	def del
		return unless global.confirm 'Are you sure?'
		await api.del(link)
		await api.reload-bookmarks!
		state.editing-link = no
	<self>
		css w:100% gap:15px ofy:hidden d:vcs
			input fl:none

		<input$name bind=link.name>
		<input$link bind=link.url>

		<div>
			css w:100% d:htl g:10px
				> fl:1 h:50px tt:up
			<button @click=cancel @hotkey('esc').force> "cancel"
			<button @click=del> "delete"
			<button @click=save @hotkey('return').force> "save"
