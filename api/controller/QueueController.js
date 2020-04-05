const commands = require('../commands/index')
const assertQueryParams = require('../services/assertQueryParams')

module.exports = {

	/*
		Push the object into queue - 

		@POST /queue/add

		@param 		queueName 	(Name of the collection to insert data)
		@body 		data 		(Object containing message)
	*/
	add: async function(req, res) {

		const response = await commands.pushToQueue(req)
		return res.json(response)
	},



	/*
		Fetch a message from the queue - 

		@POST /queue/fetch

		@param 		queueName	(Name of the collection to insert data)
				  	agentId 	(UUID of agent)

		@response - data
	*/

	fetch: async function(req, res) {

		const response = await commands.fetchFromQueue(req)
		return res.json(response)
	},


	/*
		Remove the message from queue - 

		@GET /queue/delete

		@param 		queueName 	(Name of the collection to insert data)
					agentId		(UUID of agent)
					_id 		(_id of the message to be deleted)
	*/

	delete: async function(req, res) {

		try{
			// Extract the body and query params //
			await assertQueryParams(req.query, ['queueName','agentId','_id'])

			const queueName = req.query.queueName
			const agentId = req.query.agentId
			const _id = req.db.ObjectId(req.query._id)

			const data = await req.db.collection(queueName).deleteOne({_id:_id, agentId: agentId })
			
			return res.json(data)
		}
		catch(err){
			return res.status(400).json(err)
		}
	},


	/*
		push message again to queue - 

		@GET /queue/requeue

		@param 		queueName 	(Name of the collection to update data)
					_id 		(_id of the message to be push again)
	*/	

	requeue: async function(req, res) {
		try {
			// Extract the body and query params //
			await assertQueryParams(req.query, ['queueName', '_id'])

			const queueName = req.query.queueName
			const _id = req.db.ObjectId(req.query._id)	

			// requeue message only if processCount < threshold = 2.
			let message = await req.db.collection(queueName).findOne({ _id: _id })

			if (message && message.processCount && message.processCount < 2) {
				message = await req.db.collection(queueName).findOneAndUpdate({ _id: _id }, { $inc: { processCount: 1 }, $unset: { agentId: "", lockedAt: "" }})
			
			} else if (message && !message.processCount ) {
				message = await req.db.collection(queueName).findOneAndUpdate({ _id: _id }, { $set : {processCount: 1}, $unset: { agentId: "", lockedAt: "" }})
			}

			return res.json(message)

		} catch(err) {
			return res.status(400).json(err)	
		}
	},

}