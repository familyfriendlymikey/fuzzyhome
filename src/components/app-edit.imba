tag app-edit

	get render? do mounted?

	def mount
		link = JSON.parse(JSON.stringify(state.editing-link))
		if js?
			code = global.decodeURIComponent link.url.slice(11)
		render!
		$name.focus!

	def save
		if js?
			link.url = 'javascript:' + global.encodeURIComponent(code)
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

	get js?
		link.url.startsWith 'javascript:'

	def toggle-js
		if js?
			link.url = link.url.slice(11)
		else
			link.url = 'javascript:' + link.url

	def insert-tab { target:t }
		let start = t.selectionStart
		let end = t.selectionEnd
		code = t.value.substring(0, start) + "\t" + t.value.substring(end)
		t.selectionStart = t.selectionEnd = start + 1

	<self>
		css w:100% gap:15px ofy:hidden d:vcs
			input fl:none

		<input$name bind=link.name>

		if js?
			<textarea$js
				@keydown.tab.trap=insert-tab
				bind=code
			>
				css h:300px
		else
			<input$link bind=link.url>

		<div>
			css w:100% d:htl g:10px
				> fl:1 h:50px tt:up
			<button @click=toggle-js> "toggle js"
			<button @click=cancel @hotkey('esc').force> "cancel"
			<button @click=del> "delete"
			<button @click=save> "save"
