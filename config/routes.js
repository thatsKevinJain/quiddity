module.exports = {

	/*
		Model name and its allowed API actions methods are added here
	*/

	Queue: {
		fetch: ['post'],
		delete: ['get'],
		add: ['post'],
		requeue: ['get']
	}
}