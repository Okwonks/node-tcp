const net = require('net');
const logger = require('./logger');
const log = logger();

const server = net.createServer(socket => {
  socket.on('error', err => log.error(err.message));

  socket.on('data', async data => {
    const received = data.toString().trim();
    log.info('REQUEST RECEIVED:', received);
    socket.end(`thanks for saying ${received}.`);
  });
});

server.listen(8080, '0.0.0.0', () => log.info('Server listening on port 8080'));