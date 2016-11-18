require('dotenv').load();
const http = require('http');
const app = require('./lib/app');
const port = process.env.PORT || 3000;
require('./lib/setup-mongoose');

const server = http.createServer(app);

server.listen(port, err => {
  if (err) {
    console.error('Error starting the server: ', err);
  } else {
    console.log('Server listening on port ', port);
  }
});
