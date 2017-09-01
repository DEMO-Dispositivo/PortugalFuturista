/***************** OSC COM with MaxMSP ****************/
var inport, outport, osc, sock, udp;
var mMessage;

osc = require('osc-min');

udp = require("dgram");

if (process.argv[2] != null) {
  inport = parseInt(process.argv[2]);
  outport = parseInt(process.argv[2]);
} else {
  inport = 41234;
  outport = 12000;
}

console.log("OSC listener running at http://localhost:" + inport);
console.log("OSC sender running at http://localhost:" + outport);

// Receive OSC messages
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
		  //socket.broadcast.emit('mouse', data);
		  //io.sockets.emit('mouse', data);
      sendToMax(data, socket.id);
  }
  socket.on('oscMessage', sendOSC);
  sendState(socket.id, 1); 
  socket.on('disconnect', function(){ console.log(socket.id + " disconnected"); });
}

function sendState(id, v){ // send connect/disconnect state to MaxMSP 
  var buf;
  switch(v){
    // disconnected
    case 0:
      buf = osc.toBuffer({
      address: "/disconnected",
      args: [
      {
        type: "string",
        value: id
      }
      ]
      });
      return sock.send(buf, 0, buf.length, outport, "localhost"); 
      break;
    // connected 
    case 1: 
      buf = osc.toBuffer({
      address: "/connected",
      args: [
      {
        type: "string",
        value: id
      }
      ]
      });
      return sock.send(buf, 0, buf.length, outport, "localhost"); 
      break;

    default:
      console.log("sendState(v) wrong attribute");
      break;
  }
}

function sendOSC(){ // send received OSC messages from MaxMSP to clients using web sockets
  message = {
    x: mMessage.address,
    y: mMessage.args[0].value 
  }
  io.sockets.emit('oscMessage', message);
}

function sendToMax(mData, id){
    var buf;
    buf = osc.toBuffer({
    address: mData.z + "/" + id,
    args: [
      {
        type: "float",
        value: mData.x
      },
      {
        type: "float",
        value: mData.y
      }
    ]
  });

  return sock.send(buf, 0, buf.length, outport, "localhost"); 
}   
