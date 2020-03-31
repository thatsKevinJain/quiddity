var assertQueryParams = require('../services/assertQueryParams')

module.exports = {

	/*
		Push the object into queue - 

		@POST /queue/add

		@PARAMS - queueName (Name of the collection to insert data)
		@BODY - data (Object containing message)
	*/
	add: async function(req, res) {

		try{

			await assertQueryParams(req.query, ['queueName'])

			// Extract the body and query params //
			const queueName = req.query.queueName
			const body = Object.assign({}, req.body)

			// Add metadata //
			body['createdAt'] = new Date()

			const data = await req.db.collection(queueName).insertOne(body)

			return res.json(data)
		}
		catch(err){
			return res.status(400).json(err)
		}
	},

	

	/*
		Fetch a message from the queue - 
		We will fetch one message from queue and set the agentId of the worker accessing the message
		and also lock the message to maintain exclusivity

		@GET /queue/fetch

		@PARAMS - queueName (Name of the collection to insert data)
				  agentId 	(UUID of agent)

		@RESPONSE - data
	*/

	fetch: async function(req, res) {

		try{
			await assertQueryParams(req.query, ['queueName','agentId'])

			// Extract the body and query params //
			const queueName = req.query.queueName
			const agentId = req.query.agentId

			var data = await req.db.collection(queueName).findOne({locked:{$in:[false,null]}})

			// Append the metadata to the object //
			var obj = {
				agentId: agentId,
				locked: true,
				lockedAt: new Date()
			}
			data = Object.assign(data, obj)

			await req.db.collection(queueName).updateOne({_id:data._id}, {$set:obj})
			
			return res.json(data)
		}
		catch(err){
			return res.status(400).json(err)
		}
	},


	/*
		Remove the message from queue - 

		@GET /queue/delete

		@PARAMS - queueName (Name of the collection to insert data)
				  agentId	(UUID of agent)
				  _id 		(_id of the message to be deleted)
	*/

	delete: async function(req, res) {

		try{
			// Extract the body and query params //
			await assertQueryParams(req.query, ['queueName','agentId','_id'])

			const queueName = req.query.queueName
			const agentId = req.query.agentId
			const _id = req.db.ObjectId(req.query._id)

			const data = await req.db.collection(queueName).removeOne({_id:_id})
			
			return res.json(data)
		}
		catch(err){
			return res.status(400).json(err)
		}
	}
}