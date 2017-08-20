var socket;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	//socket = io.connect('http://localhost:3000');
	socket = io.connect();
	socket.on('mouse', newDrawing);
	socket.on('square', drawSquare);
}

function newDrawing(data){
	noStroke();
	fill(255, 0, 100);
	ellipse(data.x, data.y, 60, 60);
}

function drawSquare(){
	fill(255);
	rect(0, 0, 150, 150);
}

function mouseDragged(){
	console.log('Sending: ' + mouseX + ',' + mouseY);

	var data = {
		x: mouseX, 
		y: mouseY
	}

	socket.emit('mouse', data);

	noStroke();
	fill(255);
	ellipse(mouseX, mouseY, 60, 60);
}

function draw() {
	
}

