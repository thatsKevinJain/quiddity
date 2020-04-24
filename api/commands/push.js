/**
	Push a message into the queue

	A message added to the queue will have the following properties - 
	-	payload			(Object containing the message)
	-	createdAt		(Timestamp of the message)
	-	processCount	(Number of times the message is processed)
*/

const utils = require('../services/utils')

module.exports = async function(req){

	await utils.assertQueryParams(req.query ? req.query : {}, ['queueName'])

	// Extract the query params //
	const queueName = req.query.queueName

	// Create a payload //
	if(req && req.body && req.body.payload && Object.keys(req.body.payload).length != 0)
		var body = Object.assign({}, req.body, {createdAt: new Date(), processCount: 0})
	else
		throw { message: "Empty payload cannot be added" }

	// Push to queue //
	const response = await req.db.collection(queueName).insertOne(body)

	if(response && response.insertedCount === 1)
		return response.ops
	else
		throw { message: "Failed to push message" }
}