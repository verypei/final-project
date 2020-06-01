const http = require('./app');
const port = process.env.PORT || 3001;
const io = require('socket.io')(http);

const roomConfiguration = {
    maxUser: 4,
    minUser: 2
};

const roundConfiguration = {
    timeLimit: 5 * 60,
    timeLimitPerUser: 30
};

const rooms = [];

io.on('connection', (socket) => {
    socket.userName = '';
    socket.joinedRoom = null;
    console.log('a user connected');

    socket.on('disconnect', () => {
        if(socket.userName) {
            console.log(`user ${socket.userName} disconnected`);
        } else {
            console.log('a user disconnected');
        }
        leaveRoom(socket);
    });

    socket.on('set name', (newName) => {
        if(!newName) {
            socket.emit('set name', {
                success: false,
                message: 'name must be filled'
            });
        } else {
            socket.userName = newName;
            socket.emit('set name', {
                success: true,
                userName: socket.userName,
                message: 'set name success'
            });
            if(socket.joinedRoom) {
                let thisUserInRoom = socket.joinedRoom.users.find(user => user.id === socket.id);
                thisUserInRoom.name = socket.userName;
                io.to(`room-${socket.joinedRoom.id}`).emit('update room data', socket.joinedRoom);
            }
        }
    });

    socket.on('get rooms', () => {
        socket.emit('get rooms', getRoomsData());
    });

    socket.on('create room', (name, theme) => {
        let result = {
            success: false,
            message: ''
        };
        let createdRoom = null;
        if(socket.joinedRoom) {            
            result.message = 'you have already joined a room, please leave the room first';
        } else if(!name) {
            result.message = 'room name must be filled';
        } else if (!theme) {
            result.message = 'theme must be selected';
        } else {
            createdRoom = createRoom(name, theme, socket.id);
            result.success = true;
            result.message = 'created room successfully';
        }
        socket.emit('create room', result);
        if(result.success) {
            io.emit('get rooms', getRoomsData());
            joinRoom(socket, createdRoom);
        }
    });

    socket.on('join room', (roomId) => {
        let roomToJoin = getRoomById(roomId);
        if(!roomToJoin) {
            socket.emit('join room', {
                success: false,
                message: "room doesn't exist"
            });
        } else {
            joinRoom(socket, roomToJoin);
        }
    });

    socket.on('leave room', () => {
        leaveRoom(socket);
    })
});

function createRoom(roomName, roomTheme, roomMasterId) {
    let roomData = {
        id: getLastRoomId() + 1,
        name: roomName,
        theme: roomTheme,
        status: 'waiting',
        minUser: roomConfiguration.minUser,
        maxUser: roomConfiguration.maxUser,
        timeLimit: roundConfiguration.timeLimit,
        timeLimitPerUser: roundConfiguration.timeLimitPerUser,
        roomMasterId,
        users: []
    };
    rooms.push(roomData);
    return roomData;
}

function joinRoom(socket, room) {
    if(socket.joinedRoom) {
        socket.emit('join room', {
            success: false,
            message: 'you have already joined a room, please leave the room first'
        });
    } else if(room.players >= roomConfiguration.maxUser) {
        socket.emit('join room', {
            success: false,
            message: 'room is full'
        });
    } else {
        socket.joinedRoom = room;
        socket.join(`room-${socket.joinedRoom.id}`);
        socket.emit('join room', {
            success: true,
            message: 'join room success'
        });
        room.users.push({
            id: socket.id,
            name: socket.userName
        })
        io.to(`room-${socket.joinedRoom.id}`).emit('update room data', socket.joinedRoom);
        io.emit('get rooms', getRoomsData());
    }
}

function leaveRoom(socket) {
    if(!socket.joinedRoom) {
        socket.emit('leave room', {
            success: false,
            message: "you haven't joined a room"
        });
    } else {
        socket.leave(`room-${socket.joinedRoom.id}`);

        let joinedRoom = socket.joinedRoom;
        socket.joinedRoom = null;
        joinedRoom.users = joinedRoom.users.filter(user => user.id !== socket.id);
        console.log('roomid'+ joinedRoom.id);
        checkRoomEmpty(joinedRoom);
        updateRoomMaster(joinedRoom);
        io.to(`room-${joinedRoom.id}`).emit('update room data', joinedRoom);
        socket.emit('leave room', {
            success: true,
            message: 'leave room success'
        });
        io.emit('get rooms', getRoomsData());
    }
}

function getRoomById(roomId) {
    return rooms.find(room => room.id === roomId);
}

function updateRoomMaster(room) {
    console.log(room);
    if(room.users.length) {
        if(!room.users.some(user => user.id === room.roomMasterId)) {
            room.roomMasterId = room.users[0].id;
        }
    }
}

// function userAlreadyInRoom(socket, room) {
//     return room.users.some(roomUser => socket.id === roomUser.id);
// }

function checkRoomEmpty(room) {
    if(!room.users.length) {
        deleteRoom(room);
    }
}

function deleteRoom(roomToDelete) {
    rooms.splice(rooms.findIndex(room => roomToDelete.id === room.id), 1);
    io.emit('delete room', {
        id: roomToDelete.id,
        name: roomToDelete.name
    });
    io.emit('get rooms', getRoomsData());
}

function getLastRoomId() {
    if(rooms.length) {
        return rooms[rooms.length - 1].id;
    } else {
        return 1;
    }
}

function getRoomsData() {
    return rooms.map(room => {
        const {
            id,
            name,
            status,
            minUser,
            maxUser,
            timeLimit,
            timeLimitPerUser,
            roomMasterId,
            users
        } = room;
        return {
            id,
            name,
            status,
            minUser,
            maxUser,
            timeLimit,
            timeLimitPerUser,
            roomMasterId,
            usersCount: users.length
        }
    });
}

http.listen(port, () => console.log(`Server listening on port ${port}`));