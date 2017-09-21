var grid = [];
var mColor;
var hCells = 4; // num of horizontal cells in grid
var vCells = 5; // num of vertical cells in grid
var spacing = 1; // percentage of space bewteen grid cells
var hSpacing, vSpacing; // spacing in pixels (calculated during setup)
var mPos = []; // mouse pressed position

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	mColor = color("white");
	stroke(mColor);
	// init grid values 
	for(var i = 0; i < hCells*vCells; i++){
		grid[i] = false;
	}
	// convert spacing percentage to pixels 
	hSpacing = windowWidth * spacing / 100. / 2.;
	vSpacing = windowHeight * spacing / 100. / 2.;
	console.log("window whidth = "+windowWidth);
	console.log("window height = "+windowHeight);
	console.log("hSpacing = "+hSpacing);
	console.log("vSpacing = "+vSpacing);
} 

function draw(){
	drawGrid();
}

function drawGrid(){
	// for(var i = 0; i < vCells; i++){
	// 	var y = i*windowHeight/vCells; 
	// 	for(var j = 0; j < hCells; j++){
	// 		var x = j*windowWidth/hCells;
	// 		rect(x+hSpacing, y+vSpacing, windowWidth/hCells - hSpacing*2., windowHeight/vCells - vSpacing*2.);
	// 		// rect(x, y, windowWidth/hCells, windowHeight/vCells);
	// 	}
	// }

	for(var i = hCells-1; i > -1; i--){
		var x = i*windowWidth/hCells; 
		for(var j = vCells-1; j > -1; j--){
			var y = j*windowHeight/vCells;
			if(grid[ i*vCells + (vCells-1-j) ]) {
				fill(mColor);
				console.log("hey");	
			}
			else fill(0);
			//var v = (hCells-i)*(vCells-j)+(vCells-j);
			rect(x+hSpacing, y+vSpacing, windowWidth/hCells - hSpacing*2., windowHeight/vCells - vSpacing*2.);
		}
	}
}

function mouseDragged(){
	updateGrid();
}

function mousePressed(){
	updateGrid();
}

function updateGrid(){
	// mouseX to gridX
	mPos[0] = int(mouseX / (windowWidth/hCells));
	mPos[1] = int((windowHeight - mouseY) / (windowHeight/vCells));
	// console.log("gridX = "+mPos[0]);
	// console.log("gridY = "+mPos[1]);
	grid[mPos[0]*vCells+mPos[1]] = !grid[mPos[0]*vCells+mPos[1]];
	// console.log("grid = "+grid);
}