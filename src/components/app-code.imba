import {compile} from 'imba/compiler'

tag app-code

	code = '10 + 20'

	def exec

		# should platform be worker?
		let o =
			platform: 'browser'
			sourcePath:'tmp.imba'

		let js = String compile(code,o)
		let res = await document.getElementById('sandbox').contentWindow.postMessage(js,'*')
		L res

	<self>
		<textarea bind=code>
		<button @click=exec> 'exec'
