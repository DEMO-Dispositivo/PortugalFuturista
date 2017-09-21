// KICK VARIABLES
color kk_color;
int kk_hCells = 4; // num of horizontal cells in kk_grid
int kk_vCells = 5; // num of vertical cells in kk_grid
boolean kk_grid[] = new boolean[kk_hCells * kk_vCells];
int kk_spacing = 1; // percentage of space bewteen kk_grid cells
int kk_hSpacing, kk_vSpacing; // kk_spacing in pixels (calculated during setup)
int kk_mPos[] = new int[2]; // mouse pressed position
// SNARE VARIABLES
color sn_color;
int sn_hCells = 4; // num of horizontal cells in kk_grid
int sn_vCells = 5; // num of vertical cells in kk_grid
boolean sn_grid[] = new boolean[sn_hCells * sn_vCells];
int sn_spacing = 1; // percentage of space bewteen kk_grid cells
int sn_hSpacing, sn_vSpacing; // kk_spacing in pixels (calculated during setup)
int sn_mPos[] = new int[2]; // mouse pressed position
// HH VARIABLES
color hh_color;
int hh_hCells = 4; // num of horizontal cells in kk_grid
int hh_vCells = 5; // num of vertical cells in kk_grid
boolean hh_grid[] = new boolean[hh_hCells * hh_vCells];
int hh_spacing = 1; // percentage of space bewteen kk_grid cells
int hh_hSpacing, hh_vSpacing; // kk_spacing in pixels (calculated during setup)
int hh_mPos[] = new int[2]; // mouse pressed position
// BASS VARIABLES
int bb_mPos[] = new int[2];
color bb_color; 
int bb_squareRadius = 15; 
boolean bb_fingerOn = false;
// SINEWAVES VARIABLES
color sw_color;
int sw_numBars = 16; 
float sw_bars[] = new float[sw_numBars]; 
int sw_barWidth;
int sw_mPos[] = new int[2];
float sw_spacing = 0.25; // space between bars in percentage
int sw_hSpacing; // space between bars in pixels
// GLITCH VARIABLES
int gl_vBlocks = 7; // must be an odd number 
int gl_hBlocks = 7; // must be an odd number
int gl_pSize = 2; // block size in percentage of window width
int gl_rand = 20; // position randomness in percentage of window width 
int gl_pRand; // position randomness in pixels
int gl_bSize; // block size in pixels
color gl_color;
int gl_mPos[] = new int[2]; // mouse position
boolean gl_isOn = false; 

void setup(){
  //size(1440, 990);
  fullScreen();
  background(0);
  
  // KICK SETUP
  kk_color = color(255, 255, 255);
  // init kk_grid values 
  for(int i = 0; i < kk_hCells*kk_vCells; i++){
    kk_grid[i] = false;
  }
  // convert kk_spacing percentage to pixels 
  kk_hSpacing = int(width/6. * kk_spacing / 100. / 2.);
  kk_vSpacing = int(height * kk_spacing / 100. / 2.);
  
  // BASS SETUP
  bb_color = color(255, 255, 255);
  
  // SNARE SETUP
  sn_color = color(255, 255, 255);
  // init sn_grid values 
  for(int i = 0; i < sn_hCells*kk_vCells; i++){
    sn_grid[i] = false;
  }
  // convert kk_spacing percentage to pixels 
  sn_hSpacing = int(width/6. * sn_spacing / 100. / 2.);
  sn_vSpacing = int(height * sn_spacing / 100. / 2.);
  
  // SINEWAVES SETUP
  // init bars array
  for(int i = 0; i < sw_numBars; i++){
    sw_bars[i] = random(1);
  }
  // calc barWidth
  sw_barWidth = width /6 / sw_numBars;
  // calc spacing in pixels
  sw_hSpacing = int(width/6/100.* sw_spacing);
  sw_color = color(255, 255, 255);
  
  // HH SETUP
  hh_color = color(255, 255, 255);
  // init hh_grid values 
  for(int i = 0; i < hh_hCells*kk_vCells; i++){
    hh_grid[i] = false;
  }
  // convert kk_spacing percentage to pixels 
  hh_hSpacing = int(width/6. * hh_spacing / 100. / 2.);
  hh_vSpacing = int(height * hh_spacing / 100. / 2.);
  
  // GL SETUP
  gl_bSize = int(width/6 * gl_pSize / 100.); 
  gl_pRand = int(width/6 * gl_rand / 100.);
  gl_color = color(255, 255, 255);
} 

void draw(){
  background(0);
  
  drawKK();
  
  if(bb_fingerOn)drawBB();
  
  drawSN();

  drawSW();
  
  drawHH();
  
  if(gl_isOn) drawGL();
}

void mouseReleased(){
  bb_fingerOn = false;
  gl_isOn = false;
}

void mouseDragged(){
  updateMousePosition();
}

void mousePressed(){
  updateMousePosition();
  gl_isOn = true;
}

