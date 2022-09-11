let p = console.log
import all_links from '../assets/community_links'
import fzi from 'fzi'

export default class CommunityLinks

	constructor
		store = $1

	active = no
	selection_index = 0
	query = ""

	get render? do mounted?

	def mount
		$cli.focus!
		links = await get_links!
		render!

	def open
		store.community_links.active = yes

	def close
		store.community_links.active = no

	def add
		return if store.loading
		store.loading = yes
		try
			await add_link selected_link_e.link_text
		catch e
			store.err "adding link", e
		store.loading = no

	get selected_community_link
		sorted_community_links[selection_index]

	get sorted_community_links
		fzi.sort query, filtered_links, do $1.name

	def get_links
		let result = []
		for link_text in all_links
			let link = await store.create_link_from_text(link_text, no)
			link.link_text = link_text
			result.push link
		result

	get filtered_links
		links.filter do !store.name_exists($1.name)

	def increment_selection_index
		selection_index = Math.min(links.length - 1, selection_index + 1)

	def decrement_selection_index
		selection_index = Math.max(0, selection_index - 1)

	get tips
		let result = []
		let temp

		result

	get view

		<div>
			css d:flex fld:column jc:start gap:15px fl:1 w:100% ofy:hidden

			<div>
				<input
					autofocus
					bind=query
				>

			<(store.tips.view)>
			# <app-tips tips=tips>

			<.links>
				css ofy:auto

				for link, index in sorted_links
					<.link
						.selected=(selection_index == index)
						@pointerover=(selection_index = index)
						@click=add
					>
						css d:flex fld:row jc:space-between ai:center px:16px
							py:2px rd:5px cursor:pointer c:$text-c min-height:35px

						if link.is_bang
							css c:$bang-c

						<.link-left> link.name
							css fl:1

						<link-right.ellipsis> link.url
							css fl:1 c:inherit
