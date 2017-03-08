let expect = require('expect');
let Users = require('./users');

describe('Users', () => {

	let users;

	beforeEach(() => {
		users = new Users();
		users.usersList = [
			{ id: 12, name: 'testUser', room: 'testRoom'},
			{ id: 22, name: 'testUser2', room: 'testRoom2'},
			{ id: 33, name: 'testUser3', room: 'testRoom'}
		]
	})

	it('should add user', () => {
		let users = new Users();

		users.addUser(1, 'testUser', 'testRoom');
		expect(users.usersList.length).toBe(1);
	})

	it('should remove user with id', () => {
		let user = users.removeUser(12);

		expect(users.usersList.length).toBe(2);
		expect(user).toBeA('object');
		expect(user).toInclude({ id: 12 });
	})

	it('should not remove a user with non valid id', () => {
		let user = users.removeUser(1);

		expect(user).toNotExist();
		expect(users.usersList.length).toBe(3);
	})


	it('should return an user with supplied id', () => {
		let user = users.getUser(12);
   
		expect(user).toBeA('object');
		expect(user).toInclude({ id: 12});
	})

	it('should not return an user with non valid id', () => {
		let user = users.getUser(1);

		expect(user).toNotExist();
	})

	it('should return all the users in a room', () => {
		let usersList = users.getUsersInRoom('testRoom');

		expect(usersList.length).toBe(2);
		expect(usersList).toBeA('array');
		expect(usersList).toEqual(['testUser', 'testUser3'])
	})

})