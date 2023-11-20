import { chunk, fill } from 'lodash'

tag app-tip

	<self
		@click.if(tip.click_handler)=tip.click_handler
	>
		css d:flex fld:column jc:start fl:1
			bdr:1px solid
			bc:$tip-bc
			min-width:0 ta:center p:10px
			transition:background 100ms
			@first ta:left rdl:3px
			@last ta:right bd:none rdr:3px
			@hover bg:$tip-hover-c
			cursor:pointer
		if tip.placeholder or not tip.click_handler
			css
				@hover @important bg:none

		if tip.hotkey_handler and tip.hotkey
			<@hotkey(tip.hotkey).force=tip.hotkey_handler>
				css d:none

		<.tip-hotkey> tip.hotkey_display_name
			css fs:12px c:$tip-hotkey-c

		<.tip-content> tip.content
			css pt:2px fs:14px c:$tip-content-c

tag app-tips

	@observable tips

	def unmount
		show_more = no

	def toggle
		show_more = not show_more

	def pad arr
		let i = arr.length
		while i < 3
			arr.push { placeholder: yes }
			i += 1

	@computed get chunks
		let chunks = chunk(tips, 3)
		pad(chunks[-1])
		chunks

	<self>
		css d:flex fld:column gap:15px max-height:75%

		css .tip-row
			d:flex fld:row w:100% fl:1
			fs:20px fs:14px
			jc:end ta:center

		<.tip-row>
			for tip in chunks[0]
				<app-tip tip=tip>

		if chunks.length > 1

			<@click=toggle>
				css w:100% d:flex ja:center c:$button-c rdb:4px
					transition:background 100ms
					@hover bg:$tip-hover-c cursor:pointer
				if show_more
					css rd:0

				<svg src="../assets/chevron-down.svg">
					css w:15px transition:transform 150ms
					if show_more
						css transform:rotate(180deg)

			# hotkeys depend on the presence of tips in the dom so
			# can't ease this as is
			<.more [d:none]=!show_more>
				css d:flex fld:column gap:15px ofy:auto e:300ms

				for row in chunks.slice(1)
					<.tip-row>
						for tip in row
							<app-tip tip=tip>
