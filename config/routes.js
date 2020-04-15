module.exports = {

	/*
		Model name and its allowed API actions methods are added here
	*/

	Queue: {
		delete: ['get'],
		purge: ['get'],
		fetchDead: ['get'],
		
		add: ['post'],
		fetch: ['post']
	}
}