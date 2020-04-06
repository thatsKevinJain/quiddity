/**
	Fetch a message from the queue

	A message from to the queue will have the following properties - 
	-	payload			(Object containing the message)
	-	createdAt		(Timestamp of the message)
	-	agentId			(UUID of the agent consuming the message)
	-	expiryTime		(Time when the message will expire)
	-	processCount	(Number of times the message is processed)
	-	_id				(MongoDB ObjectId)
*/

const utils = require('../services/utils')

const MESSAGE_EXPIRY_TIME = process.env.MESSAGE_EXPIRY_TIME || 300000
const MAX_PROCESS_COUNT = process.env.MAX_PROCESS_COUNT || 5

module.exports = async function(req){

	await utils.assertQueryParams(req.query, ['queueName','agentId'])

	// Extract the body and query params //
	const queueName = req.query.queueName
	const agentId = req.query.agentId

	// Fetch queue messages based on query params //
	var where = (req && req.body && req.body.where) ? Object.assign({},{payload:req.body.where}) : {}

	/*
		Fetch messages that satisfy below criteria -
		-	processCount <= MAX_PROCESS_COUNT
		-	[(expiryTime == null) || (expiryTime > NOW)]
			Basically don't fetch expired messages
	*/
	where = Object.assign(where, {
		processCount:{$lt: MAX_PROCESS_COUNT},
		$or:[
			{expiryTime:{$exists:false}},
			{expiryTime:{$gte: new Date()}}
		]
	})

	// Lock the message to maintain exclusivity //
	const lock = {
		agentId: agentId,
		expiryTime: utils.expiryTime(MESSAGE_EXPIRY_TIME)
	}

	// Fetch the message based on query params //
	const response = await req.db.collection(queueName).findOneAndUpdate(where, {$set:lock, $inc:{processCount:1}})

	if(response && response.ok === 1 && response.lastErrorObject.updatedExisting)
		return response.value

	// The queue is empty //
	else if(response && response.value == null)
		return {}

	else
		throw { message: "Failed to fetch message" }
}