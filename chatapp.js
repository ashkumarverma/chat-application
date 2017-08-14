var app = require("http").createServer(handler);
var io = require("socket.io").listen(app);
var fs = require("fs");

app.listen(1234);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}

io.sockets.on('connection', function (socket) {    
    socket.on("clientMsg", function (data) {        
        socket.emit("serverMsg", data);        
        socket.broadcast.emit("serverMsg", data);
    });

    socket.on("sender", function (data) {
        socket.emit("sender", data);
        socket.broadcast.emit("sender", data);
    });
});

var port = 1234;
var host = '127.0.0.1';
console.log('Listening at http://' + host + ':' + port);