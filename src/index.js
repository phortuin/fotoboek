{
	document.getElementById('photo').addEventListener('change', event => {
		let files = [].slice.call(event.target.files)
		files.forEach(file => {
			let date = new Date(file.lastModifiedDate).toISOString()
			document.getElementById('date').value = date.slice(0, -8) // remove seconds/milliseconds & timezone (:00.000Z) from ISO8601 date, see https://stackoverflow.com/a/28760255/554821 and https://stackoverflow.com/a/20114741/554821
		})
	})
}
