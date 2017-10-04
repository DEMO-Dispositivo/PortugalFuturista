class Target{
/** VARIABLES ************************************************************/
  // Screen variables
  byte nDisplays = 6;
  int sPos; // screen position (1..6)
  // Target Variables
  int mPos[] = new int[2];
  color mColor;
  int sWeight = 1;
  int squareRadius = 15; 
  boolean fingerOn = false;
/** CONSTRUCTORS *********************************************************/
  Target(int p){ // default constructor
    sPos = p;
    mColor = color(255, 255, 255);
  }
  Target(byte p, int sr){
    sPos = p; 
    squareRadius = sr; 
    mColor = color(255, 255, 255);  
  }
  Target(byte p, int sr, color c){
    sPos = p; 
    squareRadius = sr; 
    mColor = c; 
  }
  
/** FUNCTIONS ************************************************************/
  void drawUI(){
    if(fingerOn)drawTarget();
  }

  private void drawTarget(){
    pushMatrix();
    stroke(mColor);
    strokeWeight(sWeight);
    translate(width/nDisplays*(sPos-1), 0);
    scale(1./nDisplays, 1.);
    // vertical line
    line(mPos[0], 0, mPos[0], height);
    // horizontal line
    line(0, mPos[1], width, mPos[1]);
    rect(mPos[0]-squareRadius, mPos[1]-squareRadius, squareRadius*2, squareRadius*2 );
    popMatrix();
  }
};