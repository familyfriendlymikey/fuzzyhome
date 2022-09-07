export default {

	def open_community_links
		state.community_links_active = yes

	def close_community_links
		state.community_links_active = no

	def add_community_link
		return if state.loading
		state.loading = yes
		try
			await add_link selected_community_link_e.link_text
		catch e
			err "adding link", e
		state.loading = no

	get selected_community_link
		sorted_community_links[state.community_links_selection_index]

	get sorted_community_links
		fzi.sort query, filtered_links, do |x| x.name

}
