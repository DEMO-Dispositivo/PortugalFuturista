var vBlocks = 7; // must be an odd number 
var hBlocks = 7; // must be an odd number
var pSize = 2; // block size in percentage of window width
var rand = 20; // position randomness in percentage of window width 
var pRand; // position randomness in pixels
var bSize; // block size in pixels
var mColor;
var mPos = []; // mouse position
var isOn = false; 

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	rectMode(CENTER);
	mColor = color("white");
	noStroke();
	fill(mColor);

	bSize = int(windowWidth * pSize / 100.); 
	pRand = windowWidth * rand / 100.; 
}

function draw(){
	background(0);
	if(isOn) drawGlitch();
}

function drawGlitch(){
	for(var i = 0; i < vBlocks; i++){ // draw vertical blocks
		for(var j = 0; j < hBlocks; j++){ //draw horizontal blocks
			fill(random(1)*255);
			var r;
			var amt = pow((windowHeight - mPos[1]) / windowHeight, 2);
			if(random(1)) r = random(pRand) * amt;
			else r = -random(pRand) * amt;
			rect(mPos[0] - (floor(hBlocks/2)*bSize) + j*bSize + r, mPos[1] - (floor(vBlocks/2)*bSize) + i*bSize + r, bSize, bSize);
		}
	}
	
}

function mouseReleased(){
	isOn = false;
}

function mousePressed(){
	updateUI();
	isOn = true;
}

function mouseDragged(){
	updateUI();
}

function updateUI(){
	mPos[0] = mouseX;
	mPos[1] = mouseY;
	// console.log("mouse = "+mPos);
}