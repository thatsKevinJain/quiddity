const expect = require('chai').expect
const fetch = require('../../api/commands/fetch.js')
const push = require('../../api/commands/push.js')
const deleteMessage = require('../../api/commands/delete.js')
const mongo = require('../../driver/mongoDriver')

describe('DELETE', function(){

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
		deleteMessage({}).then(console.log)
		.catch((err) => {
			expect(err).to.not.be.empty
			done()
		})
	})


	it('should delete a message from the queue', function(done){

		mongo.getDb()
		.then((db) => {
			const req = {
				db: db,
				query: {
					queueName: "testQueue",
					agentId: "TestAgent123"
				}
			}
			return Promise.all([db, fetch(req)])
		})
		.then(([db, res]) => {
			// console.log(res)
			expect(res).to.have.property('processCount', 0)
			expect(res).to.have.property('createdAt')
			expect(res).to.have.property('_id')
			expect(res).to.have.property('payload')
			
			const req = {
				db: db,
				query: {
					queueName: "testQueue",
					agentId: "TestAgent123",
					_id: res._id
				}
			}
			return deleteMessage(req)
		})
		.then((res) => {
			expect(res).to.be.empty
			done()
		})
		.catch((err) => {
			console.log(err)
		})
	})

	it('should throw an error on zero messages', function(done){

		mongo.getDb()
		.then((db) => {
			return Promise.all([db, db.collection('testQueue').deleteMany({})])
		})
		.then(([db]) => {
			const req = {
				db: db,
				query: {
					queueName: "testQueue",
					agentId: "TestAgent123",
					_id: "5ea2c3f19223879a24042ff9"
				}
			}
			return deleteMessage(req)
		})
		.then((res) => {
			console.log(res)
		})
		.catch((err) => {
			expect(err).to.not.be.empty
			done()
		})
	})
})