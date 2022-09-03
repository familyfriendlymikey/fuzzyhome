import { chunk, fill } from 'lodash'

tag app-tips

	show_more = no

	def toggle
		show_more = not show_more

	get placeholder
		<.tip.placeholder>

	def pad arr
		let i = arr.length
		while i < 3
			arr.push placeholder
			i += 1

	def get_chunks
		let chunks = chunk(tips, 3)
		pad(chunks[-1])
		chunks

	css >>> .tip-row
		d:flex fld:row w:100% fl:1
		fs:20px fs:14px
		jc:end ta:center
		bg:#20222f c:purple4

	css >>> .tip
		d:flex fld:column jc:start fl:1
		bdr:1px solid blue3/10
		min-width:0 ta:center p:10px
		cursor:pointer transition:background 100ms
		@first ta:left rdl:3px
		@last ta:right bd:none rdr:3px
		@hover bg:purple3/3

	css >>> .tip.noclick, .tip.placeholder
		@hover bg:none cursor:auto

	css >>> .tip-hotkey
		fs:12px c:purple3/50

	css >>> .tip-content
		pt:2px fs:14px c:purple3

	def render
		let chunks = get_chunks!

		<self[d:none]=!config.data.enable_tips>
			css d:flex fld:column gap:15px

			<.tip-row>
				for tip in chunks[0]
					<> tip

			if chunks.length > 1

				<@click=toggle>
					css w:100% d:flex ja:center c:purple3 rdb:4px cursor:pointer
						transition:background 100ms
						@hover bg:purple3/3
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
								<> tip
