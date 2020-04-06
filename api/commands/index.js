/*
	Get all the avaible DB Commands
*/

var normalizedPath = require("path").join(__dirname, "/")

const commands = {}

require("fs")
.readdirSync(normalizedPath)
.forEach(function(file) {

	// Remove the .js extension from filename //
	const command = file.split(".js").join("").trim().toString()

	// Require the file and append to commands //
	commands[command] = require("./" + file)
})

module.exports = commands