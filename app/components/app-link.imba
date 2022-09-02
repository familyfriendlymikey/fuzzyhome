tag app-link

	def render
		<self
			@pointerover=api.set_link_selection_index(index)
			@click.prevent=handle_click_link(link)
			.selected=(index is state.link_selection_index)
		>
			css d:flex fld:row jc:space-between ai:center
				px:16px py:11px rd:5px cursor:pointer c:blue3

			<.link-left>
				css d:flex fl:1

				<img.link-icon src=link.icon>
					css w:20px h:20px mr:10px rd:3px

				<.display-name [c:#FAD4AB]=link.is_bang> link.display_name
					css tt:capitalize fs:20px overflow-wrap:anywhere

				if link.display_name isnt link.name and config.data.enable_effective_names
					<.name>
						css d:flex ja:center c:gray4 ml:10px fs:14px
						css .parens fs:10px c:gray4/80

						<span.parens> "("
						<span> link.name
						<span.parens> ")"

			<.link-right>
				css d:flex fld:row jc:space-between ai:center
				css .buttons-disabled .link-button visibility:hidden
				css .selected .link-button visibility:visible

				<.link-buttons .buttons-disabled=!config.data.enable_buttons>
					css d:flex fld:row jc:flex-start ai:center pr:25px gap:5px
					css .link-button visibility:hidden rd:3px c:purple4 fs:15px cursor:pointer px:3px
					css .link-button svg w:15px

					<.link-button@click.prevent.stop=handle_click_edit(link)>
						<svg src='../assets/edit-2.svg'>

					<.link-button@click.prevent.stop=handle_click_delete(link)>
						<svg src='../assets/trash.svg'>

					<.link-button
						@click.prevent.stop=handle_click_pin(link)
						[visibility:visible c:purple3/50]=(link.is_pinned and (index isnt state.link_selection_index or not config.data.enable_buttons))
					> <svg src='../assets/star.svg'>

				<.frequency> link.frequency
					css fs:15px ml:7px
