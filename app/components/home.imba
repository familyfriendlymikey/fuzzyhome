let p = console.log

export default class Home

	def constructor
		store = $1

	query = ''

	def handle_cut e
		return unless e.target.selectionStart is e.target.selectionEnd
		let s = math_result or query
		await window.navigator.clipboard.writeText(s)
		query = ''
		links.filter_sort!

	get math_result
		try
			let result = Number(eval_math query)
			throw '' if isNaN result
			throw '' if result.toString! is query.trim!
			result
		catch
			no

	def handle_paste e
		return unless store.config.data.enable_search_on_paste
		return if query.length > 0
		global.setTimeout(&, 0) do
			return if math_result isnt no
			bang ||= store.config.data.default_bang
			store.bang.handle_click!

	def handle_click_copy s
		try
			await window.navigator.clipboard.writeText(s)
			query = ''
			store.links.filter_sort!

	def handle_input
		store.bang.selection_index = -1
		store.links.set_selection_index 0
		store.links.filter_sort!

	get view

		<div>
			css w:100% d:flex fld:column ofy:hidden gap:20px

			<.header>
				css d:flex fld:row w:100%

				css .side c:$button-c fs:15px d:flex ja:center w:30px cursor:pointer
				css .side svg w:15px d:flex

				<.side.left@click=store.links.toggle_effective_names>
					css jc:left

					if store.config.data.enable_effective_names
						<svg src="../assets/eye.svg">

					else
						<svg src="../assets/eye-off.svg">

				<input
					autofocus
					bind=query
					@input=handle_input
					@paste=handle_paste
					@cut=handle_cut
					disabled=store.loading
					@blur=blur
				>
					if query.startsWith "!"
						css c:$bang-c

				if (let m = math_result) isnt no
					<.side.right@click=handle_click_copy(m)>
						"= {Math.round(m * 100)/100}"
						css c:$text-c fs:20px ml:10px w:unset jc:right

				else
					<.side.right @click=store.settings.open>
						<svg src="../assets/settings.svg">

			if store.bang.active or store.links.sorted_links.length < 1
				<(store.bang.view)>

			else
				<(store.links.view)>
