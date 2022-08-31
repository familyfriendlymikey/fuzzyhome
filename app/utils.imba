export def parse_url url
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

def get_pretty_date
	Date!.toString!.split(" ").slice(0, 4).join(" ")
