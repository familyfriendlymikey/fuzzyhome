let p = console.log

export default class Prompt

	def constructor
		store = $1

	def get_input d
		data = cloneDeep d
		active = yes
		let result = await new Promise do |resolve|
			self.addEventListener('end') do |e|
				self.removeEventListener('end', this)
				resolve(e.detail)
		active = no
		result

	def end
		emit('end', data)
