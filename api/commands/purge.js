/**
	Purge the whole queue
	
	It matches the following properties -
	-	queueName 	(Name of the collection)
*/

const utils = require('../services/utils')

module.exports = async function(req){

	// Extract the body and query params //
	await utils.assertQueryParams(req.query, ['queueName'])

	// Extract the body and query params //
	const queueName = req.query.queueName

	// Delete the message //
	const response = await req.db.collection(queueName).deleteMany({})

	if(response && response.deletedCount >= 0)
		return { message: `Deleted ${response.deletedCount} messages` }
	else
		throw { message: "Failed to delete message" }
}