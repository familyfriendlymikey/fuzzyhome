const app_name = "fuzzyhome"
import { version } from '../package.json'
const app_prefix = "{app_name}_cache"
const cache_name = "sw-{app_prefix}-{version}"
let p = do |s| console.log "{cache_name} {s}"
p "loaded"

let urls = [
	'./'
]

self.addEventListener('fetch') do |e|
	p "fetch"
	def intercept request
		if request
			p "responding with cache {e.request.url}"
			request
		else
			p "not cached, fetching {e.request.url}"
			fetch e.request
	e.respondWith(caches.match(e.request.url).then(intercept))

self.addEventListener('install') do |e|
	p "install"
	def add_urls_to_cache cache
		p "adding urls to cache"
		cache.addAll urls
		skipWaiting!
	e.waitUntil(caches.open(cache_name).then(add_urls_to_cache))

self.addEventListener('activate') do |e|
	p "activate"
	def delete_cached keys
		let temp = keys.map! do |key, i|
			p "checking cache {key}"
			if key !== cache_name
				p "deleting cache {key}"
				let result = await caches.delete key
				p "deletion of {key} result: {result}"
		Promise.all(temp)
	e.waitUntil(caches.keys().then(delete_cached))
