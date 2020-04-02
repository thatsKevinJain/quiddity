/**
	Push a message into the queue

	A message added to the queue will have the following properties - 
	-	data		(Object containing the message)
	-	createdAt	(Timestamp of the message)
*/

const events = require('../services/events')
const assertQueryParams = require('../services/assertQueryParams')

module.exports = async function(req){

	try{
		await assertQueryParams(req.query, ['queueName'])

		// Extract the query params //
		const queueName = req.query.queueName

		// Create a message object //
		const body = Object.assign({}, req.body, {createdAt: new Date()})

		// Push to queue //
		const response = await req.db.collection(queueName).insertOne(body)

		if(response && response.result.ok === 1 && response.insertedCount === 1)
			return { status: events.MSG_PUSHED }
		else
			throw {}
	}
	catch(err){
		return { status: events.MSG_FAILED_TO_PUSH, error: err }
	}
}