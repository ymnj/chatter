module.exports = generateMessage = (from, message) => {
	return {
		from,
		message,
		createdAt: new Date().getTime()
	}
};