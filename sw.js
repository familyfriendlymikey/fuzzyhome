
/*body*/
let p = console.log;

const app_prefix = "fuzzyhome_cache";
const version = "0.0.32";

const cache_name = ("" + app_prefix + "-" + version);

let urls = [
	'./',
	'./__assets__/all.css',
	'./__assets__/app/client.js',
	'./__assets__/app/client.css'
];

globalThis.addEventListener('fetch',function(e) {
	
	
	function intercept(request){
		
		if (request) {
			
			p(("" + cache_name + ` responding with cache : ` + (e.request.url)));
			return request;
		} else {
			
			p(("" + cache_name + ` not cached, fetching : ` + (e.request.url)));
			return this.fetch(e.request);
		};
	};
	
	return e.respondWith(caches.match(e.request.url).then(intercept));
});

globalThis.addEventListener('install',function(e) {
	
	p(("" + cache_name + ` install`));
	
	function add_urls_to_cache(cache){
		
		p(("" + cache_name + ` installing cache : ` + cache_name));
		cache.addAll(urls);
		return this.skipWaiting();// [TODO]: Export this and import to settings component and have manual update button
	};
	
	return e.waitUntil(caches.open(cache_name).then(add_urls_to_cache));
});


globalThis.addEventListener('activate',function(e) {
	
	p(("" + cache_name + ` activate`));
	
	function delete_cached(keys){
		var self = this;
		
		
		let temp = keys.map(function(key,i) {
			
			if (key !== cache_name) {
				
				p(("" + cache_name + ` deleting cache : ` + (keys[i])));
				return self.caches.delete(keys[i]);
			};
		});
		
		return Promise.all(temp);
	};
	
	return e.waitUntil(caches.keys().then(delete_cached));
});
