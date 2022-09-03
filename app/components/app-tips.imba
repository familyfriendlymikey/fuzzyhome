import { chunk, fill } from 'lodash'

tag app-tips

	css >>> .tip-row
		d:flex fld:row w:100% fl:1
		fs:20px
		fs:14px
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

	css >>> .tip.placeholder
		visibility:hidden

	css >>> .tip.noclick
		@hover bg:none cursor:auto

	css >>> .tip-hotkey
		fs:12px c:purple3/50

	css >>> .tip-content
		pt:2px fs:14px c:purple3

	<self[d:none]=!config.data.enable_tips>
		<.tip-row>
			for tip in tips
				<> tip

tag app-tips-more < app-tips

	get render? do mounted?

	def mount
		active = no
		imba.commit!

	get hidden do !active
	toggle = do active = !active
	open = do active = yes
	close = do active = no

	get placeholder
		<.tip.placeholder>

	def pad arr
		p arr
		let i = arr.length
		while i < 3
			arr.push placeholder
			i += 1
		p arr

	get chunks
		let chunks = chunk(tips, 3)
		pad(chunks[-1])
		chunks

	<self[d:none]=!config.data.enable_tips>
		css d:flex fld:column gap:15px

		<@click=toggle>
			css w:100% d:flex ja:center c:purple3 rdb:4px cursor:pointer
				transition:background 100ms
				@hover bg:purple3/3
			if active
				css rd:0

			css svg w:15px
			if active
				<svg src="../assets/chevron-down.svg">
			else
				<svg src="../assets/chevron-up.svg">

		<.more>
			css d:flex fld:column gap:15px
			if hidden
				css d:none

			for row in chunks
				<.tip-row>
					for tip in row
						<> tip
