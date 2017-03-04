const app = require('../../server');
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});

	socket.on('createMessage', () => {
		console.log('')
	})
});
