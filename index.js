const net = require('net');
const logger = require('./logger');
const log = logger();

let clients = [];

const server = net.createServer();

const broadcast = (message, sender) => {
  clients.forEach((client) => {
    if(client !== sender) {
      client.write(message);
    }
  });
}

server.on('connection', socket => {
  log.info('Server connected...');
  clients.push(socket);

  socket.setEncoding('utf8');

  socket.on('error', err => log.error(err.message));

  socket.on('data', async data => {
    const received = data.toString().trim();
    broadcast(`${socket.remoteAddress}:${socket.remotePort} > ${received}\n`, socket);

    log.info(`Data received from client ${socket.remoteAddress}:${socket.remotePort}:`, received);
  });

  socket.on('end', () => clients.splice(clients.indexOf(socket), 1));
});

server.listen(8080, '0.0.0.0', () => log.info('Server listening on port 8080'));
