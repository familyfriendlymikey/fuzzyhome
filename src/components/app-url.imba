tag app-url

	get tips
		let result = []
		let temp

		temp = {
				click_handler: api.handle_url.bind(api)
				hotkey_handler: api.handle_url.bind(api)
				hotkey: config.data.hotkey.handle_url
				hotkey_display_name: "Return"
				content: "Go To URL"
		}
		result.push temp

		temp = {
				click_handler: api.handle_cut.bind(api)
				hotkey_display_name: "Cut"
				content: "Cut All Text"
		}
		result.push temp

		result

	<self>
		css w:100% d:flex fld:column gap:15px ofy:hidden

		<app-tips$tips tips=tips>

		<.bang .selected @click=api.handle_url>
			css d:flex fld:row jc:space-between ai:center
				px:16px py:11px rd:5px c:blue6

			<.link-left>
				css d:flex fl:1 ofy:hidden

				<svg.link-icon src='../assets/link-2.svg'>
					css w:20px h:20px mr:10px rd:3px c:blue6

				<.display-name> api.url-query
					css fs:20px of:hidden text-overflow:ellipsis
						word-break:break-all
