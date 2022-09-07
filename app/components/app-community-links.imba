let p = console.log
import all_links from '../assets/community_links'
import fzi from 'fzi'
import api from '../api'

tag app-community-links

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

	def increment_selection_index
		selection_index = Math.min(links.length - 1, selection_index + 1)

	def decrement_selection_index
		selection_index = Math.max(0, selection_index - 1)

	get tips
		let result = []
		let temp

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
						@click=api.add_community_link
					>
						css d:flex fld:row jc:space-between ai:center px:16px
							py:2px rd:5px cursor:pointer c:$text-c min-height:35px

						if link.is_bang
							css c:$bang-c

						<.link-left> link.name
							css fl:1

						<link-right.ellipsis> link.url
							css fl:1 c:inherit
