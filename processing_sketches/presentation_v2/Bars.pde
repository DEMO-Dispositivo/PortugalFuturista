class Bars{
/** VARIABLES ************************************************************/
  // Screen variables
  byte nDisplays = 6;
  int sPos; // screen position (1..6)
  // Bars Variables
  color mColor;
  byte numBars = 16; 
  float bars[]; 
  int barWidth;
  //float mPos[] = new float[2];
  int mPosX;
  float mPosY;
  float spacing = 0.25; // space between bars in percentage
  private int hSpacing; // space between bars in pixels  

/** CONSTRUCTORS *********************************************************/
  Bars(int p){ // default constructor
    sPos = p-1;
    mColor = color(255, 255, 255);
    initBarsArray();
    calcBarWidth();
    calcSpacing();
  }
  Bars(byte p, byte nb){
    sPos = p-1; 
    numBars = nb; 
    mColor = color(255, 255, 255);
    initBarsArray();
    calcBarWidth();
    calcSpacing();
  }
  Bars(byte p, byte nb, color c){
    sPos = p-1; 
    numBars = nb; 
    mColor = c;
    initBarsArray();
    calcBarWidth();
    calcSpacing();
  }
  
/** FUNCTIONS ************************************************************/
  void drawUI(){
    pushStyle();
    rectMode(CORNER);
    stroke(mColor);
    noStroke();
    fill(mColor);
    //translate(width/nDisplays*(sPos), 0);
    //scale(1./nDisplays, 1.);
    for(int i = 0; i < numBars; i++){
      fill(255);
      rect(i*barWidth+hSpacing, height, barWidth-(hSpacing*2.), -(bars[i]*height));
    }
    popStyle();
  }

  void updateUI(int x, int y){
    mPosX = int(float(x) / width * numBars);
    mPosY = (height-y) / float(height);
    bars[mPosX] = mPosY; 
    
    //println(mPosX);
    /*for(byte i = 0; i < numBars; i++){
      println("bars = "+bars[i]);
    }*/
  }
  
  
  private void initBarsArray(){
    // init bars array
    bars = new float[numBars];
    for(int i = 0; i < numBars; i++){
      bars[i] = 0.;
    }
  }
  
/** INIT & SETUP **********************************************************/  
  private void calcBarWidth(){
    barWidth = width / numBars;
  }
  
  private void calcSpacing(){
    hSpacing = int(width/100.*spacing);
  }
};