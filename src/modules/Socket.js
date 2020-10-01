
var _this = null;

export default class Socket {

    constructor(http, app, io) {

        this.http = http;
        this.io = io;
        this.app = app;

        this.clients = [];
        this.execute();
        _this = this;

    }


    execute() {

        this.io.of('/admin').on('connect', (socket) => {

            var handshakeData = socket.request;
            let data = { 'socket_id' : socket.id , 'user_id' : handshakeData._query['user_id'] ,"status" : 'online' }

            let index = _this.clients.findIndex(x => x.user_id == data.user_id);
            index == -1 ? _this.clients.push(data) : _this.clients.splice(index,1,data);

            console.log(`Connected : ${socket.id}`)

            socket.on('online', () => {
                _this.respondAllSockets({"Client_Online": _this.clients.filter(x => x.status == 'online').length , "Client_Offline" : _this.clients.filter(x => x.status == 'offline').length , "Clients" : _this.clients });
            })

            socket.on('clear-counter',() => {
                _this.clients = [];
                this.io.of('admin').emit('close-window',{});
            })

            socket.on('disconnect', () => {
                let index = _this.clients.findIndex(x => x.socket_id == socket.id);
                index > -1 ? _this.clients[index]['status'] = 'offline' : {}
                console.log(`Disconnected - ${socket.id}`);
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