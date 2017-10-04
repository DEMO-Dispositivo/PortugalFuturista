// MAIN VARIABLES
var socket;
var scene = 0; 

var oscil; // oscillator object
var strobe; // strobe value (B or W = 0 or 255) 
var prob = 20; // probability in % (0..100)
var strobeCount = 0; 

var slidersnames;
var mColor;
var voice; 

var mPos = []; // mouse pressed position

// SCENE 2 VARIABLES
// Grid 
var grid = [];
var hCells = 4; // num of horizontal cells in grid
var vCells = 5; // num of vertical cells in grid
var g_spacing = 1; // percentage of space bewteen grid cells
var hSpacing, vSpacing; // spacing in pixels (calculated during setup)
// bass
var squareRadius = 50; 
var b_fingerOn = 0;


/* NO SLEEP */
      var noSleep = new NoSleep();

      function enableNoSleep() {
        noSleep.enable();
        document.removeEventListener('click', enableNoSleep, false);
      }

      // Enable wake lock.
      // (must be wrapped in a user input event handler e.g. a mouse or touch handler)
      document.addEventListener('click', enableNoSleep, false);
/* NO SLEEP */

// default mouse data init
/*var mouseData = {
	x: "/hello",
	y: 0,
	z: 0
};*/ 

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noStroke();
	frameRate(24);
	textAlign(CENTER);
	textSize(int(windowWidth/10));

	// GRID init
	mColor = color("white");
	stroke(mColor);
	// init grid values 
	for(var i = 0; i < hCells*vCells; i++){
		grid[i] = 0;
	}
	// convert spacing percentage to pixels 
	hSpacing = windowWidth * g_spacing / 100. / 2.;
	vSpacing = windowHeight * g_spacing / 100. / 2.;

	// Scene2 slider address names, colors and voice id (integer representing kick, bass, etc.)
	slidersnames = ["/kick", "/bass", "/snare", "/sinewaves", "/hithat", "/glitch"];
	// mColor = mColor = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [0, 255, 255], [255, 0, 255], [255, 255, 0], [255, 255, 255], [127, 127, 127] ];
	voice = int(random(slidersnames.length));
	//console.log("voice id: "+voice);

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
	//console.log("voice = "+voice);
}
function setScene(sceneValue){
	scene = sceneValue;
	//console.log("scene = "+scene);
}

function mouseDragged(){
	/*if(scene > 1){
		mouseData = {
			x: mouseX / windowWidth,
			y: (windowHeight - mouseY) / windowHeight,
			z: slidersnames[voice]
		}
	}
	socket.emit('mouse', mouseData);
	// console.log("mouseY: "+mouseData.y);
	*/
	if(scene == 2){
		if(voice==1) b_fingerOn = 1;
		mouseUpdate();
		sendData2Max();
	} 
}
function mousePressed(){
	if (scene == 2){
		if(voice==1) b_fingerOn = 1;
		mouseUpdate();
		sendData2Max();
	} 

}
function mouseReleased(){
	if(scene==2) {
		if(voice==1){
			b_fingerOn = 0;
			updateBass();
			sendData2Max();
		}
	}
}

function parseOSC(message){
	//console.log("message: "+message.x+" "+message.y);
	switch(message.x){
		case '/scene':
			scene = message.y;
			//console.log("scene = "+scene);
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
			oscil.amp(0);
		break;

		case 1:
			probStrobe();
		break; 

		case 2:
			background(0);
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

// SCENE2 draw functions
function musicalControl(){ 
	switch(voice){
		case 0:
			drawGrid();
			break;
		case 2:
			drawGrid();
			break;
		case 4:
			drawGrid();
			break;

		case 1: 
			drawBass();
			break;

		default:
			console.log("ERROR: unknown voice for scene2");
			break;
	}
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

// SCENE 2 User Interfaces (kick, bass, snare, sinewaves, hithat, glitch)
function drawGrid(){
	for(var i = hCells-1; i > -1; i--){
		var x = i*windowWidth/hCells; 
		for(var j = vCells-1; j > -1; j--){
			var y = j*windowHeight/vCells;
			if(grid[ i*vCells + (vCells-1-j) ] > 0) {
				fill(mColor);
				//console.log("hello");
			}
			else fill(0);
			rect(x+hSpacing, y+vSpacing, windowWidth/hCells - hSpacing*2., windowHeight/vCells - vSpacing*2.);
		}
	}
}
function updateGrid(){
	// mouseX to gridX
	mPos[0] = int(mouseX / (windowWidth/hCells));
	mPos[1] = int((windowHeight - mouseY) / (windowHeight/vCells));
	// console.log("gridX = "+mPos[0]);
	// console.log("gridY = "+mPos[1]);
	var index = mPos[0]*vCells+mPos[1];
	if(grid[index] > 0) grid[index] = 0;
	 else grid[index] = 1; 
	//grid[mPos[0]*vCells+mPos[1]] = !grid[mPos[0]*vCells+mPos[1]]
	// console.log("grid = "+grid);
}

function drawBass(){
	if(b_fingerOn>0){
		// vertical line
		line(mPos.x, 0, mPos.x, windowHeight);
		// horizontal line
		line(0, mPos.y, windowWidth, mPos.y);
		rect(mPos.x-squareRadius, mPos.y-squareRadius, squareRadius*2, squareRadius*2 );
	}
}

function updateBass(){
	mPos.x = mouseX;
	mPos.y = mouseY;
}

// MOUSE UPDATES FOR SCENE2 
function mouseUpdate(){
	switch(voice){
		case 0:
			updateGrid();
			break;
		case 2: 
			updateGrid();
			break;
		case 4: 
			updateGrid();
			break;

		case 1:
			updateBass();
			break;

		default:
			break;
	}
}

// SEND DATA TO MAXMSP
function sendData2Max(){
	var mouseData = [];

	switch(voice){
		case 0:
			mouseData[0] = slidersnames[voice];
			mouseData.push(grid);
			// console.log(mouseData);
			break; 
		case 2:
			mouseData[0] = slidersnames[voice];
			mouseData.push(grid);
			// console.log(mouseData);
			break; 
		case 4:
			mouseData[0] = slidersnames[voice];
			mouseData.push(grid);
			// console.log(mouseData);
			break; 

		case 1: 
			mouseData[0] = slidersnames[voice];
			mouseData[1] = b_fingerOn;
			mouseData[2] = mouseX / windowWidth;
			mouseData[3] = (windowHeight - mouseY) / windowHeight;
			break;

		default:
			console.log("couldn't send data 2 MAXMSP");
			break;
	}
	socket.emit('mouse', mouseData);
	// console.log("mouseY: "+mouseData.y);
}