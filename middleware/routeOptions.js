var routes = require('../config/routes')

module.exports = function(app){

	// Fetch Model names //
	for(var model in routes){

		// Fetch Controller Actions for each model //
		for(var action in routes[model]){

			// Add a dynamic route //
			app.get(`/${model.toLowerCase()}/${action}`, require('../controller/'+model+"Controller")[action])
		}
	}
}