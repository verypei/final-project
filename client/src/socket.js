import socketIOClient from 'socket.io-client';
const socketIOEndpoint = 'http://127.0.0.1:3001';

const socket = socketIOClient(socketIOEndpoint);

export default socket;