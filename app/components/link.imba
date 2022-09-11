let p = console.log

export default class Link

	def constructor
		store = $1

	def increment_frequency link
		link.frequency += 1
		try
			await put_link link
		catch e
			store.err "putting link", e

	def handle_delete link
		return unless window.confirm "Do you really want to delete {link..display_name}?"
		delete_link link

	def handle_pin link
		pin link

	def add text
		let link = await create_link_from_text text
		link.id = nanoid!
		await db.links.add link
		await reload_db!
		imba.commit!
		p omit(link, "icon")
		return link

	def update old_link, new_link_text
		let new_link = await create_link_from_text new_link_text
		new_link.frequency = old_link.frequency
		let result = await db.links.update old_link.id, new_link
		throw "Link id not found." if result is 0
		await reload_db!
		imba.commit!
		p omit(old_link, "icon")
		p omit(new_link, "icon")
		return new_link

	def put link
		try
			await db.links.update link.id, link
			if link.is_bang and store.config.data.default_bang.id is link.id
				store.config.set_default_bang link
			await reload_db!
		catch e
			store.err "putting link", e

	def delete_link link
		def go
			try
				await store.db.links.delete(link.id)
			catch e
				return store.err "deleting link", e
			try
				await reload_db!
			catch e
				return store.err "reloading db after successful delete", e
		store.loading = yes
		await go!
		selection_index = Math.min store.link.selection_index, store.links.sorted.length - 1
		store.loading = no

	def pin link
		link.is_pinned = !link.is_pinned
		try
			let result = await db.links.update link.id, link
			throw "Link id not found." if result is 0
		catch e
			return store.err "pinning link", e
		await reload_db!
		imba.commit!

	def create_from_text text, get_icon=yes
		text = text.trim!
		throw "Text is empty." if text is ''
		let split_text = text.split(/\s+/)
		throw "No url provided." if split_text.length < 2
		let url = split_text.pop!
		let host
		{ href:url, host } = parse_url url
		let name
		if split_text[-1].startsWith "`"
			name = split_text.pop!.slice(1)
		let display_name = split_text.join(" ")
		let is_bang = no
		let is_pinned = no
		if display_name.startsWith "!"
			is_bang = yes
			display_name = display_name.slice(1)
		name ||= display_name
		let link = { name, display_name, is_bang, is_pinned, url, frequency:0, history:[] }
		if get_icon
			link.icon = await fetch_image_as_base_64 host
		return link

	def construct_text link
		link.display_name = link.display_name.trim!
		link.name = link.name.trim!
		link.url = link.url.trim!
		let link_text = ""
		link_text += "!" if link.is_bang
		link_text += link.display_name
		link_text += " `{link.name}" if link.name isnt link.display_name
		link_text += " {link.url}"
		link_text

	def navigate link
		await increment_frequency link
		window.location.href = link.url

	def handle_add
		store.loading = yes
		try
			await add_link store.home.query
			store.home.query = ''
			links.filter_sort!
		catch e
			store.err "adding link", e
		store.loading = no

	def handle_click
		try
			var link = store.links.selected_link_e
		catch
			return
		if link.is_bang
			store.home.query = ''
			store.bang.active = link
		else
			navigate link

	def view link, index
		<div
			@pointerover=store.links.set_selection_index(index)
			@click=handle_click
			.selected=(index is store.links.selection_index)
		>
			css d:flex fld:row jc:space-between ai:center
				px:16px py:11px rd:5px cursor:pointer c:$text-c
			if link.is_bang
				css c:$bang-c

			<.link-left>
				css d:flex fl:3

				<img.link-icon src=link.icon>
					css w:20px h:20px mr:10px rd:3px

				<.display-name> link.display_name
					css tt:capitalize fs:20px overflow-wrap:anywhere

				if link.display_name isnt link.name and store.config.data.enable_effective_names
					<.name>
						css d:flex ja:center c:$effective-name-c ml:10px fs:14px
						css .parens fs:10px c:$effective-name-parens-c

						<span.parens> "("
						<span> link.name
						<span.parens> ")"

			<.link-right>
				css fl:1 d:flex fld:row jc:space-between ai:center

				css .buttons-disabled .link-button visibility:hidden
				css .selected .link-button visibility:visible

				<.link-buttons .buttons-disabled=!store.config.data.enable_buttons>
					css d:flex fld:row jc:start ai:center gap:5px

					css .link-button visibility:hidden rd:3px c:$button-c fs:15px cursor:pointer px:3px
					if index is selection_index
						css .link-button visibility:visible

					css .link-button svg w:15px

					<.link-button@click.prevent.stop=handle_edit>
						<svg src='../assets/edit-2.svg'>

					<.link-button@click.prevent.stop=handle_delete(link)>
						<svg src='../assets/trash.svg'>

					<.link-button @click.prevent.stop=handle_pin(link)>
						if link.is_pinned
							css visibility:visible c:$button-dim-c

						<svg src='../assets/star.svg'>

				<.frequency> link.frequency
					css fs:15px ml:7px