void updateMousePosition(){
  // UPDATE KK
  if(mouseX < width/6){
    // mouseX to kk_gridX
    kk_mPos[0] = int(mouseX / (width/6/kk_hCells));
    kk_mPos[1] = int((height - mouseY) / (height/kk_vCells));
    kk_grid[kk_mPos[0]*kk_vCells+kk_mPos[1]] = !kk_grid[kk_mPos[0]*kk_vCells+kk_mPos[1]];
  }
  // UPDATE BB
  if(mouseX > width/6 && mouseX < width/6*2){
    bb_mPos[0] = mouseX;
    bb_mPos[1] = mouseY;
    bb_fingerOn = true;
  }
  // UPDATE SN
  if(mouseX > width/6*2 && mouseX < width/6*3){
    // mouseX to sn_gridX
    sn_mPos[0] = int(mouseX / (width/6/kk_hCells));
    sn_mPos[1] = int((height - mouseY) / (height/sn_vCells));
    sn_grid[sn_mPos[0]*sn_vCells+sn_mPos[1]] = !sn_grid[sn_mPos[0]*sn_vCells+sn_mPos[1]];
  }
  // UPDATE SW
  if(mouseX > width/6*3 && mouseX < width/6*4){
    sw_mPos[0] = int(mouseX / width/6 * sw_numBars);
    sw_mPos[1] = (height-mouseY) / height;
    sw_bars[sw_mPos[0]] = sw_mPos[1]; 
  }
  // UPDATE HH
  if(mouseX > width/6*4 && mouseX < width/6*5){
    // mouseX to sn_gridX
    hh_mPos[0] = int(mouseX / (width/6/hh_hCells));
    hh_mPos[1] = int((height - mouseY) / (height/hh_vCells));
    hh_grid[hh_mPos[0]*hh_vCells+hh_mPos[1]] = !hh_grid[hh_mPos[0]*sn_vCells+hh_mPos[1]];
  }
  if(mouseX > width/6*5){
    gl_mPos[0] = mouseX;
    gl_mPos[1] = mouseY;
  }
}

// KICK FUNCTIONS
void drawKK(){
  stroke(kk_color);
  for(int i = kk_hCells-1; i > -1; i--){
    int x = i*width/6/kk_hCells; 
    for(int j = kk_vCells-1; j > -1; j--){
      int y = j*height/kk_vCells;
      if(kk_grid[ i*kk_vCells + (kk_vCells-1-j) ]) {
        fill(kk_color);
      }
      else fill(0);
      rect(x+kk_hSpacing, y+kk_vSpacing, width/6/kk_hCells - kk_hSpacing*2., height/kk_vCells - kk_vSpacing*2.);
    }
  }
}
// BASS FUNCTIONS 
void drawBB(){
  stroke(bb_color);
  // vertical line
  line(bb_mPos[0], 0, bb_mPos[0], height);
  // horizontal line
  line(width/6, bb_mPos[1], width/6*2, bb_mPos[1]);
  rect(bb_mPos[0]-bb_squareRadius, bb_mPos[1]-bb_squareRadius, bb_squareRadius*2, bb_squareRadius*2 );
}
// SNARE FUNCTIONS
void drawSN(){
  stroke(sn_color);
  for(int i = sn_hCells-1; i > -1; i--){
    int x = i*width/6/sn_hCells; 
    for(int j = sn_vCells-1; j > -1; j--){
      int y = j*height/sn_vCells;
      if(kk_grid[ i*kk_vCells + (sn_vCells-1-j) ]) {
        fill(sn_color);
      }
      else fill(0);
      rect((width/6*2) +x+sn_hSpacing, y+sn_vSpacing, width/6/sn_hCells - sn_hSpacing*2., height/sn_vCells - sn_vSpacing*2.);
    }
  }
}
// SINEWAVES FUNCTIONS
void drawSW(){
  for(int i = 0; i < sw_numBars; i++){
    fill(sw_color);
    rect((width/6*3) + i*sw_barWidth+sw_hSpacing, height, sw_barWidth-(sw_hSpacing*2.), -(sw_bars[i]*height));
  }
}
// HH FUNCTIONS
void drawHH(){
  stroke(hh_color);
  for(int i = hh_hCells-1; i > -1; i--){
    int x = i*width/6/hh_hCells; 
    for(int j = hh_vCells-1; j > -1; j--){
      int y = j*height/hh_vCells;
      if(hh_grid[ i*kk_vCells + (hh_vCells-1-j) ]) {
        fill(hh_color);
      }
      else fill(0);
      rect((width/6*4) +x+hh_hSpacing, y+hh_vSpacing, width/6/hh_hCells - hh_hSpacing*2., height/hh_vCells - hh_vSpacing*2.);
    }
  }
}

void drawGL(){
  pushMatrix();
  rectMode(CENTER);
  noStroke();
  fill(gl_color);
  
  for(int i = 0; i < gl_vBlocks; i++){ // draw vertical blocks
    for(int j = 0; j < gl_hBlocks; j++){ //draw horizontal blocks
      fill(random(1)*255);
      float r;
      float amt = pow((height - gl_mPos[1]) / height, 2);
      if(random(1) < 0.5) r = random(gl_pRand) * amt;
      else r = -random(gl_pRand) * amt;
      rect((width/6*5) + gl_mPos[0] - (floor(gl_hBlocks/2)*gl_bSize) + j*gl_bSize + r, gl_mPos[1] - (floor(gl_vBlocks/2)*gl_bSize) + i*gl_bSize + r, gl_bSize, gl_bSize);
    }
  }
  
  popMatrix();
}