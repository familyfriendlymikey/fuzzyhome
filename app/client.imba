let p = console.log

# import sw from './sw.imba?serviceworker'
# navigator..serviceWorker..register(sw).then do |reg| reg.update!

import store from './store'
import './styles'

tag app

	fatal_error = no

	get render? do mounted?

	def mount
		unless global.localStorage.fuzzyhome_visited
			await store.add_initial_links!
			global.localStorage.fuzzyhome_visited = yes
		try
			await store.reload_db!
		catch e
			store.err "loading database", e
			fatal_error = yes
		render!

	def render

		<self
			.light=(store.config.theme is "light")
			.dark=(store.config.theme is "dark")
			.disabled=store.loading
		>
			css d:flex fld:column jc:start ai:center m:0 w:100% h:100%
				bg:$bodybg ff:sans-serif fw:1 user-select:none

			<.main>
				css d:flex fld:column jc:start ai:center
					bg:$appbg
					w:80vw max-width:700px max-height:80vh
					bxs:0px 0px 10px rgba(0,0,0,0.35)
					box-sizing:border-box p:30px rd:10px mt:10vh

				if fatal_error
					<.fatal>
						css c:$text-c
						"""
							There was an error loading the database.
							This could be due to a user setting
							disallowing local storage, or a random error.
							Consider refreshing.
							Check developer console for more information.
						"""

				elif store.community_links.active
					<(store.community_links.view)>

				elif store.settings.active
					<(store.settings.view)>

				elif store.edit.link
					<(store.edit.view)>

				else
					<(store.home.view)>

imba.mount <app>
