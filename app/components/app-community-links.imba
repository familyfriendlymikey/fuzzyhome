let p = console.log
import links from '../assets/community_links'
import fzi from 'fzi'

tag app-community-links

	active = yes
	selection_index = 0

	def mount
		$cli.focus!

	def open
		active = yes

	def close
		active = no

	def increment_selection_index
		selection_index = Math.min(links.length - 1, selection_index + 1)

	def decrement_selection_index
		selection_index = Math.max(0, selection_index - 1)

	def get_link_obj link_text
		let split_text = link_text.trim!.split /\s+/
		let url = split_text.pop!
		let rest = split_text.join " "
		{ url, rest }

	def add_community_link link
		await db.links.add link
		await api.reload_db!
		imba.commit!

	get tips
		let result = []

		result.push <>
			<.tip @click=close>
				<.tip-hotkey> "Esc"
				<.tip-content> "Exit Community Links"

		result.push <>
			<.tip @click=handle_shift_return>
				<.tip-hotkey> "Shift + Return Or Click"
				<.tip-content> "Add To Your Links"

		result.push <>
			<.tip.noclick
				@hotkey('down').capture.if(!state.loading)=increment_selection_index
				@hotkey('up').capture.if(!state.loading)=decrement_selection_index
			>
				<.tip-hotkey> "Up/Down Arrow"
				<.tip-content> "Move Selection"

		result

	def render

		<self>
			css d:flex fld:column jc:start gap:15px fl:1 w:100% ofy:hidden

			<div>
				<input$cli autofocus>

			<app-tips tips=tips>

			<.links>
				css ofy:auto

				for link_text, index in links
					<.link
						.selected=(selection_index == index)
						@pointerover=(selection_index = index)
						@click=(add_community_link(link_text))
					>
						css d:flex fld:row jc:space-between ai:center px:16px
							py:11px rd:5px cursor:pointer c:blue3 min-height:35px

						let { url, rest } = get_link_obj link_text

						<.link-left> rest
							css fl:1
							if rest.startsWith("!")
								css c:#FAD4AB

						<.link-right> url
							css fl:1 overflow-wrap:anywhere word-break:break-all
