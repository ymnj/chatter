let socket = io();

socket.on('connect', function() {
	console.log('Connected to server');

	socket.emit('createMsg', {
		from: 'Tom',
		text: 'Hey there'
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('newMsg', function(msg){
	console.log('new msg', msg);
});
