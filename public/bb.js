var mPos = [];
var mColor; 
var squareRadius = 50; 
var fingerOn = false;

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	mColor = color("white");
	stroke(mColor);
}

function draw(){
	background(0);
	if(fingerOn)drawUI();
}

function mouseDragged(){
	mPos.x = mouseX;
	mPos.y = mouseY;
	fingerOn = true;
	// console.log("mouseX = "+mPos.x+" || mouseY = "+ mPos.y);
}

function drawUI(){
	// vertical line
	line(mPos.x, 0, mPos.x, windowHeight);
	// horizontal line
	line(0, mPos.y, windowWidth, mPos.y);
	rect(mPos.x-squareRadius, mPos.y-squareRadius, squareRadius*2, squareRadius*2 );
}

function mouseReleased(){
	fingerOn = false;
}