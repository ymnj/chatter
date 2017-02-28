
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
				message: this.userMessage,
				createdAt: new Date()
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
			vm.recievedMessages.push(`${msg.from} - ${msg.message} - ${msg.createdAt}`);
			vm.userMessage = '';
		});
	}
});

// socket.on('connect', function() {
// 	console.log('Connected to server');
// });

// socket.on('disconnect', function() {
// 	console.log('Disconnected from server');
// });

// socket.on('newMsg', function(msg){
// 	// this.recievedMessages.push(`${msg.from} - ${msg.message}`)
// 	//console.log(this.recievedMessages);
// });



