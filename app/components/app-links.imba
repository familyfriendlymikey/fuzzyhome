import { evaluate as eval_math } from 'mathjs'

tag app-links

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
		api.sort_links!

	def handle_add
		state.loading = yes
		try
			await api.add_link state.query
			state.query = ''
			api.sort_links!
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

	def handle_click_link
		if state.active_bang or state.sorted_links.length < 1
			return handle_bang!
		let link = api.selected_link
		if link.is_bang
			state.query = ''
			state.active_bang = link
		else
			api.navigate link

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
						@input.if(!state.loading)=handle_input
						@paste.if(!state.loading)=handle_paste
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
					if state.active_bang

						<app-tips>

							<.tip
								@click=(state.active_bang = no)
								@hotkey('esc').capture.if(!state.loading)=(state.active_bang = no)
							>
								<.tip-hotkey> "Esc"
								<.tip-content> "Back"

					else

						<app-tips>

							<.tip-row>

								<.tip
									@click=handle_click_link
									@hotkey('return').force.if(!loading)=handle_click_link
								>
									<.tip-hotkey> "Return"
									<.tip-content> "Navigate To Link"

								<.tip
									@click=handle_shift_return
									@hotkey('shift+return').capture.if(!state.loading)=handle_shift_return
								>
									<.tip-hotkey> "Shift + Return"
									<.tip-content.ellipsis>
										<span[ws:pre]> "Create Link "
										let sq = state.query.trim!.split /\s+/
										if sq.length >= 2
											let url = sq.pop!
											<span> '"'
											<span> sq.join " "
											<span[c:blue3 ws:pre]> " {url}"
											<span> '"'
										else
											<span> "\"{sq.join " "}\""

								<.tip
									@click=handle_shift_backspace
									@hotkey('shift+backspace').capture.if(!state.loading)=handle_shift_backspace
								>
									<.tip-hotkey> "Shift + Backspace"
									<.tip-content> "Edit Link"

						<app-tips-more$tips-more>

							<.tip-row>

								<.tip
									@click.if(!state.loading)=api.toggle_effective_names
									@hotkey('tab').capture.if(!state.loading)=api.toggle_effective_names
								>
									<.tip-hotkey> "Tab"
									<.tip-content> "Toggle Effective Names"

								<.tip
									@click.if(!state.loading)=api.toggle_settings
									@hotkey('esc').capture.if(!state.loading)=toggle_settings
								>
									<.tip-hotkey> "Esc"
									<.tip-content> "Toggle Settings"

								<.tip.noclick
									@hotkey('down').capture.if(!state.loading)=api.increment_link_selection_index
									@hotkey('up').capture.if(!state.loading)=api.decrement_link_selection_index
								>
									<.tip-hotkey> "Up/Down Arrow"
									<.tip-content> "Move Selection"

							<.tip-row>

								<.tip
									@click.if(!loading)=handle_cut
								>
									if math_result
										<.tip-hotkey> "Cut (Math, If No Selection)"
										<.tip-content> "Cut Math Result"
									else
										<.tip-hotkey> "Cut (If No Selection)"
										<.tip-content> "Cut All Text"

								<.tip.noclick>
									<.tip-hotkey> "Paste (If Input Empty)"
									<.tip-content> "Instant Search"

								<.tip.placeholder>

				unless $tips-more.active
					<.links>
						css d:flex fld:column jc:flex-start
							fl:1 w:100% ofy:auto

						if not viewing_community_links and (state.active_bang or state.sorted_links.length < 1)
							<app-bang data=state.active_bang>
						else
							for link, index in state.sorted_links
								<app-link link=link index=index>
