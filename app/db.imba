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
	trans.links.toCollection!.modify! do |link|
		let id = nanoid!
		let name = link.name
		let url = link.link
		let frequency = link.frequency
		let img = link.img
		this.value = { id, name, url, frequency, img }

export default db
