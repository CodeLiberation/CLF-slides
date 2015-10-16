//Collisions 
//Collision between groups
//function called upon collision

var iceCreamSprite;
var unicorn;
var iceCream;

// group that counts ice cream collected
var iceCreamCollected;
// group that counts ice creams spawned
var iceCreamGroup;
var iceCreamScore = 0;

function preload(){
 unicorn = loadImage("images/unicornPlaceholder.jpg")
 iceCream = loadImage("images/tools_saw.png")
}

function setup() {
  createCanvas(800,400);  
  
  //create a user controlled sprite
  unicornSprite = createSprite(width / 2, height / 2);
  unicornSprite.scale = 0.1;
  unicornSprite.addImage(unicorn);
  //asterisk.addAnimation("normal", "assets/asterisk_normal0001.png", "assets/asterisk_normal0003.png");
  
  //asterisk.addAnimation("stretch", "assets/asterisk_stretching0001.png", "assets/asterisk_stretching0008.png");
  
  //create 2 groups
  iceCreamGroup = new Group();
  iceCreamCollected = new Group();
  

  
 for (i = 0; i < 20; i++){
      iceCreamSprite = createSprite(random(width), random(height), 30, 30);
      iceCreamSprite.addImage(iceCream);
      iceCreamGroup.add(iceCreamSprite);
 }
}



function draw() {
  background(255,255,255);  
  
  //if no arrow input set velocity to 0
  unicornSprite.velocity.x = (mouseX-unicornSprite.position.x)/10;
  unicornSprite.velocity.y = (mouseY-unicornSprite.position.y)/10;

  //asterisk collides against all the sprites in the group obstacles
  //asterisk.collide(obstacles);
  
  //I can define a function to be called upon collision, overlap, displace or bounce
  //see collect() below
  unicornSprite.overlap(iceCreamGroup, collect)
  
  //if the animation is "stretch" and it reached its last frame
  // if(asterisk.getAnimationLabel() == "stretch" && asterisk.animation.getFrame() == asterisk.animation.getLastFrame())
  // {
  //   asterisk.changeAnimation("normal");
  // }
  
  drawSprites();
}

//the first parameter will be the sprite (individual or from a group) 
//calling the function
//the second parameter will be the sprite (individual or from a group)
//against which the overlap, collide, bounce, or displace is checked
function collect(collector, collected)
{
  //collector is another name for asterisk
  //show the animation
 // collector.changeAnimation("stretch");
  //collector.animation.rewind();
  //collected is the sprite in the group collectibles that triggered 
  //the event
  collected.remove();
}