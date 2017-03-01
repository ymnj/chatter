let socket = io();

new Vue({
	el: '#app',
	data: {
		userMessage: "",
		recievedMessages: []
	},
	methods: {
		submitMessage() {
			socket.emit('createMsg', {
				from: 'Tom',
				message: this.userMessage
			}, function(data) {
				console.log('Got it', data);
			})
		}
	},
	mounted() {

		vm = this;

		socket.on('connect', function() {
			console.log('Connected to server');
		});

		socket.on('newMsg', function(msg){
			let dateFormat = moment(msg.createdAt).format('h:mm a');
			vm.recievedMessages.push({
				from: msg.from,
				message: msg.message,
				time: dateFormat
			});
			vm.userMessage = '';
		});
	}
});




