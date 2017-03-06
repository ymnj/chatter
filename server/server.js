const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const generateMessage = require('./utils/message');
const {isRealString} = require('./utils/validation');


app.use(express.static(publicPath));

//lets you register a event listener
io.on('connection', (socket) => {

	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)){
			callback('Name and room name are required');
		}

		callback();
	})

	//Broadcast sends to everyone except the socket which just connected
	socket.broadcast.emit('newMsg', generateMessage('Admin', 'A new user has joined the chat!'))

	// Sends to just the socket which connected
	socket.emit('newMsg', generateMessage('Admin', 'Welcome to the chat room!'))

	socket.on('createMsg', (msg, callback) => {
		//io.emit sends to everyone
		io.emit('newMsg', generateMessage( msg.from, msg.message ));
		callback('This is from server');
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	})
})


server.listen(port, () => {
	console.log('Listening on port 3000');
});