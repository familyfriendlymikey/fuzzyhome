import * as PH from 'imba-phosphor-icons'

tag app-home

	def mount
		$home-input.focus!

	def blur
		setTimeout(&, 100) do $home-input.focus!

	def handle_click_copy s
		try
			await window.navigator.clipboard.writeText(s)
			state.query = ''
			api.sort_links!

	def handle_input
		api.set_link_selection_index 0
		api.sort_links!

	def insert-tab { target:t }
		let start = t.selectionStart
		let end = t.selectionEnd
		t.value = t.value.substring(0, start) + "\t" + t.value.substring(end)
		t.selectionStart = t.selectionEnd = start + 1

	def mod-left e
		return unless e.metaKey
		return if state.query..trim!
		global.history.back!

	def mod-right e
		return unless e.metaKey
		return if state.query..trim!
		global.history.forward!

	<self>
		css w:100% d:flex fld:column ofy:hidden gap:20px

		<.header>
			css
				d:hflex

				.side
					c:$button-c fs:15px d:box e:300ms

					>
						w:15px d:flex

				.left
					pr:15px
					jc:left

				.right
					pl:15px
					jc:right

			<.side.left @click=(state.view = 'settings')>
				<svg src="../assets/settings.svg">

			<input$home-input
				autofocus
				bind=state.query
				@input=handle_input
				@keydown.tab.prevent=insert-tab
				@keydown.left=mod-left
				@keydown.right=mod-right
				@cut=api.handle_cut
				disabled=state.loading
				@blur=blur
			>
				css bg:$input-bg

			<.side.right @click=api.create>
				<svg src=PH.PLUS>

		if state.loaded
			<div ease>
				css e:400ms of:hidden
					@off o:0

				if api.url-query and !state.active_bang
					<app-url>

				elif state.active_bang or state.sorted_links.length < 1
					<app-bang>

				else
					<app-links>

