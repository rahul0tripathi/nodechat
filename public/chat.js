//connect
var socket = io();
// Query DOM
/**/

// Emit events
 socket.on('connect', function () {
    var socketid = socket.io.engine.id;
    $("#socketid").text("Socket Id :"+socketid);
    console.log(socketid);
    socket.emit('onlineuser', {
        socid: socketid,
        name: Cookies.get("name"),
        email : Cookies.get("Email"),
        image : Cookies.get("imageurl")
    });
});

/*btn.addEventListener('click', function () {
    socket.emit('chat', {
        from: uid.innerHTML,
        //message: message.value,
        //handle: handle.value

    });

    output.innerHTML += '<p><strong> Me: </strong>' + message.value + '</p>';
    message.value = "";
});

message.addEventListener('keyup', function () {
    socket.emit('typing', {
        typer: uid.innerHTML,
        to: handle.value
    });
});*/

/*
// Listen for events
var event = 'chat' + userid.innerHTML;
socket.on(event, function (data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.from + ': </strong>' + data.message + '</p>';
});
var type = 'typing' + userid.innerHTML;
socket.on(type, function (data) {
    feedback.innerHTML = '<p><em>' + data.typer + ' is typing a message...</em></p>';
});*/
