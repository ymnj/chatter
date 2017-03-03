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
			let selector = document.querySelector('.chat-messages-wrap'),
					scrollTop    = selector.scrollTop,
					scrollHeight = selector.scrollHeight,
					offsetHeight = selector.offsetHeight;

			setTimeout(() => {
				let latestMsgHeight = selector.lastChild.offsetHeight;
				if(selector.children.length > 1){
					let secondLastMsgHeight = selector.lastChild.previousSibling.offsetHeight;

					if( offsetHeight + scrollTop + latestMsgHeight + secondLastMsgHeight >= scrollHeight ){
						selector.scrollTop = scrollHeight;
					}
				}
			}, 0)
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




