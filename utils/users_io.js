const users = [];

const addUser = ({ id, username, room }) => {

	if (!username || !room) {
		return {
			error: "Username and room are required"
		};
	}

	const existingUser = users.find((user) => {
		return user.id === id && user.room === room;
	});

	// Validate username
	if (existingUser) {
		return {
			error: "Username is in use!"
		};
	}

	// store user
	const user = { id, username, room };
	users.push(user);
	return { user };
};

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

const getUser = (id) => {
	return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
	let usersInRoom = [];

	users.forEach((user) => {
		if (user.room === room.toLowerCase()) {
			usersInRoom.push(user);
		}
	});

	return usersInRoom;
};


module.exports = {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom
};
