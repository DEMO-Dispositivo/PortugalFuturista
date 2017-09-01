import controlP5.*;
import oscP5.*;
import netP5.*;

ControlP5 cp5;
OscP5 oscP5;
NetAddress myRemoteLocation;
int inport = 8989;

String slidersnames[] = {"Kick", "Clicks", "Noise Rise", "Glitchy Noise", "Bass", "Drone", "Sine Beats", "Melody"};
int size[] = new int[2];
int xstart = 30; 
int ystart = 100;
int yseparation = 50; 

void setup(){
  //size(1280, 800);
  fullScreen(2);
  background(0);
  noStroke();
  
  size[0] = width/2-100; // slider width 
  size[1] = 20; // slider height
  
  oscP5 = new OscP5(this,inport);
  
  cp5 = new ControlP5(this);
  // Add Sliders
  for(int i = 0; i < slidersnames.length; i++){
    cp5.addSlider(slidersnames[i])
     .setPosition(xstart,ystart + yseparation*i)
     .setRange(0,100)
     .setSize(size[0], size[1])
     ;
  }
}

void draw(){
  
}

/* incoming osc message are forwarded to the oscEvent method. */
void oscEvent(OscMessage theOscMessage) {
  /* print the address pattern and the typetag of the received OscMessage */
  print("### received an osc message.");
  print(" addrpattern: "+theOscMessage.addrPattern());
  println(" typetag: "+theOscMessage.typetag());
  
  switch(theOscMessage.addrPattern()){
    case "/hello": // -> test message
      println("HELLO - OSC connection well established!");
      break;
    
    case "/kick": 
      cp5.getController("Kick").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/clicks": 
      cp5.getController("Clicks").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/noiserise": 
      cp5.getController("Noise Rise").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/glitchynoise": 
      cp5.getController("Glitchy Noise").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/bass": 
      cp5.getController("Bass").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/drone": 
      cp5.getController("Drone").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/sinebeats": 
      cp5.getController("Sine Beats").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/melody": 
      cp5.getController("Melody").setValue(theOscMessage.get(0).floatValue());
      break;
    
    default:
      println("OSC error: wrong address");
    break;
  }
}