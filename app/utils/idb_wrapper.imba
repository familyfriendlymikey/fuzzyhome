let p = console.log

class idb_wrapper

	constructor db_name, table_name, version
		db_name = db_name
		table_name = table_name
		version = version
		openRequest = null

	def open

		openRequest = global.indexedDB.open(db_name, version)

		openRequest.onupgradeneeded = do |event|
			p "Upgrading from DB version {event.oldVersion} to {event.newVersion}."
			let db = openRequest.result
			switch event.oldVersion

				when 0
					db.createObjectStore(table_name, { keyPath: 'id', autoIncrement: true })

		openRequest.onerror = do
			p "Open db error."

		openRequest.onsuccess = do
			p "Open db success."
			if global.navigator.storage and global.navigator.storage.persist
				global.navigator.storage.persist!.then! do |persistent|
					p "db is persistent: {persistent}"

	def reload
		let store

		while yes
			try
				store = #get_store "readonly"
				p "Get store success."
				break
			catch
				p "Failed to get store, retrying."
				await #sleep 10

		let request = store.getAll!

		return new Promise! do |resolve|

			request.onsuccess = do
				p "Load db success."
				resolve request.result
				imba.commit!

			request.onerror = do
				p "Load db error."
				resolve no

	def delete obj
		let store = #get_store!
		let request = store.delete(obj.id)

		return new Promise! do |resolve|

			request.onsuccess = do
				p "deleted link: {obj}"
				resolve no

			request.onerror = do
				p "Failed to delete link: {obj}"
				resolve yes

	def put obj
		let store = #get_store!
		let request = store.put(obj)

		return new Promise! do |resolve|

			request.onsuccess = do
				p "Successfully put link: {obj}"
				resolve request.result

			request.onerror = do
				p "Failed to put link: {obj}"
				resolve no

	def #get_store permission="readwrite"
		let db = openRequest.result
		let transaction = db.transaction(table_name, permission)
		transaction.objectStore(table_name)

	def #sleep ms
		new Promise! do |resolve|
			setTimeout resolve, ms

export default idb_wrapper
