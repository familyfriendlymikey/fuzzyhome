tag app-bang

	get tips
		let result = []
		let temp

		temp = {
				click_handler: api.handle_bang.bind(api)
				hotkey_handler: api.handle_bang.bind(api)
				hotkey: 'return'
				hotkey_display_name: "Return"
				content: "Search"
		}
		result.push temp

		temp = {
				click_handler: api.handle_cut.bind(api)
		}
		if api.math_result
			temp.hotkey_display_name = "Cut Math"
			temp.content = "Cut Math Result"
		else
			temp.hotkey_display_name = "Cut"
			temp.content = "Cut All Text"
		result.push temp

		if state.active_bang
			temp = {
					click_handler: api.unset_active_bang.bind(api)
					hotkey_handler: api.unset_active_bang.bind(api)
					hotkey: 'esc'
					hotkey_display_name: "Esc"
					content: "Back"
			}
			result.push temp

		result

	<self>
		css w:100% d:flex fld:column gap:15px ofy:hidden

		<app-tips$tips tips=tips>

		unless $tips.show_more

			<.bang .selected [c:$bang-c] @click=api.handle_bang>
				css d:flex fld:row jc:space-between ai:center
					px:16px py:11px rd:5px c:$text-c

				<.link-left>
					css d:flex fl:1 ofy:hidden

					<img.link-icon src=api.get-icon(api.bang.url)>
						css w:20px h:20px mr:10px rd:3px

					<.display-name> "...{api.encoded_bang_query_nourl}"
						css fs:20px of:hidden text-overflow:ellipsis

				<.link-right>
					css d:flex fld:row jc:space-between ai:center

					<.frequency> api.bang.frequency
						css fs:15px ml:7px
