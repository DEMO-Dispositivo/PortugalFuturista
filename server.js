/***************** OSC COM with MaxMSP ****************/
var inport, outport, osc, sock, udp;
var mMessage;
var sceneValue;

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
  socket.on('sendScene', sendSceneValue);
  socket.on('setSlider', sendSlider2ID);
  sendSceneValue();
  sendState(socket.id, 1); 
  socket.on('disconnect', function(){ sendState(socket.id, 0); });

  //setTimeout(sendSceneValue, 5000);
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
  switch(message.x){
    case "/scene":
      sceneValue = message.y;
      io.sockets.emit('sendScene', sceneValue);
      //console.log("server has state value of: "+sceneValue);
    break;

    case "/user":
      sendSlider2ID(message.y, mMessage.args[1].value);
    break;

    default:
      io.sockets.emit('oscMessage', message);
    break;
  }
}

function sendSceneValue(){
  io.sockets.emit('sendScene', sceneValue);
}

function sendSlider2ID(mID, val){
  //io.sockets.broadcast.to(scene2id).emit('setSlider', val);
  io.sockets.connected[mID].emit('setSlider', val);
  //console.log("sending to specific id");
}

function sendToMax(mData, id){
    var buf;
    var adr = mData[0];
    mData.splice(0, 1);
    
    switch(adr){
      case '/kick':
        buf = osc.toBuffer({
        address: adr,
        args: [
          {
            type: "integer",
            value: parseInt(mData[0][0])
          },
          {
            type: "integer",
            value: mData[0][1]
          },
          {
            type: "integer",
            value: mData[0][2]
          },
          {
            type: "integer",
            value: mData[0][3]
          },
          {
            type: "integer",
            value: mData[0][4]
          },
          {
            type: "integer",
            value: mData[0][5]
          },
          {
            type: "integer",
            value: mData[0][6]
          },
          {
            type: "integer",
            value: mData[0][7]
          },
          {
            type: "integer",
            value: mData[0][8]
          },
          {
            type: "integer",
            value: mData[0][9]
          },
          {
            type: "integer",
            value: mData[0][10]
          },
          {
            type: "integer",
            value: mData[0][11]
          },
          {
            type: "integer",
            value: mData[0][12]
          },
          {
            type: "integer",
            value: mData[0][13]
          },
          {
            type: "integer",
            value: mData[0][14]
          },
          {
            type: "integer",
            value: mData[0][15]
          },
          {
            type: "integer",
            value: mData[0][16]
          },
          {
            type: "integer",
            value: mData[0][17]
          },
          {
            type: "integer",
            value: mData[0][18]
          },
          {
            type: "integer",
            value: mData[0][19]
          }
        ]
      });
      break;

      case '/snare':
        buf = osc.toBuffer({
        address: adr,
        args: [
          {
            type: "integer",
            value: parseInt(mData[0][0])
          },
          {
            type: "integer",
            value: mData[0][1]
          },
          {
            type: "integer",
            value: mData[0][2]
          },
          {
            type: "integer",
            value: mData[0][3]
          },
          {
            type: "integer",
            value: mData[0][4]
          },
          {
            type: "integer",
            value: mData[0][5]
          },
          {
            type: "integer",
            value: mData[0][6]
          },
          {
            type: "integer",
            value: mData[0][7]
          },
          {
            type: "integer",
            value: mData[0][8]
          },
          {
            type: "integer",
            value: mData[0][9]
          },
          {
            type: "integer",
            value: mData[0][10]
          },
          {
            type: "integer",
            value: mData[0][11]
          },
          {
            type: "integer",
            value: mData[0][12]
          },
          {
            type: "integer",
            value: mData[0][13]
          },
          {
            type: "integer",
            value: mData[0][14]
          },
          {
            type: "integer",
            value: mData[0][15]
          },
          {
            type: "integer",
            value: mData[0][16]
          },
          {
            type: "integer",
            value: mData[0][17]
          },
          {
            type: "integer",
            value: mData[0][18]
          },
          {
            type: "integer",
            value: mData[0][19]
          }
        ]
      });
      break;

      case '/hithat':
        buf = osc.toBuffer({
        address: adr,
        args: [
          {
            type: "integer",
            value: parseInt(mData[0][0])
          },
          {
            type: "integer",
            value: mData[0][1]
          },
          {
            type: "integer",
            value: mData[0][2]
          },
          {
            type: "integer",
            value: mData[0][3]
          },
          {
            type: "integer",
            value: mData[0][4]
          },
          {
            type: "integer",
            value: mData[0][5]
          },
          {
            type: "integer",
            value: mData[0][6]
          },
          {
            type: "integer",
            value: mData[0][7]
          },
          {
            type: "integer",
            value: mData[0][8]
          },
          {
            type: "integer",
            value: mData[0][9]
          },
          {
            type: "integer",
            value: mData[0][10]
          },
          {
            type: "integer",
            value: mData[0][11]
          },
          {
            type: "integer",
            value: mData[0][12]
          },
          {
            type: "integer",
            value: mData[0][13]
          },
          {
            type: "integer",
            value: mData[0][14]
          },
          {
            type: "integer",
            value: mData[0][15]
          },
          {
            type: "integer",
            value: mData[0][16]
          },
          {
            type: "integer",
            value: mData[0][17]
          },
          {
            type: "integer",
            value: mData[0][18]
          },
          {
            type: "integer",
            value: mData[0][19]
          }
        ]
      });
      break;

      case '/bass':
        buf = osc.toBuffer({
        address: adr,
        args: [
          {
            type: "integer",
            value: mData[0]
          },
          {
            type: "float",
            value: mData[1]
          },
          {
            type: "float",
            value: mData[2]
          }
        ]
      });
      break;

      case '/sinewaves':
        buf = osc.toBuffer({
        address: adr,
        args: [
          {
            type: "float",
            value: parseInt(mData[0][0])
          },
          {
            type: "float",
            value: mData[0][1]
          },
          {
            type: "float",
            value: mData[0][2]
          },
          {
            type: "float",
            value: mData[0][3]
          },
          {
            type: "float",
            value: mData[0][4]
          },
          {
            type: "float",
            value: mData[0][5]
          },
          {
            type: "float",
            value: mData[0][6]
          },
          {
            type: "float",
            value: mData[0][7]
          },
          {
            type: "float",
            value: mData[0][8]
          },
          {
            type: "float",
            value: mData[0][9]
          },
          {
            type: "float",
            value: mData[0][10]
          },
          {
            type: "float",
            value: mData[0][11]
          },
          {
            type: "float",
            value: mData[0][12]
          },
          {
            type: "float",
            value: mData[0][13]
          },
          {
            type: "float",
            value: mData[0][14]
          },
          {
            type: "float",
            value: mData[0][15]
          }
        ]
      });
      break;

      case '/glitch':
        buf = osc.toBuffer({
        address: adr,
        args: [
          {
            type: "integer",
            value: mData[0]
          },
          {
            type: "float",
            value: mData[1]
          },
          {
            type: "float",
            value: mData[2]
          }
        ]
      });
      break;

      default:
        // send empty message
        buf = osc.toBuffer({
        address: '/empty',
        args: [
          {
            type: "int",
            value: -1
          }
        ]
      });
      break; 
    }

    

  return sock.send(buf, 0, buf.length, outport, "localhost"); 
}   
