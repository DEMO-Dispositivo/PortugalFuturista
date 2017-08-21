import controlP5.*;

ControlP5 cp5;

void setup(){
  size(1440,990);
  background(0);
  noStroke();
  
  cp5 = new ControlP5(this);
  
  cp5.addSlider("kick")
     .setPosition(30,100)
     .setRange(0,100)
     .setSize(width/2-100, 20)
     ;
}

void draw(){
  cp5.getController("kick").setValue(random(100));
}