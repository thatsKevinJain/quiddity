/**
	Push a message into the queue

	A message added to the queue will have the following properties - 
	-	payload			(Object containing the message)
	-	createdAt		(Timestamp of the message)
	-	processCount	(Number of times the message is processed)
*/

const utils = require('../services/utils')

module.exports = async function(req){

	await utils.assertQueryParams(req.query, ['queueName'])

	// Extract the query params //
	const queueName = req.query.queueName

	// Create a message object //
	const body = Object.assign({}, req.body, {createdAt: new Date(), processCount: 0})

	// Push to queue //
	const response = await req.db.collection(queueName).insertOne(body)

	if(response && response.insertedCount === 1)
		return {}
	else
		throw { message: "Failed to push message" }
}