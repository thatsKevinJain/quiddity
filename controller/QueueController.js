module.exports = {

	fetchMessage: function(req, res){

		req.db.collection('test').find({}).toArray()
		.then((data) => {
			res.json(data)
		})
		.catch(console.log)
	},

	deleteMessage: function(req, res){

		req.db.collection('test').removeOne({})
		.then((data) => {
			res.json(data)
		})
		.catch(console.log)
	},

	addMessage: function(req, res){
		
		req.db.collection('test').insertOne({mobile:req.query.mobile})
		.then((data) => {
			res.json(data)
		})
		.catch(console.log)
	}
}