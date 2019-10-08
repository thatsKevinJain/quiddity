var figlet = require('figlet')
module.exports = figlet('Quiddity', function(err, data) {
	if (err) {
		console.log('Something went wrong...')
		console.dir(err)
		return
	}
	console.log("=========================================")
	console.log(data)
	console.log("=========================================")
})