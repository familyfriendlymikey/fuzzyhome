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
				@cut=api.handle_cut
				disabled=state.loading
				@blur=blur
			>
				css h:50px px:20px fl:1
					fs:20px ta:center
					bd:1px solid $input-bc
					outline:none rd:5px
					bg:$input-bg c:$text-c
					caret-color:$input-caret-c

			<.side.right@click=handle_click_copy(api.math_result or 0)>
				<$math>
					css d:box fs:17px min-width:min-content
					"{Math.round(api.math_result * 100)/100}"

				css e:200ms eaf:circ-out
					max-width:{$math.offsetWidth or 30}px
					min-width:{$math.offsetWidth}px

		if state.loaded
			<div ease>
				css e:400ms of:hidden
					@off o:0

				if state.active_bang or state.sorted_links.length < 1
					<app-bang>

				else
					<app-links>

