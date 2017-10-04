// class Grid extends PApplet{
class Grid{
/** VARIABLES ************************************************************/
  // Screen variables
  byte nDisplays = 6;
  int sPos; // screen position (1..6)
  // Grid Variables
  color mColor;
  byte sWeight = 4; 
  int hCells, vCells; // num of horizontal and vertical cells in grid
  boolean grid[] = new boolean[hCells * vCells];
  float spacing = 5.2; // percentage of space bewteen kk_grid cells
  float hSpacing, vSpacing; // kk_spacing in pixels (calculated during setup)
  int mPos[] = new int[2]; // mouse pressed position
  
/** CONSTRUCTORS *********************************************************/
  Grid(int p){ // default constructor
    sPos = p;
    hCells = 4;
    vCells = 5;
    mColor = color(255, 255, 255);
    grid = new boolean[hCells * vCells];
    initGrid();
    convertSpacing();
  }
  Grid(byte p, color c){
    sPos = p; 
    hCells = 4;
    vCells = 5;
    mColor = c;
    grid = new boolean[hCells * vCells];
    initGrid();
    convertSpacing();
  }
  Grid(byte p, int hc, int vc){
    sPos = p;
    hCells = hc;
    vCells = vc;
    mColor = color(255, 255, 255);
    grid = new boolean[hCells * vCells];
    initGrid();
    convertSpacing();
  }
  Grid(byte p, int hc, int vc, color c){
    sPos = p;
    hCells = hc;
    vCells = vc;
    mColor = c;
    grid = new boolean[hCells * vCells];
    initGrid();
    convertSpacing();
  }
/** FUNCTIONS ************************************************************/
  void drawGrid(){ // draw grid
    pushMatrix();
    stroke(mColor);
    strokeWeight(sWeight);
    scale(1./nDisplays, 1.);
    for(int i = hCells-1; i > -1; i--){
      float x = i*width/hCells; 
      for(int j = vCells-1; j > -1; j--){
        float y = j*height/vCells;
        if(grid[ i*vCells + (vCells-1-j) ]) {
          fill(mColor);
        }
        else fill(0);
        rect(x+hSpacing, y+vSpacing, width/hCells - hSpacing*2., height/vCells - vSpacing*2.);
      }
    }
    popMatrix();
  }
  
  void updateMousePosition(){
    // UPDATE KK
    //if(mouseX < width/nDisplays){
    if(mouseX > width/6*(sPos-1) && mouseX < width/6*sPos){  
      // mouseX to kk_gridX
      mPos[0] = int(mouseX / (width/nDisplays/hCells));
      mPos[1] = int((height - mouseY) / (height/vCells));
      grid[mPos[0]*vCells+mPos[1]] = !grid[mPos[0]*vCells+mPos[1]];
    }
  }
  
/** INIT & SETUP **********************************************************/
  private void initGrid(){ // initialize grid array
    for(int i = 0; i < hCells*vCells; i++){
      grid[i] = false;
    }
  }
  
  private void convertSpacing(){
    // convert spacing percentage to pixels 
    hSpacing = width /100. * spacing;
    vSpacing = height /100. * spacing;
  }
};