var numBars = 16; 
var bars = []; 
var barWidth;
var mPos = [];
var spacing = 0.25; // space between bars in percentage
var hSpacing; // space between bars in pixels  

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	mColor = color("white");
	stroke(mColor);
	fill(mColor);

	// init bars array
	for(var i = 0; i < numBars; i++){
		bars[i] = 0.;
	}
	// calc barWidth
	barWidth = windowWidth / numBars;
	// calc spacing in pixels
	hSpacing = windowWidth/100.*spacing;
}

function draw(){
	background(0);
	drawBars();
}

function drawBars(){
	for(var i = 0; i < numBars; i++){
		fill(255);
		rect(i*barWidth+hSpacing, windowHeight, barWidth-(hSpacing*2.), -(bars[i]*windowHeight));
	}
}

function mousePressed(){
	updateUI();
}

function mouseDragged(){
	updateUI();
}

function updateUI(){
	mPos[0] = int(mouseX / windowWidth * numBars);
	mPos[1] = (windowHeight-mouseY) / windowHeight;
	bars[mPos[0]] = mPos[1]; 
	// console.log("bars = "+bars);
}