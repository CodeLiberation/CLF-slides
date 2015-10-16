//Collisions 
//Collision between groups
//function called upon collision

var obstacles;
var iceCream;
var unicorn;
var obstaclesSprite;
var iceCreamSprite;
var unicornSprite;
var score = 0;

function preload(){
  unicornSprite = loadImage("images/unicornPlaceholder.jpg")
  obstaclesSprite = loadImage("images/LED_digit_1.png")
  iceCreamSprite = loadImage("images/tools_saw.png")
}

function setup() {
  createCanvas(800,600);  
  
  //create the unicorn sprite
  unicorn = createSprite(800, 600);
  unicorn.scale = 0.1;
  unicorn.addImage(unicornSprite);
  //unicorn.addAnimation("normal", "assets/unicorn_normal0001.png", "assets/unicorn_normal0003.png");
  
  //unicorn.addAnimation("stretch", "assets/unicorn_stretching0001.png", "assets/unicorn_stretching0008.png");
  
  //create 2 groups
  obstacles = new Group();
  iceCream = new Group();
  
  for(var i=0; i<4; i++)
    {
    var box = createSprite(random(0, width), random(0,height));
    box.scale = 0.5;
    box.addImage(obstaclesSprite);
    obstacles.add(box);
    }
}

function draw() {
  background(255,255,255);  
    if (frameCount % 80 == Math.floor(random(30)))
    {
    var dot = createSprite(random(0, width), random(0,height));
    dot.scale = 0.3;
    dot.addImage(iceCreamSprite);
    iceCream.add(dot);
    }
  
  //if no arrow input set velocity to 0
  unicorn.velocity.x = (mouseX-unicorn.position.x);
  unicorn.velocity.y = (mouseY-unicorn.position.y);

  //unicorn collides against all the sprites in the group obstacles
  unicorn.collide(obstacles);
  
  //I can define a function to be called upon collision, overlap, displace or bounce
  //see collect() below
  unicorn.overlap(iceCream, collect)
  
  //if the animation is "stretch" and it reached its last frame
  // if(unicorn.getAnimationLabel() == "stretch" && unicorn.animation.getFrame() == unicorn.animation.getLastFrame())
  // {
  //   unicorn.changeAnimation("normal");
  // }
  

  rect(50, 50, 50, 50)
  textSize(25);
  fill(0);
  text(score, 80, 80);
  //text(iceCreamScore, 80, 100);
    if (score > 2) {
    if (mouseDown() == 1){
    //console.log(score);
    fill(40);
    var rainbow = createSprite(mouseX + unicorn.width/2 + 20, mouseY , 20, 20);
    rainbow.setSpeed(random(1,3), random(0,5));
   
    }
  }
  
  drawSprites();
}

//the first parameter will be the sprite (individual or from a group) 
//calling the function
//the second parameter will be the sprite (individual or from a group)
//against which the overlap, collide, bounce, or displace is checked
function collect(collector, collected)
{
  score += 1;
  //collector is another name for unicorn
  //show the animation
 // collector.changeAnimation("stretch");
  //collector.animation.rewind();
  //collected is the sprite in the group iceCream that triggered 
  //the event
  collected.remove();
}