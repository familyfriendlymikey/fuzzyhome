let p = console.log
const sharp = require 'sharp'
import links from '../app/community_links'

def main
	for link in links
		data = link.icon.replace(/data:.*base64,/, '')
		p data.slice(0, 10)
		let buf = Buffer.from(data, 'base64')
		buf = await sharp(buf).resize(20, 20).toBuffer!
		p buf
		# p x.toString("base64")

main!
