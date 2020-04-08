/**
	Delete a message from the queue on completion
	
	It matches the following properties -
	-	_id			(ObjectId of the message)
	-	agentId		(UUID of the agent)
	-	queueName 	(Name of the collection)
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
	const response = await req.db.collection(queueName).deleteOne({_id:_id, agentId: agentId })
	
	if(response && response.deletedCount === 1)
		return {}

	else
		throw { message: "Failed to delete message" }
}