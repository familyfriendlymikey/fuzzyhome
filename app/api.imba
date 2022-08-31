import db from './db'
import state from './state'
import { omit, orderBy } from 'lodash'

export default new class api

	def add_link text
		let link = await create_link_from_text text
		link.id = nanoid!
		await db.links.add link
		await reload_db!
		imba.commit!
		p omit(link, "icon")
		return link

	def update_link old_link, new_link_text
		let new_link = await create_link_from_text new_link_text
		new_link.frequency = old_link.frequency
		let result = await db.links.update old_link.id, new_link
		throw "Link id not found." if result is 0
		await reload_db!
		imba.commit!
		p omit(old_link, "icon")
		p omit(new_link, "icon")
		return new_link

	def handle_delete link
		def delete_link
			try
				await db.links.delete(link.id)
			catch e
				err "deleting link", e
			try
				await reload_db!
			catch e
				err "reloading db after successful delete", e
		state.loading = yes
		await delete_link!
		state.query = prior_query
		prior_query = ''
		editing_link = no
		sort_links!
		selection_index = Math.min selection_index, state.sorted_links.length - 1
		state.loading = no

	def pin_link link
		link.is_pinned = !link.is_pinned
		try
			let result = await db.links.update link.id, link
			throw "Link id not found." if result is 0
		catch e
			return err "pinning link", e
		await reload_db!
		imba.commit!

	def reload_db
		state.links = await db.links.toArray()
		sort_links!

	def increment_link_frequency link
		try
			await db.links.update link.id, { frequency: link.frequency + 1 }
		catch e
			err "putting link", e

	def sort_links
		if state.query.trim!.length <= 0
			return state.sorted_links = orderBy(state.links, ['is_pinned', 'frequency'], ['desc', 'desc'])
		if config.enable_effective_names
			return state.sorted_links = fzi state.links, state.query
		state.sorted_links = fzi state.links, state.query, "display_name"
