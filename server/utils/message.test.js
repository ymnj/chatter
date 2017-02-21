let expect = require('expect');

let generateMessage = require('./message');

describe('generateMessage', () => {

	it('should generate the correct message object', () => {

		let from = 'testUser';
		let message = 'Test message';
		let message = generateMessage(from, message);

		expect(message.createdAt).toBeA('number');
		expect(message.from).toBe(from);
		expect(message.message).toBe(message);

	})
});