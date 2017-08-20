var socket;
var scene = 0; 

var oscil; // oscillator object
var strobe; // strobe value (B or W = 0 or 255) 
var prob = 0; // probability in % (0..100)

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	frameRate(24);

	// Socket connection
	//socket = io.connect('http://localhost:3000');
	socket = io.connect();
	socket.on('oscMessage', parseOSC);

	// Oscillators and audio-related stuff
	oscil = new p5.Oscillator();
  	oscil.setType('sine');
  	oscil.freq(1000);
  	oscil.amp(0);
  	oscil.start();
}

function parseOSC(message){
	//console.log("message: "+message.x+" "+message.y);
	switch(message.x){
		case '/scene':
			scene = message.y;
			console.log("scene = "+scene);
		break;

		case '/prob':
			prob = message.y;

		default:
		break;
	}
}

function draw() {
	switch(scene){
		case 0: 
			background(0);
		break;

		case 1:
			probStrobe();
		break; 

		case 2:
		break;

		default:
		break;
	}
}

function probStrobe(){ // Scene 1
	var rnd = random(0, 100);
	if (rnd < prob){
    	strobe = 255;
    	oscil.freq(random(8200, 8800) );
  		oscil.amp(0.05);
  	}
  	else{
    	strobe = 0; 
    	oscil.amp(0);
  	}
  	background(strobe);
}
