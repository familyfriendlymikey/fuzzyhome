let p = console.log
import pkg from '../package.json'
let version = pkg.version
p "fuzzyhome version {version}"

# import sw from './sw.imba?serviceworker'
# navigator..serviceWorker..register(sw).then! do |reg| reg.update!

import { nanoid } from 'nanoid'
import { err } from './utils'

import db from './db'
import state from './state'
let refs = {}
import api from './api'
import config from './config'

import './components/app-home'
import './components/app-community-links'
import './components/app-settings'
import './components/app-prompt'
import './components/app-edit'
import './components/app-links'
import './components/app-link'
import './components/app-bang'
import './components/app-tips'
import './styles'

extend tag element
	get state
		state
	get api
		api
	get config
		config
	get refs
		refs
	get err
		err
	get version
		version
	get p
		console.log

tag app

	fatal_error = no

	get render? do mounted?

	def mount

		refs.settings = $as
		refs.edit = $ae
		refs.community-links = $acl
		refs.links = $ah

		unless global.localStorage.fuzzyhome_visited
			await api.add_initial_links!
			global.localStorage.fuzzyhome_visited = yes

		try
			await api.reload_db!
			p "links:", state.links
		catch e
			err "state.loading database", e
			fatal_error = yes
			return

	def render

		<self.disabled=state.loading>
			css d:flex fld:column jc:start ai:center
				w:80vw max-width:700px max-height:80vh
				bxs:0px 0px 10px rgba(0,0,0,0.35)
				box-sizing:border-box p:30px rd:10px mt:10vh

			if fatal_error
				<.fatal>
					css c:blue2
					"""
						There was an error state.loading the database.
						This could be due to a user setting
						disallowing local storage, or a random error.
						Consider refreshing.
						Check developer console for more information.
					"""

			elif $acl.active
				<app-community-links$acl>

			elif $as.active
				<app-settings$as>

			elif $ae.active
				<app-edit$ae>

			else
				<app-home$ah>

imba.mount <app>
