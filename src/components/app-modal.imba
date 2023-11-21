tag app-modal

	def mount
		$port-input.focus!

	def gotoPort
		api.navigateLocalhost $port-input.value

	def closeModal
		state.port = false

	<self
		.modal
	>
		<.modal-body>
			<input$port-input
				type="number"
				placeholder="Port"
				defaultValue=state.last_port
				autofocus=state.port
				@keydown.enter=gotoPort
				@hotkey('esc').force=closeModal
			>
			<.button-row>
				<button @click=closeModal> "Close"
				<button @click=gotoPort> "Go"
