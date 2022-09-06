let p = console.log
import all_links from '../assets/community_links'
import fzi from 'fzi'
import api from '../api'

tag app-community-links

	active = no
	selection_index = 0
	query = ""

	get render? do mounted?

	def mount
		$cli.focus!
		links = await get_links!
		render!

	def get_links
		let result = []
		for link_text in all_links
			let link = await api.create_link_from_text(link_text, no)
			link.link_text = link_text
			result.push link
		result

	get filtered_links
		links.filter! do |link| !api.name_exists(link.name)

	get sorted_links
		fzi.sort query, filtered_links, do |x| x.name

	get selected_link
		sorted_links[selection_index]

	def open
		active = yes

	def close
		active = no

	def increment_selection_index
		selection_index = Math.min(links.length - 1, selection_index + 1)

	def decrement_selection_index
		selection_index = Math.max(0, selection_index - 1)

	def add_community_link
		return if state.loading
		state.loading = yes
		try
			await api.add_link selected_link.link_text
		catch e
			err "adding link", e
		state.loading = no

	get tips
		let result = []
		let temp

		temp = {
				click_handler: close.bind(this)
				hotkey_handler: close.bind(this)
				hotkey: "esc"
				hotkey_display_name: "Esc"
				content: "Exit Community Links"
		}
		result.push temp

		temp = {
				click_handler: add_community_link.bind(this)
				hotkey_handler: add_community_link.bind(this)
				hotkey: "shift+return"
				hotkey_display_name: "Shift + Return Or Click"
				content: "Add To Your Links"
		}
		result.push temp

		temp = {
				click_handler: increment_selection_index.bind(this)
				hotkey_handler: increment_selection_index.bind(this)
				hotkey: 'down'
				hotkey_display_name: "Down Arrow"
				content: "Move Selection Down"
		}
		result.push temp

		temp = {
				click_handler: decrement_selection_index.bind(this)
				hotkey_handler: decrement_selection_index.bind(this)
				hotkey: 'up'
				hotkey_display_name: "Up Arrow"
				content: "Move Selection Up"
		}
		result.push temp

		result

	def render

		<self>
			css d:flex fld:column jc:start gap:15px fl:1 w:100% ofy:hidden

			<div>
				<input$cli
					autofocus
					bind=query
				>

			<app-tips tips=tips>

			<.links>
				css ofy:auto

				for link, index in sorted_links
					<.link
						.selected=(selection_index == index)
						@pointerover=(selection_index = index)
						@click=add_community_link
					>
						css d:flex fld:row jc:space-between ai:center px:16px
							py:2px rd:5px cursor:pointer c:$text-c min-height:35px

						if link.is_bang
							css c:$bang-c

						<.link-left> link.name
							css fl:1

						<link-right.ellipsis> link.url
							css fl:1 c:inherit
