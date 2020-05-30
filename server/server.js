const http = require('./app');
const port = process.env.PORT || 3001;
const io = require('socket.io')(http);

const rooms = [];

io.on('connection', (socket) => {
    let userName = '';
    let joinedRoom = null;
    console.log('a user connected');

    socket.on('disconnect', () => {
        if(userName) {
            console.log(`user ${userName} disconnected`);
        } else {
            console.log('a user disconnected');
        }
    })
});

http.listen(port, () => console.log(`Server listening on port ${port}`));