const expect = require('expect');
const {isRealString} = require('./validation');


describe('isRealString', () => {

	it('should reject non-string values', () => {
		let response = isRealString(12);
		expect(response).toBe(false);
	})

	it('should reject string with only spaces', () => {
		let response = isRealString('         ');
		expect(response).toBe(false);
	})

	it('should allow string with non-space characters', () => {
		let response = isRealString('TestStr');
		expect(response).toBe(true);
	})

});