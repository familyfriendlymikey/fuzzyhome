tag app-edit

	get render? do mounted?
	active = no

	def open data
		link = data
		active = yes

	def close
		active = no

	def mount
		setTimeout(&, 40) do
			$dn.focus!
		imba.commit!

	def handle_click_set_default_bang
		if link.is_bang isnt true
			return err "setting default bang", "Link is not a bang."
		config.default_bang = link
		save_config!
		state.query = prior_query
		prior_query = ''
		api.sort_links!

	def handle_delete
		try
			await api.delete_link link
			close!
		catch e
			err "deleting link", e

	def save
		try
			if /\s/.test link.name.trim!
				throw "Link name may not contain spaces."
			api.update_link link, api.construct_link_text link
			close!
		catch e
			err "saving link", e

	get new_link_text
		"wip"

	def cycle_focus
		if document.activeElement is $dn
			$n.focus!
		elif document.activeElement is $n
			$u.focus!
		else
			$dn.focus!

	def render

		<self>
			css d:flex fld:column gap:20px w:100%

			<.tips>

				<.tip
					@click=close
					@hotkey('esc').capture.if(!state.loading)=close
				>
					<.tip-hotkey> "Esc"
					<.tip-content> "Cancel"

				<.tip
					@click=handle_delete
					@hotkey('shift+backspace').capture.if(!state.loading)=handle_delete
				>
					css fl:2
					<.tip-hotkey> "Shift + Backspace"
					<.tip-content> "Delete Link"

				if link.is_bang
					<.tip @click=handle_click_set_default_bang>
						css fl:2
						<.tip-hotkey> "Click"
						<.tip-content> "Set Default Bang"

				<.tip
					@click=save
					@hotkey('shift+return').capture.if(!state.loading)=save
				>
					css fl:2
					<.tip-hotkey> "Return"
					<.tip-content> "Update Link"

				<.tip.noclick
					@hotkey('tab').capture.if(!state.loading)=cycle_focus
				>
					<.tip-hotkey> "Tab"
					<.tip-content> "Next"

			<.inputs>
				css d:flex fld:column gap:20px

				<div>
					<input$dn bind=link.display_name>

				<div>
					<input$n bind=link.name>

				<div>
					<input$u bind=link.url>
