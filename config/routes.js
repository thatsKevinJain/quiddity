module.exports = {

	/*
		Model name and its allowed API actions methods are added here
	*/

	Queue: {
		fetch: ['get'],
		delete: ['put'],
		add: ['post']
	}
}