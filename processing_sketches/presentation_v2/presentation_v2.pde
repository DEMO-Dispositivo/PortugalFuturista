Grid kick = new Grid(1);
Target bass = new Target(2);
Grid snare = new Grid(3);
Bars sinewaves = new Bars(4);

void setup(){
  size(640, 480);
  //fullScreen();
  background(0);
  
  // set appearance
  kick.sWeight = 2;
  bass.sWeight = 1;
  snare.sWeight = 2;
  sinewaves.spacing = 0.25; 
} 

void draw(){
  background(0);
  kick.drawUI();
  bass.drawUI();
  snare.drawUI();
  sinewaves.drawUI();
}

void mouseReleased(){
  bass.fingerOn = false;
  //gl_isOn = false;
}

void mouseDragged(){
  //kick.updateMousePosition();
  //snare.updateMousePosition();
  
  if(mouseX>width/6 && mouseX<width/6*2){
    bass.fingerOn = true; 
    bass.mPos[0] = mouseX;
    bass.mPos[1] = mouseY;
    //println(bass.mPos[0] + " "+ bass.mPos[1]);
  }
  
  sinewaves.updateUI(mouseX, mouseY);
}

void mousePressed(){
  //kick.updateMousePosition();
  //snare.updateMousePosition();
  //gl_isOn = true;
  
}