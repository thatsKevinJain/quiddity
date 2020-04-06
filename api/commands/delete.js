/**
	Delete a message from the queue on completion

	A message from to the queue will have the following properties - 
	-	data			(Object containing the message)
	-	createdAt		(Timestamp of the message)
	-	agentId			(UUID of the agent consuming the message)
	-	expiryTime		(Time when the message will expire)
	-	processCount	(Number of times the message is processed)
	-	_id				(MongoDB ObjectId)
*/

const utils = require('../services/utils')

module.exports = async function(req){

	// Extract the body and query params //
	await utils.assertQueryParams(req.query, ['queueName','agentId','_id'])

	// Extract the body and query params //
	const queueName = req.query.queueName
	const agentId = req.query.agentId
	const _id = req.db.ObjectId(req.query._id)

	// Delete the message //
	const data = await req.db.collection(queueName).deleteOne({_id:_id, agentId: agentId })
	console.log(data)
	
	return data

	// if(response && response.ok === 1 && response.lastErrorObject.updatedExisting)
	// 	return response.value

	// else
	// 	throw { message: "Failed to delete message" }
}