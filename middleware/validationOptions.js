var Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })

module.exports = function(schema){

	return function(req, res, next){
		var obj = req.body

		// Allow validation if the object is not empty //
		if(Object.entries(obj).length === 0 && obj.constructor === Object)
		{
			var err = { obj, error: 'Empty object passed!' }
			return res.status(400).json(err)
		}
		const isValid = ajv.validate(schema, obj)
		console.log(isValid ? obj : { obj, error: ajv.errors[0].message })
		if(isValid)
			next()
		else{
			var err = { obj, error: ajv.errors[0].message }
			return res.status(400).json(err)
		}
	}
}