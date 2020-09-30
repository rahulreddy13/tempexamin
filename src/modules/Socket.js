
var _this = null;

export default class Socket {

    constructor(http, app, io) {

        this.http = http;
        this.io = io;
        this.app = app;

        this.clients = [];
        this.client_count = 0;
        this.execute();
        _this = this;

    }


    execute() {

        this.io.of('/admin').on('connect', (socket) => {

            console.log("Connected " + socket.id)
            console.log(this.client_count)
            this.clients.push(socket);
            this.client_count++;

            socket.on('disconnect', () => {

                let index = _this.clients.findIndex(x => x.id == socket.id);
                _this.clients.splice(index,1)
                _this.client_count--
                console.log(_this.client_count)
                console.log("Disconnected " + socket.id)
            });

        
        })
    }

    /**
     * Send response message to all sockets
     *
     * @param socketId
     * @param channel
     * @param status
     */
    respondAllSockets(info) {

        this.io.of('admin').emit('response', info);

    }

}