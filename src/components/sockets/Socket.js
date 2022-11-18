import io from 'socket.io-client';

let socket = io('https://koko-server.fly.dev');

export default socket;