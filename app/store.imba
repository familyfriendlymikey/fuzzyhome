let p = console.log

import pkg from '../package.json'
p "fuzzyhome version {pkg.version}"

import { find, omit, orderBy, cloneDeep, chunk, fill } from 'lodash'
import { nanoid } from 'nanoid'
import { evaluate as eval_math } from 'mathjs'
import fzi from 'fzi'

import db from './db'
import GlobalTips from './global_tips'

import Config from './config'
import Tips from './components/tips'
import CommunityLinks from './components/community-links'
import Settings from './components/settings'
import Bang from './components/bang'
import Prompt from './components/prompt'
import Edit from './components/edit'
import Home from './components/home'
import Links from './components/links'
import Link from './components/link'

class Store

	find = find
	omit = omit
	orderBy = orderBy
	cloneDeep = cloneDeep
	chunk = chunk
	fill = fill

	version = pkg.version
	db = db
	config = new Config(this)

	tips = new Tips(this)
	community_links = new CommunityLinks(this)
	settings = new Settings(this)
	bang = new Bang(this)
	prompt = new Prompt(this)
	edit = new Edit(this)
	home = new Home(this)
	links = new Links(this)
	link = new Link(this)

	global_tips = new GlobalTips(this)

	loading = no

	def err s, e
		p "error:"
		p e
		window.alert("Error {s}:\n\n{e}")

	def reload_db
		links.links = await db.links.toArray()
		if bang.active_bang
			let id = bang.active_bang.id
			bang.active_bang = find links.links, { id }
		let id = config.data.default_bang.id
		let link = find links.links, { id }
		if link
			config.data.default_bang = link
			config.save!
		links.filter_sort!

	def name_exists new_name
		links.links.some do |{name}| new_name is name

	def add_initial_links
		let initial_links = [
			"tutorial github.com/familyfriendlymikey/fuzzyhome"
			"!brave search `b search.brave.com/search?q="
			"!youtube youtube.com/results?search_query="
			"photopea photopea.com"
			"twitch twitch.tv"
			"messenger `me messenger.com"
			"instagram `in instagram.com"
			"localhost `3000 http://localhost:3000"
		]
		for link_text in initial_links
			try
				add_link link_text
			catch e
				err "adding link", e

	def fetch_image_as_base_64 host
		let fallback = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAH0lEQVR42mO8seXffwYqAsZRA0cNHDVw1MBRA0eqgQCDRkbJSQHxEQAAAABJRU5ErkJggg=='
		return new Promise do |resolve|
			let res
			try
				res = await global.fetch("https://icon.horse/icon/{host}")
			catch
				p "Failed to get icon from icon horse."
				return resolve fallback
			# todo: can i use .text() on this or something
			let blob = await res.blob!
			let reader = new FileReader!
			reader.onload = do
				resolve this.result
			reader.onerror = do
				p "Failed to get data from reader."
				resolve fallback
				return
			reader.readAsDataURL(blob)

	def parse_url url
		throw "invalid url" if url === null
		let get_url = do |s|
			let url = new URL s
			throw _ unless (url.host and url.href)
			url
		try
			return get_url url
		try
			return get_url "https://{url}"
		throw "invalid url"

	###
	def get_pretty_date
		Date!.toString!.split(" ").slice(0, 4).join(" ")
	###

global._fuzzyhome_delete_everything = do |prompt=yes|
	return if prompt and window.confirm "This will delete everything. Are you sure?"
	indexedDB.deleteDatabase("fuzzyhome")
	delete localStorage.fuzzyhome_config
	delete localStorage.fuzzyhome_visited
	location.reload!

let store = new Store!
p store
export default store
