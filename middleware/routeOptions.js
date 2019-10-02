var routes = require('../config/routes')

module.exports = function(app){

	// Fetch Model names //
	for(var model in routes){

		// Fetch Controller Actions for each model //
		for(var action in routes[model]){

			var route = `/${model.toLowerCase()}/${action}`
			var validation = require('./validationOptions')(require(`../api/models/${model}`))
			var actionCall = require('../api/controller/'+model+"Controller")[action]

			// Add a dynamic route //
			app.all(route, validation, actionCall)
		}
	}
}