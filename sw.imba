let p = console.log

const app_prefix = "fuzzyhome_cache"
const version = "0.0.16"

const cache_name = "{app_prefix}-{version}"

let urls = [
	'./',
	'./__assets__/all.css'
	'./__assets__/app/client.js'
	'./__assets__/app/client.css'
]

self.addEventListener('fetch', &) do |e|

	def intercept request
		if request
			p `{cache_name} responding with cache : {e.request.url}`
			request
		else
			p `{cache_name} not cached, fetching : {e.request.url}`
			fetch e.request

	e.respondWith(caches.match(e.request.url).then(intercept))

self.addEventListener('install', &) do |e|
	p `{cache_name} install`

	def add_urls_to_cache cache
		p `{cache_name} installing cache : {cache_name}`
		cache.addAll urls
		skipWaiting! # [TODO]: Export this and import to settings component and have manual update button

	e.waitUntil(caches.open(cache_name).then(add_urls_to_cache))


self.addEventListener('activate', &) do |e|
	p `{cache_name} activate`

	def delete_cached keys

		let temp = keys.map(&) do |key, i|
			if key !== cache_name
				p `{cache_name} deleting cache : {keys[i]}`
				caches.delete keys[i]

		Promise.all(temp)

	e.waitUntil(caches.keys().then(delete_cached))
