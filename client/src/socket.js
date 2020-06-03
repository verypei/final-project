import socketIOClient from 'socket.io-client';
// const socketIOEndpoint = 'http://127.0.0.1:3001';
const socketIOEndpoint = "https://stoury-hacktiv8.herokuapp.com/";

const socket = socketIOClient(socketIOEndpoint);

export default socket;