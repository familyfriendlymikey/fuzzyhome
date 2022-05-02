export default def upload_json_file e
	return new Promise! do |resolve|
		let files = e.target.files
		resolve no if files.length < 1
		let file = files[0]
		let reader = new FileReader()
		reader.onloadend = do
			try
				resolve JSON.parse(reader.result)
			catch
				resolve no
		reader.onerror = do
			resolve no
		reader.readAsText(file)
