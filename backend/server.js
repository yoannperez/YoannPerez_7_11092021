//                                         -------------------------------------------------------
//                                         --                  SERVER FILE                      --
//                                         -------------------------------------------------------

const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');
require('dotenv').config()

////////// Version HTTP /////////////////
// Normalisation port
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//Déclaration du port
const port = normalizePort(process.env.PORTHTTP || '3000');
app.set('port', port);

// Errors Management
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

// Create serverHttp 
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('HTTP Listening on ' + bind);
});

server.listen(port);

////////// Version HTTPS /////////////////


// Https SLL KEY AND CERTS //
let sslOptions = {
  key: fs.readFileSync(process.env.SSLKEY),
  cert: fs.readFileSync(process.env.SSLCERT)
};

// Normalisation port
const normalizePortHttps = val => {
  const portHttps = parseInt(val, 10);

  if (isNaN(portHttps)) {
    return val;
  }
  if (portHttps >= 0) {
    return portHttps;
  }
  return false;
};

//Déclaration du port
const portHttps = normalizePortHttps(process.env.PORTHTTPS || '3001');
app.set('port', portHttps);


// Errors Management
const errorHandlerHttps = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const addressHttps = serverHttps.address();
  const bindHttps = typeof addressHttps  === 'string' ? 'pipe ' + addressHttps : 'port: ' + portHttps;
  switch (error.code) {
    case 'EACCES':
      console.error(bindHttps + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bindHttps + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

// Create serverHttps 
const serverHttps = https.createServer(sslOptions, app);

serverHttps.on('error', errorHandlerHttps);
serverHttps.on('listening', () => {
  const addressHttps = serverHttps.address();
  const bindHttps = typeof address === 'string' ? 'pipe ' + addressHttps : 'port ' + portHttps;
  console.log('HTTPS Listening on ' + bindHttps);
});

serverHttps.listen(portHttps);
