let p = console.log
import Dexie from 'dexie'
import 'dexie-export-import'
import { nanoid } from 'nanoid'
import api from './api'

let db = new Dexie 'fuzzyhome'

db.version(1).stores({
	links: "++id,name,link"
})

db.version(2).stores({
	links: "++id,name,url,frequency,img"
}).upgrade! do |trans|
	p "upgrading to fuzzyhome db version 2"
	trans.links.toCollection!.modify! do |link|
		let id = nanoid!
		let name = link.name
		let url = link.link
		let frequency = link.frequency
		let img = link.img
		this.value = { id, name, url, frequency, img }

db.version(3).stores({
	links: "++id,name,url,frequency,img"
}).upgrade! do |trans|
	p "upgrading to fuzzyhome db version 3"
	trans.links.toCollection!.modify! do |link|
		try
			link.url = api.parse_url(link.url).href

db.version(4).stores({
	links: "++id,display_name,name,is_bang,is_pinned,url,frequency,history,icon"
}).upgrade! do |trans|
	p "upgrading to fuzzyhome db version 4"
	trans.links.toCollection!.modify! do |link|
		link.display_name = link.name
		link.is_bang = no
		link.icon = link.img
		link.is_pinned = no
		link.history = []
		delete link.img

export default db
