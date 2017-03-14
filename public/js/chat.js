let socket = io();

new Vue({
	el: '#app',
	data: {
		userMessage: "",
		recievedMessages: [],
		usersList: null
	},
	methods: {
		submitMessage() {
			let params = jQuery.deparam(window.location.search);
			console.log(params.name);
			socket.emit('createMsg', {
				from: params.name,
				message: this.userMessage
			}, function(data) {
				// console.log('Got it', data);
			})
		},
		validateLogin() {
			if(!isRealString(params.name) || !isRealString(params.room)){
				return callback('Name and room name are required');
			}
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
			let params = jQuery.deparam(window.location.search);

			socket.emit('join', params, function(err){
				if (err){
					window.location.href = '/';
					alert(err);
				} else {
					console.log('no err');
				}
			});

			socket.on('updateUserList', function(usersList) {
				vm.usersList = usersList;
			})
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




