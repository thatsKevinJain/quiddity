/**
	Push a message into the queue

	A message added to the queue will have the following properties - 
	-	data		(Object containing the message)
	-	createdAt	(Timestamp of the message)
*/

const assertQueryParams = require('../services/assertQueryParams')
const ERR_FAILED_TO_PUSH = "Failed to push message"

module.exports = async function(req){

	await assertQueryParams(req.query, ['queueName'])

	// Extract the query params //
	const queueName = req.query.queueName

	// Create a message object //
	const body = Object.assign({}, req.body, {createdAt: new Date()})

	// Push to queue //
	const response = await req.db.collection(queueName).insertOne(body)

	if(response && response.result.ok === 1 && response.insertedCount === 1)
		return {}
	else
		throw { message: ERR_FAILED_TO_PUSH }
}