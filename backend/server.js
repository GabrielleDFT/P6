//--Import HTTP package from node.js to have Tools to create 1 Server--
const http = require('http'); 

//--Import app.js--
const app = require('./app');  

//--Import Package to use environment variables--
const dotenv = require('dotenv');
const result = dotenv.config();

//------------------------------- SEARCH & DISPLAY USED PORT - REQUEST TO SERVER ------------------------------------

//--normalizePort = returns a valid port, as a number or string--
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

//--Add Connection port - If no port provided, listening on port 3000--
const port = normalizePort(process.env.PORT || '3000');

//--Setting Port with "app.set" method : tells to Express which Port to run on--
app.set('port', port);

//--errorHandler = Searching errors & manage + saved in Server-- 
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
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
};

//--createServer = Create a constant for server calls (requests and responses) - Functions in app.js--
const server = http.createServer(app);

//--SERVER EVENETS MANAGEMENT - Saved Event Listener : Logging the Port the Server is running on--
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//--Server listening requests on Port + Waiting response from Server--
server.listen(port);

