tag app-edit

	get render? do mounted?
	active = no

	def open data
		link = data
		new_link_text = value=api.construct_link_text(link)
		active = yes

	def close
		active = no

	def mount
		setTimeout(&, 40) do
			$dn.focus!
		imba.commit!

	def handle_click_set_default_bang
		config.set_default_bang link
		close!

	def handle_delete
		try
			await api.delete_link link
			close!
		catch e
			err "deleting link", e

	def save
		try
			api.update_link link, new_link_text
			close!
		catch e
			err "saving link", e

	def render

		<self>
			css d:flex fld:column gap:20px w:100%

			<div>
				<input$dn bind=new_link_text>

			<app-tips>

				<.tip-row>

					<.tip
						@click=handle_delete
						@hotkey('shift+backspace').capture.if(!state.loading)=handle_delete
					>
						<.tip-hotkey> "Shift + Backspace"
						<.tip-content> "Delete Link"

					<.tip
						@click=save
						@hotkey('return').capture.if(!state.loading)=save
					>
						<.tip-hotkey> "Return"
						<.tip-content> "Update Link"

					if link.is_bang
						<.tip @click=handle_click_set_default_bang>
							<.tip-hotkey> "Click"
							<.tip-content> "Set Default Bang"
					else
						<.tip
							@click=close
							@hotkey('esc').capture.if(!state.loading)=close
						>
							<.tip-hotkey> "Esc"
							<.tip-content> "Cancel"

			if link.is_bang

				<app-tips-more>

					<.tip-row>

						<.tip
							@click=close
							@hotkey('esc').capture.if(!state.loading)=close
						>
							<.tip-hotkey> "Esc"
							<.tip-content> "Cancel"

						<.tip.placeholder>

						<.tip.placeholder>
