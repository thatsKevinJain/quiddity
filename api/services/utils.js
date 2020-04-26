function isObject(value){
	return (value && (typeof value === 'object') && !Array.isArray(value))
}

function isArray(value){
	return (value && Array.isArray(value))
}

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
	},

	getQueryParams: function(where) {
		// Define an empty object //
		let result = {}

		// Extract keys from the object //
		let keys = where
		if(isObject(where))
			keys = Object.keys(where)

		keys.map(key => {

			// Append "payload" to every key to match the stored document format //
			let finalKey = `payload.${key}`

			/* 
				If the key contains special characters like "$" at index 0, pass them as is
				This is done to ensure that special MongoDB operators ($or, $and, etc.) work as expected
			*/
			const special = key.match(/\$/,"i")
			if(special && special.index == 0){
				finalKey = key
			}

			// If the operator's value is an object 
			if(isObject(where[key]))
				result[finalKey] = this.getQueryParams(where[key])

			// If keys value is an array
			else if(isArray(where[key])){

				let array = where[key].map((value, index) => {

					// If keys value is an object, recursively call the function again //
					if(isObject(where[key][index])){
						return this.getQueryParams(where[key][index])
					}
					else
						return where[key][index]
				})
				result[finalKey] = array
			}

			// If key has a simple value like string, int, etc
			else{
				result[finalKey] = where[key]
			}
		})
		return result
	}
}