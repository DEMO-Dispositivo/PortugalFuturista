import controlP5.*;
import oscP5.*;
import netP5.*;

ControlP5 cp5;
OscP5 oscP5;
NetAddress myRemoteLocation;
int inport = 8989;

String slidersnames[] = {"/kick", "/clicks", "/noiserise", "/glitchynoise", "/hithats", "/bass", "/sinebeats"};
int size[] = new int[2];
int xstart = 30; 
int ystart = 100;
int yseparation = 80; 

void setup(){
  //size(1280, 800);
  fullScreen(2);
  background(0);
  noStroke();
  
  size[0] = width-200; // slider width 
  size[1] = 40; // slider height
  
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
  //background(0);
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
      cp5.getController("/kick").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/clicks": 
      cp5.getController("/clicks").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/noiserise": 
      cp5.getController("/noiserise").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/glitchynoise": 
      cp5.getController("/glitchynoise").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/bass": 
      cp5.getController("/bass").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/drone": 
      cp5.getController("/drone").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/sinebeats": 
      cp5.getController("/sinebeats").setValue(theOscMessage.get(0).floatValue());
      break;
    case "/hithats": 
      cp5.getController("/hithats").setValue(theOscMessage.get(0).floatValue());
      break;
    
    default:
      println("OSC error: wrong address");
    break;
  }
}