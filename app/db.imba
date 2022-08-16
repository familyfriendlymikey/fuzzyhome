let p = console.log
import Dexie from 'dexie'
import 'dexie-export-import'
import { nanoid } from 'nanoid'

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

import { parse_url } from './utils'
db.version(3).stores({
	links: "++id,name,url,frequency,img"
}).upgrade! do |trans|
	p "upgrading to fuzzyhome db version 3"
	trans.links.toCollection!.modify! do |link|
		try
			link.url = parse_url(link.url).href

export default db
