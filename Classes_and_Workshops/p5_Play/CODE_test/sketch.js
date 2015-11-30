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
var newGame;
var mySprites;
var gameOver;
var obstacles;
var beanAnim;
var beanAnimSprite;

function preload() {
  unicornSprite = loadImage("images/unicorn.png");
  obstaclesSprite = loadImage("images/beanStalk_1.png");
  iceCreamSprite = loadImage("images/iceCream.png");
  rainbowSprite = loadImage("images/rainbowPoo.jpg");
  beanLastSprite = loadImage("images/bean_5.png");
  InstructionsFont = loadFont("fonts/OstrichSans-Black.otf");
  beanAnim = loadAnimation("images/bean_1.png", "images/bean_5.png");
  
}

function setup() {
  createCanvas(1200, 750);
   
}

function draw() {
  
  background(255);
    //beanAnim.play();
    var poo = image(rainbowSprite, 100, 100);
    animation(beanAnim, 600, 300);
    beanAnim.looping = true;
    beanAnim.frameDelay = 10
    
  
  
    // make sure sprites are drawn
    drawSprites();
}

function mousePressed(){
  //newGame();
  gameOver = true;
  beanAnimSprite = createSprite(250, 250, 10, 10);
  beanAnimSprite.scale = 0.3;
  beanAnimSprite.addAnimation("beanStalk", beanAnim);
  beanAnimSprite.animation.looping = false;
  beanAnimSprite.animation.frameDelay = 10;
  
}


// function that sets an animation of a growing beanstalk
function obstacleGrow(collector, collected) {
  // first remove the obstacle object
  collected.remove();
  // collector is the poop
  collector.remove();

  // set a new animation sprite 
  // create the bean stalk animation obeject in the position of the item removed
  // as the bean sprite has a different centre position to the animation this must be adjusted
  // beanLastSprite object is just used to calculate the height of the animation sprite
  beanStalk = createSprite(collected.position.x, 
  collected.position.y - ((beanLastSprite.height - obstaclesSprite.height) * 0.2 / 2));
  beanStalk.addAnimation("beanStalk", "images/bean_1.png", "images/bean_5.png");
  // puts beam stalk on the lowest drawing hierarchy
  beanStalk.depth = 0;
  beanStalk.scale = 0.2
  beanStalk.animation.looping = false;
  // slowdown animation
  beanStalk.animation.frameDelay = 6;
  // if(beanStalk.getFrame() == beanStalk.getLastFrame()){
  // beanStalk.setCollider("circle", 0,0, 100);
  // }
  unicorn.collide(beanStalk);
}

function newGame(){
  // background(255, 255, 150);
  // mySprites.remove();
  // gameOver = false;
 
  // updateSprites(true);
}

function scoreBoard() {
  // drawing the board background
  strokeWeight(3);
  stroke(90);
  fill(230);
  rect(20, 20, 145, 75);

  // drawing the text
  fill(90);
  noStroke();
  textSize(20);
  text("Ice Cream", 35, 50);
  text("Magic Poop", 35, 80);
  text(score, 140, 50);
  text(rainbowCount, 140, 80);
}


function instructionScreen(){
  background(255, 255, 150);
  textSize(40);
  fill(150, 100, 200);
  textFont(InstructionsFont);
  text("Collect 3 ice Creams to get one Magic Poop", 250, height / 2 - 80);
  fill(250, 100, 200);
  text("Press X to poop and make bean stalks grow", 242, height / 2 - 40);
}