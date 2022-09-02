tag app-bang

	get encoded_bang_query
		"{active_bang.url}{window.encodeURIComponent(state.query)}"

	def handle_bang
		await api.increment_link_frequency state.active_bang
		window.location.href = encoded_bang_query

	def render

		<self>

			css .bang-text
				tt:none word-break:break-all

			<.bang @click=handle_bang>
				css d:flex fld:row jc:space-between ai:center
					px:16px py:11px rd:5px cursor:pointer c:blue3

