import { chunk, fill } from 'lodash'

tag app-tips

	def unmount
		show_more = no

	def toggle
		show_more = not show_more

	def pad arr
		let i = arr.length
		while i < 3
			arr.push { placeholder: yes }
			i += 1

	def get_chunks
		let chunks = chunk(tips, 3)
		pad(chunks[-1])
		chunks

	css >>> .tip-row
		d:flex fld:row w:100% fl:1
		fs:20px fs:14px
		jc:end ta:center

	css >>> .tip
		d:flex fld:column jc:start fl:1
		bdr:1px solid
		bc:$tip-bc
		min-width:0 ta:center p:10px
		cursor:pointer transition:background 100ms
		@first ta:left rdl:3px
		@last ta:right bd:none rdr:3px
		@hover bg:$tip-hover-c

	css >>> .tip.noclick, .tip.placeholder
		@hover bg:none cursor:auto

	css >>> .tip-hotkey
		fs:12px c:$tip-hotkey-c

	css >>> .tip-content
		pt:2px fs:14px c:$tip-content-c

	def render
		let chunks = get_chunks!

		<self[d:none]=!config.data.enable_tips>
			css d:flex fld:column gap:15px

			<.tip-row>
				for tip in chunks[0]
					<.tip
						.noclick=(not tip.click_handler)
						@click.if(tip.click_handler)=tip.click_handler
						@hotkey(tip.hotkey).if(tip.hotkey_handler and tip.hotkey).force=tip.hotkey_handler
					>
						<.tip-hotkey> tip.hotkey_display_name
						<.tip-content> tip.content

			if chunks.length > 1

				<@click=toggle>
					css w:100% d:flex ja:center c:$button-c rdb:4px cursor:pointer
						transition:background 100ms
						@hover bg:$tip-hover-c
					if show_more
						css rd:0

					css svg w:15px
					if show_more
						<svg src="../assets/chevron-down.svg">
					else
						<svg src="../assets/chevron-up.svg">

				<.more>
					css d:flex fld:column gap:15px
					unless show_more
						css d:none

					for row in chunks.slice(1)
						<.tip-row>
							for tip in row
								<.tip
									.noclick=(not tip.click_handler)
									@click.if(tip.click_handler)=tip.click_handler
									@hotkey(tip.hotkey).if(tip.hotkey_handler and tip.hotkey).force=tip.hotkey_handler
								>
									<.tip-hotkey> tip.hotkey_display_name
									<.tip-content> tip.content
