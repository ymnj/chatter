let expect = require('expect');
let moment = require('moment');
let generateMessage = require('./message');

describe('generateMessage', () => {

	it('should generate the correct message object', () => {

		let from = 'testUser';
		let testMessage = 'Test message';
		let message = generateMessage(from, testMessage);

		expect(message.createdAt).toBeA('number');
		expect(message.from).toBe(from);
		expect(message.message).toBe(testMessage);

	})
});