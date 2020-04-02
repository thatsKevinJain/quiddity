/**
	Fetch a message from the queue

	A message from to the queue will have the following properties - 
	-	data		(Object containing the message)
	-	createdAt	(Timestamp of the message)
	-	agentId		(UUID of the agent consuming the message)
	-	lockedAt	(Timestamp of the locked message)
	-	_id			(MongoDB ObjectId)
*/

const events = require('../services/events')
const assertQueryParams = require('../services/assertQueryParams')

// TODO figure out logic for expiring messages
const MESSAGE_EXPIRY_TIME = process.env.MESSAGE_EXPIRY_TIME || 50000

module.exports = async function(req){

	try{
		await assertQueryParams(req.query, ['queueName','agentId'])

		// Extract the body and query params //
		const queueName = req.query.queueName
		const agentId = req.query.agentId

		// Fetch queue messages based on query params //
		var where = (req && req.body && req.body.where) ? Object.assign({},{data:req.body.where}) : {}

		// Add constant query params //
		where = Object.assign(where, { lockedAt:{$exists:false} })

		// Fetch the message based on query params //
		const data = await req.db.collection(queueName).findOne(where)

		// Lock the message to maintain exclusivity //
		const lock = {
			agentId: agentId,
			lockedAt: new Date()
		}

		const response = await req.db.collection(queueName).updateOne({_id:data._id}, {$set:lock})

		if(response && response.result.ok === 1 && response.modifiedCount === 1)
			return data
		else
			throw { message: "MSG_FETCH_FAILED" }
	}
	catch(err){
		return { status: events.MSG_FETCH_FAILED, error: err }
	}
}