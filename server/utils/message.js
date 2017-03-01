let moment = require('moment');

module.exports = generateMessage = (from, message) => {
	return {
		from,
		message,
		createdAt: moment().valueOf()
	}
};