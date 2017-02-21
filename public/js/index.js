
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
			vm.recievedMessages.push(`${msg.from} - ${msg.message}`);
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



