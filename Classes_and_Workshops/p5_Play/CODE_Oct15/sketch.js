//Collisions 
//Collision between groups
//function called upon collision

var obstacles;
var iceCream;
var unicorn;
var obstaclesSprite;
var iceCreamSprite;
var unicornSprite;
var rainbowSprite;
var score = 0;
var rainbowCount = 0;
var Poo;
var time;
var beanLastSprite;
var beanStalk;
var beanCollider;

function preload() {
  unicornSprite = loadImage("images/unicorn.png")
  obstaclesSprite = loadImage("images/beanStalk_1.png")
  iceCreamSprite = loadImage("images/iceCream.png")
  rainbowSprite = loadImage("images/rainbowPoo.png")
  beanLastSprite = loadImage("images/bean_5.png")
}

function setup() {
  createCanvas(1000, 800);
  
  console.log(obstaclesSprite.height);

  //create the unicorn sprite
  unicorn = createSprite(800, 600);
  unicorn.scale = 0.1;
  unicorn.addImage(unicornSprite);

  //create 2 groups
  obstaclesGroup = new Group();
  iceCreamGroup = new Group();
  pooGroup = new Group();

  for (var i = 0; i < 6; i++) {
    var box = createSprite(random(0, width), random(0, height));
    box.scale = 0.2;
    box.addImage(obstaclesSprite);
    obstaclesGroup.add(box);
  }
}

function draw() {
  background(255, 255, 255);
  if (frameCount % 80 == Math.floor(random(30))) {
    var iceCream = createSprite(random(0, width), random(0, height));
    iceCream.scale = 0.3;
    iceCream.addImage(iceCreamSprite);
    iceCreamGroup.add(iceCream);
  }

  //if no arrow input set velocity to 0
  unicorn.velocity.x = (mouseX - unicorn.position.x);
  unicorn.velocity.y = (mouseY - unicorn.position.y);

  //unicorn collides against all the sprites in the group obstacles
  unicorn.collide(obstaclesGroup);
  
  // add each obstacle to a group, and then use the callback function
  // within the callback we can set the obstacle change when you shoot poo at it
  for (var i = 0; i < obstaclesGroup.length; i++) {
    var obstacles = obstaclesGroup[i];
    pooGroup.overlap(obstacles, obstacleGrow);  
  
  }

  // set callback fucntion when unicorn picks up ice cream
  unicorn.overlap(iceCreamGroup, collect);


  // picking up 5 ice creams gives you 1 rainbow poo
  if (score == 2) {
    rainbowCount += 1;
    score = 0;
  }

  // draw the scoreboard;
  scoreBoard();

  // make sure sprites are drawn
  drawSprites();
}

// when mouse is pressed, check if there is rainbow poo in store, if yes then allow a shot
function mousePressed() {
  if (rainbowCount >= 1) {
    var rainbow = createSprite(mouseX + unicorn.width / 2 + 20, mouseY, 20, 20);
    rainbow.addImage(rainbowSprite);
    pooGroup.add(rainbow);
    rainbow.scale = 0.25;
    rainbow.setSpeed(random(1, 3), random(3, 5));
    rainbowCount -= 1;

    // for (var i = 0; i < obstaclesGroup.length; i++) {
    //   var obstacles = obstaclesGroup[i];
    //   if (pooGroup.overlap(obstacles)) {
    //     obstacles.remove();
    //   }
    // }
  }
}

//the first parameter will be the sprite (individual or from a group) 
//calling the function
//the second parameter will be the sprite (individual or from a group)
//against which the overlap, collide, bounce, or displace is checked
function collect(collector, collected) {
  score += 1;
  collected.remove();
}

// function that sets an animation of a growing beanstalk
function obstacleGrow(collector, collected) {
  // first remove collider object
  collected.remove();
  collector.remove();
  
  // set a new animation sprite 
  // create the bean stalk animation obeject in the position of the item removed
  // as the bean sprite has a different centre position to the animation, this must be adjusted
  beanStalk = createSprite(collected.position.x, collected.position.y - ((beanLastSprite.height - obstaclesSprite.height) * 0.2 / 2));
  beanStalk.addAnimation("beanStalk", "images/bean_1.png", "images/bean_5.png");
  beanStalk.scale = 0.2
  beanStalk.animation.looping = false;
  // slowdown animation
  beanStalk.animation.frameDelay = 6;
  unicorn.collide(beanStalk);

}

// socreboard position
function scoreBoard() {
  rect(50, 65, 200, 45);
  fill(255);
  //scoreBoardCollider = createSprite(55, 70, 55, 70);
  textSize(15);
  fill(0);
  text("Collect 5 ice Creams to give you one Rainbow Poo", 60, 40);
  text("Press the mouse to shoot poo at obstacles", 60, 60);
  text("number of iceCreams " + score, 70, 80);
  text("number of rainbowPoo " + rainbowCount, 70, 100);
}