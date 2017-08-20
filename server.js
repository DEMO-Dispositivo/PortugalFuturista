/***************** OSC com with MaxMSP ****************/
var inport, osc, sock, udp;
var mMessage;

osc = require('osc-min');

udp = require("dgram");

if (process.argv[2] != null) {
  inport = parseInt(process.argv[2]);
} else {
  inport = 41234;
}

console.log("OSC listener running at http://localhost:" + inport);

//~verbatim:examples[0]~
//### A simple OSC printer;

sock = udp.createSocket("udp4", function(msg, rinfo) {
  var error, error1;
  try {
    mMessage = osc.fromBuffer(msg);
    sendOSC();
    return console.log(mMessage);
  } catch (error1) {
    error = error1;
    return console.log("invalid OSC packet");
  }
});

sock.bind(inport);


/***************** Server code ****************/
var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My Socket Server is Running...");

var socket = require('socket.io');

var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log('new connection:' + socket.id);

	socket.on('mouse', mouseMsg);

	function mouseMsg(data){
		socket.broadcast.emit('mouse', data);
		//io.sockets.emit('mouse', data);
		console.log(data);
	}

  socket.on('oscMessage', sendOSC);
}

function sendOSC(){
  console.log("hello");
  message = {
    x: mMessage.address,
    y: mMessage.args[0].value 
  }
  io.sockets.emit('oscMessage', message);
}
