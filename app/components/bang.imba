let p = console.log

export default class Bang

	def constructor
		store = $1

	active_bang = no
	selection_index = -1

	def unmount
		selection_index = -1

	def delete_history
		bang.history = []
		try
			await put_link bang
			selection_index = -1
		catch e
			err "deleting bang history", e
		store.config.data.default_bang.history = []
		store.config.save!
		hide_more_tips!

	def delete_history_item
		let text = sorted_bang_history[store.bang.selection_index]
		return unless text
		let i = bang.history.indexOf(text)
		return unless i > -1
		bang.history.splice(i, 1)
		try
			await put_link bang
			store.bang.selection_index = Math.min store.bang.selection_index, sorted_bang_history.length - 1
		catch e
			err "updating bang history", e

	get encoded_bang_query
		"{bang.url}{window.encodeURIComponent(store.home.query)}"

	get encoded_bang_query_nourl
		"{window.encodeURIComponent(store.home.query)}"

	def update_history bang
		let text
		if store.bang.selection_index > -1
			text = sorted_bang_history.splice(store.bang.selection_index, 1)[0]
		text ||= store.home.query.trim!
		return unless text
		let i = bang.history.indexOf(text)
		if i > -1
			bang.history.splice(i, 1)
		bang.history.unshift text
		try
			await put_link bang
		catch e
			err "updating bang history", e

	def handle_click
		return if store.loading
		if store.bang.selection_index > -1
			store.home.query = sorted_bang_history[store.bang.selection_index]
			store.bang.selection_index = -1
			return
		await increment_link_frequency bang
		await update_history bang
		window.location.href = encoded_bang_query

	def unset_active_bang
		store.bang.active = no
		links.filter_sort!

	def increment_bang_selection_index
		store.bang.selection_index = Math.min(sorted_bang_history.length - 1, store.bang.selection_index + 1)

	def decrement_bang_selection_index
		store.bang.selection_index = Math.max(-1, store.bang.selection_index - 1)

	get sorted_bang_history
		fzi.sort store.home.query, bang.history

	def delete_all_bang_history
		return unless window.confirm "Are you sure you want to delete all bang history?"
		try
			await db.links.toCollection!.modify do |link| link.history = []
			await reload_db!
		catch e
			err "deleting some link histories", e
		imba.commit!

	get tips
		let result = []

		if selection_index > -1
			result.push global_tips.use_bang_history_item
		else
			result.push global_tips.search

		result.push global_tips.create_link

		if selection_index > -1
			result.push global_tips.delete_bang_history_item

		if store.bang.active
			result.push global_tips.unset_active_bang

		result.push global_tips.toggle_effective_names
		result.push global_tips.delete_bang_history

		if store.math_result
			result.push global_tips.cut_math_result
		else
			result.push global_tips.cut_all_text

		if store.config.data.enable_search_on_paste
			result.push global_tips.instant_search

		result

	get view

		<div
			@hotkey("tab").force=increment_bang_selection_index
			@hotkey("up").force=decrement_bang_selection_index
			@hotkey("down").force=increment_bang_selection_index
			@hotkey("shift+tab").force=decrement_bang_selection_index
		>
			css w:100% d:flex fld:column gap:15px ofy:hidden

			<(store.tips.view)>

			<.bang
				.selected=(selection_index is -1)
				[c:$bang-c]=(selection_index is -1)
				@pointerover=(selection_index = -1)
				@click=handle_click
			>
				css d:flex fld:row jc:space-between ai:center
					px:16px py:11px rd:5px cursor:pointer c:$text-c

				<.link-left>
					css d:flex fl:1 ofy:hidden

					<img.link-icon src=bang.icon>
						css w:20px h:20px mr:10px rd:3px

					<.display-name> "...{encoded_bang_query_nourl}"
						css fs:20px of:hidden text-overflow:ellipsis

				<.link-right>
					css d:flex fld:row jc:space-between ai:center

					<.frequency> bang.frequency
						css fs:15px ml:7px

			<.history>
				css d:flex fld:column jc:start ai:center ofy:auto

				for item, index in sorted_bang_history
					<.item
						@pointerover=(selection_index = index)
						@click=handle_click
						[c:$bang-c]=(selection_index is index)
						.selected=(selection_index is index)
					> item
						css w:100% fs:17px c:$text-c rd:5px p:10px 10px
							box-sizing:border-box cursor:pointer
