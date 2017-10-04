Grid kick = new Grid(1);

void setup(){
  size(640, 480);
  //fullScreen();
  background(0);
  
} 

void draw(){
  background(0);
  kick.drawGrid();
}

void mouseReleased(){
  //bb_fingerOn = false;
  //gl_isOn = false;
}

void mouseDragged(){
  kick.updateMousePosition();
}

void mousePressed(){
  kick.updateMousePosition();
  //gl_isOn = true;
}