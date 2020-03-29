module.exports = {
	type: 'object',
	properties: {
		data: {
			type: "object",
			additionalProperties: true,
			minProperties: 1
		},
		createdAt: {
			type: "string",
			format: "date-time"
		},
		locked: {
			type: "boolean"
		},
		lockedAt: {
			type: "string",
			format: "date-time"
		},
		agentId: {
			type: "string"
		}
	},
	additionalProperties: false
}