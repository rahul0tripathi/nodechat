var express = require('express');
var socket = require('socket.io');
var fs = require('fs');
var cookieParser = require('cookie-parser');
//App setup
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//Serving static files
var server = app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
var users = [];
//socket setup
app.get('/', function (req, res) {
     res.render('home');
});
app.get('/chat', function (req, res) {
      
    if(!req.cookies['name']){
        res.render('home');
}
else{
res.render('index');
}
});
    app.get('/chat/:id',function(req,res){
var requser;
users.forEach(function(item){
if(item.name == req.params.id){
requser={
    name:item.name,
    email:item.email,
    image:item.image,
    socketid:item.socketid
}

}

});
res.render('chatroom',{data:requser});
});
var io = socket(server);
io.on('connection', function (socket) {
    console.log('made the socket', socket.id);
    socket.on('onlineuser', function (data) {
        var j = 0;
        for (var i = 0; i < users.length; i++) {
            if (users[i].name == data.name) {
                users[i].socketid = data.socid;
                var j = 1;
                break;

            } else {
                continue;
            }
        }
        if (j == 0) {
            users.push({
                name: data.name,
                email : data.email,
                image : data.image,
                socketid: data.socid
            });
        }
     
        io.sockets.emit('onlineusers', users);
    });
    socket.on('removeuser', function (data) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].name == data.name) {
                users.splice(i, 1);
            }
        }
         
        io.sockets.emit('onlineusers', users);
    });

    socket.on('chat', function (data) {

users.forEach(function(item){
    if(item.name == data.from){
        senddata = {
            image : item.image,
            msg : data.message
        }
    }
});
var event = 'chat'+data.handle;
        io.sockets.emit(event, senddata);



        // socket.broadcast.emit('online',{name:data.from});
    });
    socket.on('typing', function (data) {
        var event = 'typing' + data.to;
        socket.broadcast.emit(event, data);
        io.sockets.emit('online', {
            name: data.typer
        });
    });

});
app.get('/get_well_soon',function(req,res){
res.render('card');
});
 module.exports = {
        express : app,
        
        listener :server} 

   var getstats = require('./getbasic');
