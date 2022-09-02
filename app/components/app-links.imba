import { evaluate as eval_math } from 'mathjs'

tag app-links

	active_bang = no

	def mount
		p document
		$links-input.focus!

	def handle_paste e
		return unless config.data.enable_search_on_paste
		return if state.query.length > 0
		global.setTimeout(&, 0) do
			return if math_result isnt no
			bang ||= config.data.default_bang
			handle_bang!

	def handle_click_copy s
		try
			await window.navigator.clipboard.writeText(s)
			state.query = ''
			sort_links!

	def handle_cut e
		return unless e.target.selectionStart == e.target.selectionEnd
		let s = math_result
		s ||= state.query
		await window.navigator.clipboard.writeText(s)
		state.query = ''
		sort_links!

	def handle_add
		state.loading = yes
		try
			await api.add_link state.query
			state.query = ''
			sort_links!
		catch e
			err "adding link", e
		state.loading = no

	get math_result
		try
			let result = Number(eval_math state.query)
			throw _ if isNaN result
			throw _ if result.toString! is state.query.trim!
			result
		catch
			no

	def handle_input
		api.set_link_selection_index 0
		api.sort_links!

	def handle_click_link link
		navigate link

	def navigate link
		await increment_link_frequency link
		window.location.href = link.url

	def handle_return
		if active_bang or state.sorted_links.length < 1
			return handle_bang!
		let link = api.selected_link
		if link.is_bang
			state.query = ''
			active_bang = link
		else
			navigate link

	def handle_del
		if state.query.length < 1
			active_bang = no
			api.sort_links!

	def handle_click_delete link
		return unless window.confirm "Do you really want to delete {link..display_name}?"
		handle_delete link

	def handle_click_pin link
		api.pin_link link

	def handle_shift_backspace
		return unless state.sorted_links.length > 0
		refs.edit.open api.selected_link

	def handle_shift_return
		def go
			if viewing_community_links
				try
					await add_community_link api.selected_link
				catch e
					err "adding community link", e
			else
				handle_add!
		state.loading = yes
		await go!
		editing_link = no
		state.query = ''
		api.sort_links!
		state.loading = no

	def toggle_settings
		refs.settings.open!

	def render

		<self[w:100%]>

			if $as.active
				<app-settings$as>

			else

				<.header>
					css d:flex fld:row w:100%
					css .side c:purple3/90 fs:15px d:flex ja:center w:30px cursor:pointer
					css .side svg w:15px d:flex
					css .left jc:left
					css .right jc:right

					<.side.left@click=api.toggle_effective_names>

						if config.data.enable_effective_names
							<svg src="../assets/eye.svg">

						else
							<svg src="../assets/eye-off.svg">

					<input$links-input
						bind=state.query
						@hotkey('return').capture.if(!state.loading)=handle_return
						@hotkey('tab').capture.if(!state.loading)=api.toggle_effective_names
						@hotkey('esc').capture.if(!state.loading)=toggle_settings
						@hotkey('shift+return').capture.if(!state.loading)=handle_shift_return
						@hotkey('esc').capture.if(!state.loading)=handle_esc
						@hotkey('shift+backspace').capture.if(!state.loading)=handle_shift_backspace
						@hotkey('down').capture.if(!state.loading)=api.increment_link_selection_index
						@hotkey('up').capture.if(!state.loading)=api.decrement_link_selection_index
						@keydown.del.if(!state.loading)=handle_del
						@input.if(!state.loading)=handle_input
						@paste.if(!state.loading)=handle_paste
						@blur=this.focus
						@cut=handle_cut
						disabled=state.loading
					>

					if (let m = math_result) isnt no
						<.side.right@click=handle_click_copy(m)>
							"= {Math.round(m * 100)/100}"
							css c:blue3 fs:20px ml:10px w:unset

					else
						<.side.right @click.if(!state.loading)=toggle_settings>
							<svg src="../assets/settings.svg">

				if config.data.enable_tips
					if active_bang

						<.tips>

							<.tip@click=handle_search>
								<.tip-hotkey> "Return"
								<.tip-content> "Search With Query"

							<.tip@click=exit_bang>
								<.tip-hotkey> "Esc"
								<.tip-content> "Exit Bang"

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
								<.tip-hotkey> "Tab"
								<.tip-content> "Select Next History Item"

					else

						<.tips>

							<.tip @click=handle_return>
								<.tip-hotkey> "Return"
								<.tip-content> "Navigate To Link"

							<.tip[fl:2] @click=handle_shift_return>
								<.tip-hotkey> "Shift + Return"
								<.tip-content.ellipsis>
									<span[ws:pre]> "Add New Link "
									let sq = state.query.trim!.split /\s+/
									if sq.length >= 2
										let url = sq.pop!
										<span> '"'
										<span> sq.join " "
										<span[c:blue3 ws:pre]> " {url}"
										<span> '"'
									else
										<span> "\"{sq.join " "}\""

							<.tip @click=handle_shift_backspace>
								<.tip-hotkey> "Shift + Backspace"
								<.tip-content> "Edit Link"

				<.links>
					css d:flex fld:column jc:flex-start
						fl:1 w:100% ofy:auto pt:15px

					if not viewing_community_links and (active_bang or state.sorted_links.length < 1)
						<app-bang data=active_bang>
					else
						for link, index in state.sorted_links
							<app-link link=link index=index>
