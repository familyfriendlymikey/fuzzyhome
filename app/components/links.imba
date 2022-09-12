let p = console.log

import fzi from 'fzi'

export default class Links

	def constructor
		store = $1

	selection_index = 0
	links = []
	sorted_links = []

	def filter_sort
		if store.home.query.trim!.length <= 0
			sorted_links = store.orderBy(store.links.links, ['is_pinned', 'frequency'], ['desc', 'desc'])
		elif store.config.data.enable_effective_names
			sorted_links = fzi.sort store.home.query, store.links.links, do $1.name
		else
			sorted_links = fzi.sort store.home.query, store.links.links, do $1.display_name

	def toggle_effective_names
		store.config.data.enable_effective_names = !store.config.data.enable_effective_names
		store.config.save!
		links.filter_sort!

	get selected_link_e
		sorted_links[selection_index]

	def set_selection_index index
		selection_index = index

	def increment_selection_index
		set_selection_index Math.min(sorted_links.length - 1, selection_index + 1)

	def decrement_selection_index
		set_selection_index Math.max(0, selection_index - 1)

	get tips
		let result = []

		if selected_link_e.is_bang
			result.push store.global_tips.use_bang
		else
			result.push store.global_tips.navigate_to_link

		result.push store.global_tips.create_link
		result.push store.global_tips.edit_link
		result.push store.global_tips.toggle_effective_names
		result.push store.global_tips.toggle_settings

		if store.math_result
			result.push store.global_tips.cut_math_result
		else
			result.push store.global_tips.cut_all_text

		result.push store.global_tips.decrement_link_selection_index
		result.push store.global_tips.increment_link_selection_index

		if store.config.data.enable_search_on_paste
			result.push store.global_tips.instant_search

		result

	get view
		store.tips.tips = tips

		<div>
			css w:100% d:flex fld:column gap:15px ofy:hidden

			<(store.tips.view)>

			<.links>
				css ofy:auto
				for link, index in sorted_links
					# <app-link link=link index=index handle_edit=handle_edit>
					<(store.link.view(link, index))>
