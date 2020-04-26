const expect = require('chai').expect
const fetch = require('../../api/commands/fetch.js')
const push = require('../../api/commands/push.js')
const mongo = require('../../driver/mongoDriver')

describe('FETCH', function(){

	const body = {
			payload: {
				foo: "bar",
				name: "kevin"
			}
		}

	beforeEach(function (done) {
		mongo.getDb()
		.then(async function (db) {
			return Promise.all([db, db.collection('testQueue').deleteMany({})])
		})
		.then(([db]) => {
			const req = {
				db: db,
				query: {
					queueName: "testQueue"
				},
				body: body
			}
			return push(req)
		})
		.then(function (res) {
			// console.log(users)
			done()
		})
		.catch(function (err) {
			console.log(err)
		})
	})


	it('should not accept query if queueName is missing', function(done){
		fetch({}).then(console.log)
		.catch((err) => {
			expect(err).to.not.be.empty
			done()
		})
	})


	it('should fetch a message from the queue', function(done){

		mongo.getDb()
		.then((db) => {
			const req = {
				db: db,
				query: {
					queueName: "testQueue",
					agentId: "TestAgent123"
				}
			}
			return fetch(req)
		})
		.then((res) => {
			// console.log(res)
			expect(res).to.have.property('processCount', 0)
			expect(res).to.have.property('createdAt')
			expect(res).to.have.property('_id')
			expect(res).to.have.property('payload')
			expect(res).to.have.property('expiryTime')
			done()
		})
		.catch((err) => {
			console.log(err)
		})
	})

	it('should return empty payload on no messages', function(done){

		mongo.getDb()
		.then((db) => {
			return Promise.all([db, db.collection('testQueue').deleteMany({})])
		})
		.then(([db]) => {
			const req = {
				db: db,
				query: {
					queueName: "testQueue",
					agentId: "TestAgent123"
				}
			}
			return fetch(req)
		})
		.then((res) => {
			expect(res).to.be.empty
			done()
		})
		.catch((err) => {
			console.log(err)
		})
	})
})