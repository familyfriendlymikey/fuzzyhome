tag app-bang

	get tips
		let result = []
		let temp

		temp = {
				click_handler: api.handle_bang.bind(api)
				hotkey_handler: api.handle_bang.bind(api)
				hotkey: config.data.hotkey.handle_bang
				hotkey_display_name: "Return"
				content: "Search"
		}
		result.push temp

		temp = {
				click_handler: api.handle_cut.bind(api)
				hotkey_display_name: "Cut"
				content: "Cut All Text"
		}
		result.push temp

		if state.active_bang
			temp = {
					click_handler: api.unset_active_bang.bind(api)
					hotkey_handler: api.unset_active_bang.bind(api)
					hotkey: config.data.hotkey.unset_active_bang
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

					<.display-name> api.encoded_bang_query
						css fs:20px of:hidden text-overflow:ellipsis
							word-break:break-all

				<.link-right>
					css d:flex fld:row jc:space-between ai:center

					<.frequency> api.bang.frequency
						css fs:15px ml:7px
