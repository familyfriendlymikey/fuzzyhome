global.L = console.log

import pkg from '../package.json'
let version = pkg.version
L "fuzzyhome version {version}"

import state from './state.imba'
import api from './api.imba'
import config from './config.imba'

import './components/app-home.imba'
import './components/app-settings.imba'
import './components/app-links.imba'
import './components/app-link.imba'
import './components/app-bang.imba'
import './components/app-tips.imba'
import './styles.imba'

extend tag element
	get state
		state
	get api
		api
	get config
		config

if config.data.focus and location.search =? "?x"
	throw new Error

global.Pins = {}
global.Frequencies = {}

def init
	let { pins } = await global.chrome.storage.sync.get 'pins'
	Pins = pins or {}

	let { frequencies } = await global.chrome.storage.sync.get 'frequencies'
	Frequencies = frequencies or {}

	global.chrome.bookmarks.getTree! do(bookmarks)
		# Bookmarks Bar folder is guaranteed to be the first child of the bookmarks tree root
		const bookmarkBarTitle = bookmarks[0].children[0].title

		const folder = api.bfs bookmarkBarTitle, bookmarks
		state.links = api.traverse folder
		api.sort_links!
		state.loaded = yes
		imba.commit!

init!

tag app

	<self
		.light=(config.theme is "light")
		.dark=(config.theme is "dark")
		.disabled=state.loading
		ease
	>
		css d:flex fld:column jc:start ai:center
			m:0 w:100% h:100% bg:$bodybg
			ff:sans-serif fw:1
			us:none
			e:100ms
			@off o:0

		<.main>
			css d:flex fld:column jc:start ai:center
				bg:$appbg
				w:80vw max-width:700px max-height:80vh
				bxs:0px 0px 10px rgba(0,0,0,0.35)
				box-sizing:border-box p:30px rd:10px mt:10vh

			if state.view is 'settings'
				<app-settings>
			else
				<app-home>

imba.mount <app>
