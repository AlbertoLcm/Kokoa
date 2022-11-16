import io from 'socket.io-client';

let socket = io('//192.168.0.7:8080');

export default socket;