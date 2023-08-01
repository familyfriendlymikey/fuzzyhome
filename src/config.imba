export default new class config

	def save
		global.localStorage.fuzzyhome_config = JSON.stringify(data)

	def constructor
		data = {}

		try
			data = JSON.parse(global.localStorage.fuzzyhome_config)

		data.focus ??= yes
		data.open_urls ??= yes

		data.theme ??= "timed"

		data.timed_theme_start ??= 8
		data.timed_theme_end ??= 18

		data.default_bang ??= {}
		data.default_bang.name ??= ""
		data.default_bang.url ??= "https://www.google.com/search?q="
		data.default_bang.frequency ??= 0
		data.default_bang.is_bang ??= yes
		save!

	def cycle_theme
		if data.theme is "dark"
			data.theme = "light"
		elif data.theme is "light"
			data.theme = "timed"
		else
			data.theme = "dark"
		save!

	def set_default_bang
		let res = window.prompt('Insert a new search URL. For example:\nhttps://search.brave.com/search?q=')..trim!
		return unless res
		data.default_bang.url = res
		save!

	def toggle_focus
		data.focus = !data.focus
		save!

	def toggle_open_urls
		data.open_urls = !data.open_urls
		save!

	def set_timed_theme_end
		let res = parseInt(window.prompt!)
		return unless res
		return unless res > 0
		return unless res < 24
		data.timed_theme_end = res
		save!

	def set_timed_theme_start
		let res = parseInt(window.prompt!)
		return unless res
		return unless res > 0
		return unless res < 24
		data.timed_theme_start = res
		save!

	get theme
		if data.theme is "light"
			"light"
		elif data.theme is "timed"
			let hour = new Date!.getHours!
			if hour > data.timed_theme_end or hour < data.timed_theme_start
				"dark"
			else
				"light"
		else
			"dark"
