var socket;
var scene = 0; 

var oscil; // oscillator object
var strobe; // strobe value (B or W = 0 or 255) 
var prob = 20; // probability in % (0..100)
var strobeCount = 0; 

var slidersnames;
var mColor;
var voice; 

// default mouse data init
var mouseData = {
	x: 0,
	y: 0,
	z: "/hello"
}; 

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noStroke();
	frameRate(24);
	textAlign(CENTER);
	textSize(int(windowWidth/10));

	// Scene2 slider address names, colors and voice id (integer representing kick, bass, etc.)
	slidersnames = ["/kick", "/clicks", "/noiserise", "/glitchynoise", "/hithats", "/bass", "/sinebeats"];
 	mColor = mColor = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(0, 255, 255), color(255, 0, 255), color(255, 255, 0), color(255, 255, 255), color(127, 127, 127)];
	// mColor = mColor = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [0, 255, 255], [255, 0, 255], [255, 255, 0], [255, 255, 255], [127, 127, 127] ];
	voice = int(random(slidersnames.length));
	console.log("voice id: "+voice);

	// Socket connection
	//socket = io.connect('http://localhost:3000');
	socket = io.connect();
	socket.on('oscMessage', parseOSC);
	socket.on('sendScene', setScene);
	socket.on('setSlider', selectSlider);

	// Oscillators and audio-related stuff
	oscil = new p5.Oscillator();
  	oscil.setType('sine');
  	oscil.freq(1000);
  	oscil.amp(0);
  	oscil.start();
}
function selectSlider(slider){
	voice = slider;
	console.log("voice = "+voice);
}
function setScene(sceneValue){
	scene = sceneValue;
	console.log("scene = "+scene);
}

function mouseDragged(){
	if(scene > 1){
		mouseData = {
			x: mouseX / windowWidth,
			y: (windowHeight - mouseY) / windowHeight,
			z: slidersnames[voice]
		}
	}
	socket.emit('mouse', mouseData);
	// console.log("mouseY: "+mouseData.y);
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
			musicalControl();
		break;

		case 3:
			outOfControl();

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

function musicalControl(){
	var a = int(mouseData.y * 255);

	background(0);
	
	fill(red(mColor[voice]),green(mColor[voice]), blue(mColor[voice]), a);
	rect(0,0,windowWidth,windowHeight);

	fill(red(mColor[voice]),green(mColor[voice]), blue(mColor[voice]), 255);
	text(slidersnames[voice], windowWidth/2, windowHeight/2);
}

function outOfControl(){
	
	if (strobeCount){
    	strobe = 255;
    	oscil.freq(random(8200, 8800) );
  		oscil.amp(0.05);
  	}
  	else{
    	strobe = 0; 
    	oscil.amp(0);
  	}
  	strobeCount++;
  	strobeCount = strobeCount % 2;
  	background(strobe);
  	fill(255-strobe);
  	text("you are not in control", windowWidth/2, windowHeight/2);
}