tag app-prompt

	active = no

	def get_input s
		input_text = s
		active = yes
		let result = await new Promise! do |resolve|
			self.addEventListener('end') do |e|
				self.removeEventListener('end', this)
				resolve(e.detail)
		active = no
		result

	def end
		emit('end', input_text)

	def render
		<self>
			<input bind=input_text>
			<button@click=end> 'Done.'
