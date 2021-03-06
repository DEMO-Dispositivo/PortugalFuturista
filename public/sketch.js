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
var g_hSpacing, g_vSpacing; // spacing in pixels (calculated during setup)
// bass
var squareRadius = 50; 
var b_fingerOn = 0;
// sinewaves
var numBars = 16; 
var bars = []; 
var barWidth;
var s_spacing = 0.25; // space between bars in percentage
var s_hSpacing; // space between bars in pixels  
// glitch
var vBlocks = 7; // must be an odd number 
var hBlocks = 7; // must be an odd number
var pSize = 2; // block size in percentage of window width
var rand = 20; // position randomness in percentage of window width 
var pRand; // position randomness in pixels
var bSize; // block size in pixels
var isOn = false; 

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
	g_hSpacing = windowWidth * g_spacing / 100. / 2.;
	g_vSpacing = windowHeight * g_spacing / 100. / 2.;

	// SINEWAVES init
	// init bars array
	for(var i = 0; i < numBars; i++){
		bars[i] = 0.;
	}
	// calc barWidth
	barWidth = windowWidth / numBars;
	// calc spacing in pixels
	s_hSpacing = windowWidth/100.*s_spacing;

	// GLITCH init
	bSize = int(windowWidth * pSize / 100.); 
	pRand = windowWidth * rand / 100.; 

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
		if(voice==5) isOn = 1;
		mouseUpdate();
		sendData2Max();
	} 
}
function mousePressed(){
	if (scene == 2){
		if(voice==1) b_fingerOn = 1;
		if(voice==5) isOn = 1;
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
		if(voice==5){
			isOn = 0;
			updateGlitch();
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
		case 3: 
			drawSinewaves();
			break;
		case 5: 
			drawGlitch();
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
				switch(voice){
					case 0:
					fill(255, 0, 0);
					break;
					case 2:
					fill(0, 255, 0);
					break;
					case 4:
					fill(0, 0, 255);
					break;
					default:
					fill(mColor);
					break;
				}
				//console.log("hello");
			}
			else fill(0);
			rect(x+g_hSpacing, y+g_vSpacing, windowWidth/hCells - g_hSpacing*2., windowHeight/vCells - g_vSpacing*2.);
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

function drawSinewaves(){
	for(var i = 0; i < numBars; i++){
		fill(255);
		rect(i*barWidth+s_hSpacing, windowHeight, barWidth-(s_hSpacing*2.), -(bars[i]*windowHeight));
	}
}

function updateSinewaves(){
	mPos[0] = int(mouseX / windowWidth * numBars);
	mPos[1] = (windowHeight-mouseY) / windowHeight;
	bars[mPos[0]] = mPos[1]; 
	// console.log("bars = "+bars);
}

function drawGlitch(){
	if(isOn){
		for(var i = 0; i < vBlocks; i++){ // draw vertical blocks
			for(var j = 0; j < hBlocks; j++){ //draw horizontal blocks
				fill(random(1)*255);
				noStroke();
				var r;
				var amt = pow((windowHeight - mPos[1]) / windowHeight, 2);
				if(random(1)) r = random(pRand) * amt;
				else r = -random(pRand) * amt;
				rect(mPos[0] - (floor(hBlocks/2)*bSize) + j*bSize + r, mPos[1] - (floor(vBlocks/2)*bSize) + i*bSize + r, bSize, bSize);
			}
		}
	}
}
function updateGlitch(){
	mPos[0] = mouseX;
	mPos[1] = mouseY;
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
		case 3:
			updateSinewaves();
			break;
		case 5:
			updateGlitch();
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

		case 3:
			mouseData[0] = slidersnames[voice];
			mouseData.push(bars);
			// console.log(mouseData);
			break; 

		case 5: 
			mouseData[0] = slidersnames[voice];
			if (isOn){ mouseData[1] = 1; }
			else{ mouseData[1] = 0; }
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