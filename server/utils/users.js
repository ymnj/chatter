

class Users {
	constructor() {
		this.usersList = []
	}

	addUser(id, name, room) {
		let user = {id, name, room}

		this.usersList.push(user);
		return user
	}

	removeUser(id) {
		let removedUser = null;

		this.usersList = this.usersList.filter((obj) => {
			if(obj.id === id){
				removedUser = obj; 
			}
			return obj.id !== id;
		});

		return removedUser;
	}

	getUser(id) {
		let user = this.usersList.find((obj) => {
			return obj.id === id;
		})
		return user;
	}

	getUsersInRoom(room) {
		let usersInRoom = this.usersList.filter((obj) => {
			return obj.room === room;
		});

		usersInRoom = usersInRoom.map((obj) => {
			return obj.name;
		})

		return usersInRoom;
	}

}

module.exports = Users;



//addUser 