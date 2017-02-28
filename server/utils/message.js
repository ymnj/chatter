let moment = require('moment');

module.exports = generateMessage = (from, message) => {
	return {
		from,
		message,
		createdAt: moment(new Date()).format('h:mm a')
	}
};