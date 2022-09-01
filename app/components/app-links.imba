tag app-links

	selection_index = 0
	bang = no

	def increment_selection_index
		selection_index = Math.min(state.sorted_links.length - 1, selection_index + 1)

	def decrement_selection_index
		selection_index = Math.max(0, selection_index - 1)

	get active_bang
		return bang or config.default_bang

	get encoded_bang_query
		"{active_bang.url}{window.encodeURIComponent(state.query)}"

	def mount
		$links-input.focus!

	get math_result
		try
			let result = Number(eval_math state.query)
			throw _ if isNaN result
			throw _ if result.toString! is state.query.trim!
			result
		catch
			no

	def toggle_effective_names
		config.enable_effective_names = !config.enable_effective_names

	def render

		<self>

			css .link
				d:flex fld:row jc:space-between ai:center
				px:16px py:11px rd:5px cursor:pointer c:blue3

			css .link-left
				d:flex fl:1

			css .link-icon
				w:20px h:20px mr:10px rd:3px

			css .display-name
				tt:capitalize fs:20px
				overflow-wrap:anywhere

			css .name
				d:flex ja:center
				c:gray4 ml:10px fs:14px

			css .parens
				fs:10px c:gray4/80

			css .bang-text
				tt:none word-break:break-all

			css .link-right
				d:flex fld:row jc:space-between ai:center

			css .link-buttons
				d:flex fld:row jc:flex-start ai:center pr:25px gap:5px

			css .link-button
				visibility:hidden
				rd:3px c:purple4 fs:15px cursor:pointer
				px:3px

			css .link-button svg
				w:15px

			css .selected .link-button
				visibility:visible

			css .buttons-disabled .link-button
				visibility:hidden

			css .frequency
				fs:15px ml:7px

			css .header
				d:flex fld:row w:100%

			css .side
				c:purple3/90 fs:15px
				d:flex ja:center w:30px
				cursor:pointer

			css .side svg
				w:15px

			css .left
				d:flex jc:left

			css .right
				d:flex jc:right

			<.header>

				<.side.left@click=toggle_effective_names>
					if config.enable_effective_names
						<svg src="../assets/eye.svg">
					else
						<svg src="../assets/eye-off.svg">

				<input$links-input
					bind=state.query
					@hotkey('return').capture.if(!state.loading)=handle_return
					@hotkey('tab').capture.if(!state.loading)=toggle_effective_names
					@hotkey('shift+return').capture.if(!state.loading)=handle_shift_return
					@hotkey('esc').capture.if(!state.loading)=handle_esc
					@hotkey('shift+backspace').capture.if(!state.loading)=handle_shift_backspace
					@hotkey('down').capture.if(!state.loading)=increment_selection_index
					@hotkey('up').capture.if(!state.loading)=decrement_selection_index
					@keydown.del.if(!state.loading)=handle_del
					@input.if(!state.loading)=handle_input
					@paste.if(!state.loading)=handle_paste
					@blur=this.focus
					@cut=handle_cut
					disabled=state.loading
				>

				if (let m = math_result) isnt no
					<.side.right[c:blue3 fs:20px ml:10px w:unset]
						@click=handle_click_copy(m)
					> "= {Math.round(m * 100)/100}"
				else
					<.side.right @click.if(!state.loading)=toggle_settings>
						<svg src="../assets/settings.svg">

			if config.enable_tips and not config.enable_simplify_ui
				<.middle-button>
					<.tip[jc:start ta:left fl:1] @click=handle_return>
						<.tip-hotkey> "Return"
						<.tip-content> "Navigate To Link"
					<.tip[jc:center ta:center fl:2 px:15px]
						@click=handle_shift_return
					>
						<.tip-hotkey> "Shift + Return"
						<.tip-content[of:hidden text-overflow:ellipsis white-space:nowrap]>
							<span> "Add New Link"
							<span[ws:pre]> " "
							let sq = state.query.trim!.split /\s+/
							if sq.length >= 2
								let url = sq.pop!
								<span> '"'
								<span> sq.join ' '
								<span[ws:pre]> ' '
								<span[c:blue3]> url
								<span> '"'
							else
								<span> '"'
								<span> sq.join ' '
								<span> '"'
					<.tip[jc:end ta:right fl:1]
						@click=handle_shift_backspace
					>
						<.tip-hotkey> "Shift + Backspace"
						<.tip-content> "Edit Link"

			<div>
				css d:flex fld:column jc:flex-start fl:1 w:100% ofy:auto pt:15px

				if not viewing_community_links and (bang or state.sorted_links.length < 1)
					<a.link.selected
						href=encoded_bang_query
						@click=handle_click_bang
					>
						<.link-left>
							<img.link-icon src=active_bang.icon>
							<.display-name.bang-text> encoded_bang_query
						<.link-right[jc:flex-end]>
							<.frequency> active_bang.frequency
				else
					for link, index in state.sorted_links
						<a.link
							href=link.url
							@pointerover=(selection_index = index)
							@click.prevent=handle_click_link(link)
							.selected=(index is selection_index)
						>
							<.link-left>
								<img.link-icon src=link.icon>
								<.display-name
									[c:#FAD4AB]=link.is_bang
								> link.display_name
								if link.display_name isnt link.name and config.enable_effective_names
									<.name>
										<span.parens> "("
										<span> link.name
										<span.parens> ")"
							<.link-right>
								<.link-buttons .buttons-disabled=(not config.enable_buttons or config.enable_simplify_ui)>
									<.link-button@click.prevent.stop=handle_click_edit(link)>
										<svg src='../assets/edit-2.svg'>
									<.link-button@click.prevent.stop=handle_click_delete(link)>
										<svg src='../assets/trash.svg'>
									<.link-button
										@click.prevent.stop=handle_click_pin(link)
										[visibility:visible c:purple3/50]=(link.is_pinned and (index isnt selection_index or not config.enable_buttons or config.enable_simplify_ui))
									>
										<svg src='../assets/star.svg'>
								<.frequency> link.frequency
