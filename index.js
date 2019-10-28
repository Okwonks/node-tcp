#!/usr/bin/env node

const net = require('net');

const server = net.createServer(socket => {
  socket.on('error', err => console.error(err.message));

  socket.on('data', async data => {
    const received = data.toString().trim();
    console.info('REQUEST RECEIVED:', received);
    socket.end(`thanks for saying ${received}.`);
  });
});

server.listen(8080, '0.0.0.0', () => console.log('Server listening on port 8080'));