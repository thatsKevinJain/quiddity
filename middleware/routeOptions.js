var routes = require('../config/routes')

module.exports = function(app){

	// Fetch Model names //
	for(var model in routes){

		// Fetch Controller Actions for each model //
		for(var action in routes[model]){

			var route = `/${model.toLowerCase()}/${action}`
			var actionCall = require('../api/controller/'+model+"Controller")[action]
			var allowedMethods = routes[model][action]

			// Add dynamic routes //
			allowedMethods.forEach(allowedMethod => {
				app[allowedMethod](route, actionCall)
			})
		}
	}
}