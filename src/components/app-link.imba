tag app-link

	frequency = 0

	<self
		@contextmenu.trap=api.edit-link(link)
		@click=api.navigate(link)
		.selected=(index is state.link_selection_index)
	>
		css d:flex fld:row jc:space-between ai:center
			px:16px py:11px rd:5px c:$text-c
			
			&.selected
				bg:$selected-c

			@hover
				bg:$hover-c
				.link-button
					visibility:visible
				
		if link.bang?
			css c:$bang-c

		<.link-left>
			css d:flex w:100%

			<img.link-icon src=api.get-icon(link.url)>

				css w:20px h:20px mr:10px rd:3px

			<.name> link.display-name
				css tt:{config.data.case} fs:20px overflow-wrap:anywhere

			if link.alias
				<.name>
					css d:flex ja:center c:$effective-name-c ml:10px fs:14px
					css .parens fs:10px c:$effective-name-parens-c

					<span.parens> "("
					<span> link.alias
					<span.parens> ")"

		<.link-right>
			css d:hflex jc:space-between ai:center g:5px

			css .link-button visibility:hidden

			<.link-buttons>
				css d:flex fld:row jc:start ai:center g:5px
				css .link-button rd:3px c:$button-c fs:15px px:3px
				css .link-button svg w:15px

				<.link-button @click.trap=api.edit-link(link)>
					<svg src='../assets/edit-2.svg'>

				<.link-button @click.trap=api.pin_link(link)>
					if Pins[link.url]
						css visibility:visible c:$button-dim-c

					<svg src='../assets/star.svg'>

			<.frequency> Frequencies[link.url] or 0
				css fs:15px ml:7px
