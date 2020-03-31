/*
	Check if the required paramaters exist in query
*/

const ERR_MISSING_PARAM = 'Missing parameter '

module.exports = function(query, params) {

	return new Promise((resolve, reject) => {

		var missingParams = params.filter(param => !query[param])

		if(missingParams.length > 0)
			return reject({message: ERR_MISSING_PARAM + missingParams.toString()})

		resolve()
	})
}