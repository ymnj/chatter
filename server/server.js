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
const Users = require('./utils/users');
const users = new Users();


app.use(express.static(publicPath));

//lets you register a event listener
io.on('connection', (socket) => {

	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Name and room name are required');
		}

		//User successfuly joined a room
		let room = params.room.toLowerCase();
		let name = params.name;
		
		socket.join(room);
		users.removeUser(socket.id);
		users.addUser(socket.id, name, room);

		io.to(room).emit('updateUserList', users.getUsersInRoom(room));
		//Sends to just the socket which connected
		socket.emit('newMsg', generateMessage('Admin', `Welcome to the ${room} room!`))

		//Broadcast sends to everyone except the socket which just connected
		socket.broadcast.to(room).emit('newMsg', generateMessage('Admin', `${params.name} has joined the room`))

		callback();
	})


	socket.on('createMsg', (msg, callback) => {
		//io.emit sends to everyone
		io.emit('newMsg', generateMessage( msg.from, msg.message ));
		callback('This is from server');
	});

	socket.on('disconnect', () => {
		let user = users.removeUser(socket.id);

		if(user){
			io.to(user.room).emit('updateUserList', users.getUsersInRoom(user.room));
			io.to(user.room).emit('newMsg', generateMessage('Admin', `${user.name} has left the room`))
		}

		console.log('User disconnected');
	})
})


server.listen(port, () => {
	console.log('Listening on port 3000');
});

















