class Glitch{
/** VARIABLES ************************************************************/
  // Screen variables
  byte nDisplays = 6;
  int sPos; // screen position (1..6)
  // Grid Variables
  byte vBlocks = 7; // must be an odd number 
  byte hBlocks = 7; // must be an odd number
  float pSize = 2; // block size in percentage of window width
  int rand = 20; // position randomness in percentage of window width 
  float pRand; // position randomness in pixels
  int bSize; // block size in pixels
  color mColor;
  float mPos[] = new float[2]; // mouse position
  int isOn = 0; 
  
  Glitch(int p){
    sPos = p-1;
    mColor = color(255, 255, 255);
    calcBarSize();
    calcRand();
  }
  Glitch(int p, byte b){
    sPos = p-1;
    vBlocks = b;
    hBlocks = b;
    mColor = color(255, 255, 255);
    calcBarSize();
    calcRand();
  }
  Glitch(int p, byte b, float s){
    sPos = p-1;
    vBlocks = b;
    hBlocks = b;
    pSize = s; 
    mColor = color(255, 255, 255);
    calcBarSize();
    calcRand();
  }
/** FUNCTIONS ************************************************************/
  void drawUI(){
    if(isOn>0) drawGlitch();
  }
  private void drawGlitch(){
    pushMatrix();
    rectMode(CENTER);
    noStroke();
    fill(mColor);
    translate(width/nDisplays*(sPos), 0);
    scale(1./nDisplays, 1.);
    for(int i = 0; i < vBlocks; i++){ // draw vertical blocks
      for(int j = 0; j < hBlocks; j++){ //draw horizontal blocks
        fill(random(1)*255);
        float r;
        float amt = pow((height - mPos[1]) / height, 2);
        if(random(1)>0.5){ 
          r = random(pRand) * amt;
        }
        else r = -random(pRand) * amt;
          rect(mPos[0] - (floor(hBlocks/2)*bSize) + j*bSize + r, mPos[1] - (floor(vBlocks/2)*bSize) + i*bSize + r, bSize, bSize);
        }
      }
    popMatrix();
  }
  
  void updateUI(int on, float x, float y){
    isOn = on;
    mPos[0] = x * width;
    mPos[1] = (1-y) * height;
  }
/** INIT & SETUP **********************************************************/  
  private void calcBarSize(){
    bSize = int(width * pSize / 100.); 
  }
  
  private void calcRand(){
    pRand = width * rand / 100.; 
  }
};