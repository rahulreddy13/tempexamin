import app              from './app'
import http             from 'http'
// import SessionCron      from './modules/SessionCron'
import Socket from './modules/Socket'

const { PORT = 8009 } = process.env;
app.set('port', PORT);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

var io = require('socket.io')(server);

io.set('heartbeat timeout', 4000);
io.set('heartbeat interval', 2000);

new Socket(server, app, io);

/**
 * Initialise Session Cron
 */

// new SessionCron()

/**
 * Listen on provided port, on all network interfaces.
 */
console.log(PORT)
server.listen(PORT);
