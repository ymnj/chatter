let expect = require('expect');

let generateMessage = require('./message');

describe('generateMessage', () => {

	it('should generate the correct message object', () => {

		let from = 'testUser';
		let text = 'Test message';
		let message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message.from).toBe(from);
		expect(message.text).toBe(text);

	})
});