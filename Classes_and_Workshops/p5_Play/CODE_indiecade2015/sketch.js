var iceCreamSprite;

var iceCreamGroup;

// function preload(){
  
// }

function setup() {
  createCanvas(600, 600);
  background(100, 255, 100);
  
  // create all the arrays
  iceCreamGroup = new Group();
  
}

function draw() {
  // randomly generate ice cream cones on screen
  spawnIceCream();
  
  for (i = 0; i < iceCreamGroup.length; i ++) {
    var iceCream = iceCreamGroup[i];
  }
  
  textSize(25);
  text(iceCreamGroup.length, 200, 300);
  
  // move around to pick up ice cream by walking over it
  
  
  // once picked up 5 cones, press button / click mouse to shoot rainbow
  
  
  // make something grow when rainbow hits?
  
  
  // scoreboard for ice cream cone stored
  
  
  // scoreboard for number of rainbows to shoot
  
  drawSprites();
  
}

function spawnIceCream() {
  for(i = 0; i < 10; i += random(10)){
  if(frameCount % 100 == 30 + i ) {
    iceCreamSprite = createSprite(random(width), random(height), 30, 30);
    iceCreamSprite.addToGroup(iceCreamGroup);
    }
  }
}