import io from 'socket.io-client';

let socket = io('https://koko-server.fly.dev');
// let socket = io('http://localhost:8080');

export default socket;