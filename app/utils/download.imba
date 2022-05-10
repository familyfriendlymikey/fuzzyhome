def get_datetime_string
	let obj = new Date!.toString!.split(" ")
	let date = obj.slice(1, 4).join("-").toLowerCase!
	let time = obj[4].split(":").join("-")
	"{date}_{time}"

export default def download_json_file data, prefix=""
	let element = document.createElement 'a'
	element.setAttribute 'href', 'data:text/plain;charset=utf-8,' + window.encodeURIComponent(data)
	element.setAttribute 'download', "{prefix}{get_datetime_string!}.json"
	element.style.display = 'none'
	document.body.appendChild element
	element.click!
	document.body.removeChild element
