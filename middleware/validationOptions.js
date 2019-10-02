var Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })

module.exports = function(schema){

	return function(req, res, next){
		var obj = req.body

		const isValid = ajv.validate(schema, obj)
		console.log(isValid ? obj : { obj, error: ajv.errors[0].message })
		if(isValid)
			next()
		else{
			var err = { obj, error: ajv.errors[0].message }
			res.status(400).json(err)
		}
	}
}