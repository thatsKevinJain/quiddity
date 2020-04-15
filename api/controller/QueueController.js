const commands = require('../commands/index')

module.exports = {

	/*
		Push the object into queue - 

		@POST /queue/add

		@param 		queueName 	(Name of the collection to insert payload)
		@body 		payload 		(Object containing message)
	*/
	add: async function(req, res) {
		try{
			const response = await commands.push(req)
			return res.json(response)
		}
		catch(err){
			return res.status(400).json(err)
		}
	},



	/*
		Fetch a message from the queue - 

		@POST /queue/fetch

		@param 		queueName	(Name of the collection to insert payload)
				  	agentId 	(UUID of agent)

		@response - payload
	*/

	fetch: async function(req, res) {
		try{
			const response = await commands.fetch(req)
			return res.json(response)
		}
		catch(err){
			console.log(err)
			return res.status(400).json(err)
		}
	},


	/*
		Remove the message from queue - 

		@GET /queue/delete

		@param 		queueName 	(Name of the collection to insert payload)
					agentId		(UUID of agent)
					_id 		(_id of the message to be deleted)
	*/

	delete: async function(req, res) {
		try{
			const response = await commands.delete(req)
			return res.json(response)
		}
		catch(err){
			return res.status(400).json(err)
		}
	},

	/*
		Delete all messages from queue - 

		@GET /queue/purge

		@param	queueName	(Name of the collection to insert payload)
	*/

	purge: async function(req, res) {
		try{
			const response = await commands.purge(req)
			return res.json(response)
		}
		catch(err){
			return res.status(400).json(err)
		}
	}
}