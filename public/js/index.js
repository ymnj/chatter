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
				// console.log('Got it', data);
			})
		},
		scrollToBottom() {
			let selector = document.querySelector('.chat-messages-wrap');
			if(selector.scrollTop === (selector.scrollHeight - selector.offsetHeight)){
				selector.scrollTop = selector.scrollHeight;
			}
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
			vm.scrollToBottom();
		});
	}
});




