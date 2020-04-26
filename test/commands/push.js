const expect = require('chai').expect
const push = require('../../api/commands/push.js')
const mongo = require('../../driver/mongoDriver')

describe('PUSH', function(){

	beforeEach(function (done) {
		mongo.getDb()
		.then(function (db) {
			return db.collection('testQueue').deleteMany({})
		})
		.then(function (users) {
			// console.log(users)
			done()
		})
		.catch(function (err) {
			console.log(err)
		})
	})


	it('should not accept query if queueName is missing', function(done){

		push({}).then(console.log)
		.catch((err) => {
			expect(err).to.not.be.empty
			done()
		})
	})


	it('should push a message in the queue', function(done){

		const body = { foo: "bar", name: "kevin" }

		mongo.getDb()
		.then((db) => {
			const req = {
				db: db,
				query: {
					queueName: "testQueue"
				},
				body: body
			}

			return push(req)
		})
		.then((res) => {
			// console.log(res)
			expect(res).to.have.length(1)
			expect(res[0]).to.have.property('processCount', 0)
			expect(res[0]).to.have.property('expiryTime')
			expect(res[0]).to.have.property('createdAt')
			expect(res[0]).to.have.property('payload', body)
			done()
		})
		.catch((err) => {
			console.log(err)
		})
	})

	it('should not accept an empty payload', function(done){

		mongo.getDb()
		.then((db) => {
			const req = {
				db: db,
				query: {
					queueName: "testQueue"
				}
			}

			return push(req)
		})
		.then(console.log)
		.catch((err) => {
			// console.log(err)
			expect(err).to.not.be.empty
			done()
		})
	})
})