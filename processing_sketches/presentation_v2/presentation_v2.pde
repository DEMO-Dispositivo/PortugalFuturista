import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;
int inport = 8989;

// User Interfaces
Grid kick, snare, hithat;
Target bass;
Bars sinewaves;
Glitch glitch;

int kickstep = 0, snarestep = 0, hhstep = 0; 
boolean blackout = false;

void setup(){
  // screen
  size(640, 480);
  //fullScreen();
  background(0);
  
  // init OSC
  oscP5 = new OscP5(this,inport);
  
  // UI constructors should be instatiated after size() 
  kick = new Grid(1);
  bass = new Target(2);
  snare = new Grid(3);
  sinewaves = new Bars(4);
  hithat = new Grid(5);
  glitch = new Glitch(6);
  
  // Colors
  kick.stepColor = color(255, 0, 0);
  snare.stepColor = color(0, 255, 0);
  hithat.stepColor = color(0, 0, 255);

  // set UI appearance
  kick.sWeight = 2;
  bass.sWeight = 1;
  snare.sWeight = 2;
  sinewaves.spacing = 0.25;
  hithat.sWeight = 2;
} 

void draw(){
  background(0);
  kick.drawUI(kickstep);
  bass.drawUI();
  snare.drawUI(snarestep);
  sinewaves.drawUI();
  hithat.drawUI(hhstep);
  glitch.drawUI();
  if(blackout) background(0);
}

/* incoming osc message are forwarded to the oscEvent method. */
void oscEvent(OscMessage theOscMessage) {
  /* print the address pattern and the typetag of the received OscMessage 
  print("### received an osc message.");
  print(" addrpattern: "+theOscMessage.addrPattern());
  println(" typetag: "+theOscMessage.typetag());
  */
  
  switch(theOscMessage.addrPattern()){
    case "/hello": // -> test message
      println("HELLO - OSC connection well established!");
      break;
    
    case "/kick": 
      parseBlob2Grid(theOscMessage, kick);
      break;
    
    case "/bass":
      bass.updateUI(theOscMessage.get(0).intValue(), theOscMessage.get(1).floatValue(), theOscMessage.get(2).floatValue());
      break;
    
    case "/snare": 
      parseBlob2Grid(theOscMessage, snare);
      break;
    
    case "/sinewaves": 
      parseBlob2Bars(theOscMessage, sinewaves);
      break;
    
    case "/hithat": 
      parseBlob2Grid(theOscMessage, hithat);
      break;
    
    case "/glitch": 
      glitch.updateUI(theOscMessage.get(0).intValue(), theOscMessage.get(1).floatValue(), theOscMessage.get(2).floatValue());
      break;
    
    case "/kickstep":
      kickstep = theOscMessage.get(0).intValue() -1;
    break; 
    case "/snarestep":
      snarestep = theOscMessage.get(0).intValue() -1;
    break; 
    case "/hhstep":
      hhstep = theOscMessage.get(0).intValue() -1;
    break; 
    
    case "/blackout":
      if(theOscMessage.get(0).intValue() > 0){
        blackout = true; 
      }
      else blackout = false;
    break; 
        
    default:
      println("OSC error: wrong address");
    break;
  }
}

void parseBlob2Grid(OscMessage m, Grid g){
  for(int i = 0; i < g.grid.length; i++){
    g.grid[i] = boolean(m.get(i).intValue());
  }
}

void parseBlob2Bars(OscMessage m, Bars b){
  for(int i = 0; i < b.bars.length; i++){
    b.bars[i] = m.get(i).floatValue();
  }
}