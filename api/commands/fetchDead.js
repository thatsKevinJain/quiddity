/**
	Fetch all messages in dead letter queue

	Every message that is not acknowledged by the worker/agent ends up in dead letter queue.
	
	The messages here will never be added to queue again,
	the user can analyse them to understand why the messages were not acknowledged.

	Examples - Heavy processing time, failed API calls, message expiry
	can be the reasons a message is pushed here.
	
	It matches the following properties -
	-	queueName 	(Name of the collection)
*/

const utils = require('../services/utils')

const MAX_PROCESS_COUNT = parseInt(process.env.MAX_PROCESS_COUNT) || 2

module.exports = async function(req){

	// Extract the body and query params //
	await utils.assertQueryParams(req.query ? req.query : {}, ['queueName'])

	// Extract the body and query params //
	const queueName = req.query.queueName

	/*
		Fetch messages that satisfy below criteria -
		-	processCount > MAX_PROCESS_COUNT
		
		We will fetch those messages that have been processed max times
	*/
	const where = Object.assign({}, {processCount:{$gte: MAX_PROCESS_COUNT}})

	const response = await req.db.collection(queueName).find(where).toArray()

	if(response)
		return response

	else
		throw { message: "Failed to fetch message" }
}