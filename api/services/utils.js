module.exports = {
	
	// Get expiry time - NOW + millis
	getExpiryTime: function(millis){
		return new Date(new Date().getTime() + millis)
	},

	// Check if the required paramaters exist in query
	assertQueryParams: function(query, params) {

		return new Promise((resolve, reject) => {

			var missingParams = params.filter(param => !query[param])

			if(missingParams.length > 0)
				return reject({message: 'Missing parameter ' + missingParams.toString()})

			resolve()
		})
	}
}