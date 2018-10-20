{
	document.getElementById('photo').addEventListener('change', event => {
		let files = [].slice.call(event.target.files)
		files.forEach(file => {
			let reader = new FileReader()
			reader.onload = event => {
				document.getElementById('photopreview').setAttribute('src', event.target.result)
			}
			reader.readAsDataURL(file)
			document.getElementById('date').value = new Date(file.lastModifiedDate).toISOString()
		})
	})
}
