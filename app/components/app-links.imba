tag app-links

	get tips
		let result = []

		if api.selected_link_e.is_bang
			result.push global_tips.use_bang
		else
			result.push global_tips.navigate_to_link

		result.push global_tips.create_link
		result.push global_tips.edit_link
		result.push global_tips.toggle_effective_names
		result.push global_tips.toggle_settings

		if api.math_result
			result.push global_tips.cut_math_result
		else
			result.push global_tips.cut_all_text

		result.push global_tips.decrement_link_selection_index
		result.push global_tips.increment_link_selection_index

		if config.data.enable_search_on_paste
			result.push global_tips.instant_search

		result

	def render

		<self>
			css w:100% d:flex fld:column gap:15px ofy:hidden

			<app-tips$tips tips=tips>

			<.links>
				css ofy:auto
				for link, index in state.sorted_links
					<app-link link=link index=index handle_edit=handle_edit>

