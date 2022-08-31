let p = console.log
import links from '../assets/community_links'

tag app-community-links

	active = no
	selection_index = 0

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
		await reload_db!
		imba.commit!

	def render

		<self
			@hotkey('esc').capture.if(!loading)=close
			@hotkey('down').capture.if(!loading)=increment_selection_index
			@hotkey('up').capture.if(!loading)=decrement_selection_index
		>

			css self
				d:flex fld:column jc:flex-start fl:1
				w:100% ofy:auto pt:15px

			css .link
				d:flex fld:row jc:space-between ai:center
				px:16px py:11px rd:5px cursor:pointer c:blue3
				min-height:35px

			css .link-left
				fl:1

			css .link-right
				fl:1
				overflow-wrap:anywhere
				word-break:break-all

			css .bang
				c:#FAD4AB

			css .selected
				bg:blue3/5

			<.middle-button>
				<.tip[jc:start ta:center fl:1]
					@click=handle_esc
				>
					<.tip-hotkey> "Esc"
					<.tip-content> "Exit Community Links"
				<.tip[jc:end ta:center fl:1]
					@click=handle_shift_return
				>
					<.tip-hotkey> "Shift + Return"
					<.tip-content> "Add To Your Links"

			for link_text, index in links
				<.link
					.selected=(selection_index == index)
					@pointerover=(selection_index = index)
					@click=(add_community_link(link_text))
				>
					let { url, rest } = get_link_obj link_text
					<.link-left .bang=rest.startsWith("!")> rest
					<.link-right> url
