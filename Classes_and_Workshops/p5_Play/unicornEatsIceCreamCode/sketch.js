var obstacles, iceCream, unicorn, rainbow, time;
var obstaclesSprite, iceCreamSprite, unicornSprite, rainbowSprite;
var score = 0;
var rainbowCount = 0;
var beanLastSprite, beanStalk, beanCollider, obstacles;
var newGame;
var mySprites;
var gameStarts;
var stalkScore = 0; // game score
var shootRight;

function preload() {
  unicornSprite = loadImage("images/unicorn.png");
  obstaclesSprite = loadImage("images/beanStalk_1.png");
  iceCreamSprite = loadImage("images/iceCream.png");
  rainbowSprite = loadImage("images/rainbowPoo.png");
  beanLastSprite = loadImage("images/bean_5.png");
  instructionsFont = loadFont("fonts/OstrichSans-Black.otf");
  startFont = loadFont("fonts/OstrichSansInline-Italic.otf");
  bgImage = loadImage("images/grass.png");
  beanAnim = loadAnimation("images/bean_1.png", "images/bean_5.png");
  pooSound = loadSound("sounds/royal-sparkle-whoosh.mp3");
}

function setup() {
  createCanvas(1200, 675);

  //create the unicorn sprite
  unicorn = createSprite(width / 2, height / 2);
  unicorn.scale = 0.09;
  unicorn.addImage(unicornSprite);

  //create 2 groups
  obstaclesGroup = new Group();
  iceCreamGroup = new Group();
  pooGroup = new Group();
  beanStalkGroup = new Group();

  // create beanStalk animation groups
  for (var i = 0; i < 3; i++) {
    // keep sprites within bounds of the screen
    var box = createSprite(random(200, width * 0.7), random(150, height * 0.7));
    box.scale = 0.2;
    box.addImage(obstaclesSprite);
    box.setCollider("circle", 0, 0, 200);
    obstaclesGroup.add(box);

  }
}

function draw() {

  for (i = 0; i < allSprites.length; i++) {
    mySprites = allSprites[i]
  }

  instructionScreen();

  if (gameStarts) {
    //background(255, 255, 150);
    image(bgImage, 0, 0);

    //set icecream sprites to generate randomly within 30 framecounts 
    // and if winning score hasn't been reached
    if (frameCount % 80 == Math.floor(random(30)) && stalkScore < 3) {
      var iceCream = createSprite(random(100, width * 0.8), random(100, height * 0.8));
      iceCream.scale = 0.3;
      iceCream.addImage(iceCreamSprite);
      iceCreamGroup.add(iceCream);
      iceCream.life = 200;
    }

    // move unicorn sprite using mouse input
    // if no arrow input set velocity to 0
    // unicorn.velocity.x = (mouseX - unicorn.position.x) / 8;
    // unicorn.velocity.y = (mouseY - unicorn.position.y) / 8;

    // unicorn movement using the keyboard
    if (keyDown(LEFT_ARROW) || unicorn.position.x + 70 >= 1200){
      unicorn.position.x -= 10;
      // changes the direction that the sprite faces
      unicorn.mirrorX(1);
      // constant to be used later when shooting poo
      shootRight = 1; 
    }

    if (keyDown(RIGHT_ARROW) || unicorn.position.x - 70 <= 0){
      unicorn.position.x += 10;
      unicorn.mirrorX(-1);
      shootRight = -1;
    }
      
    if (keyDown(UP_ARROW) || unicorn.position.y + 70 >= 675) {
      unicorn.position.y -= 10;
    }

    if (keyDown(DOWN_ARROW) || unicorn.position.y - 70 <= 0) {
      unicorn.position.y += 10;
    }

    //make sure ice creams don't get placed where beans and beanstalks are
    unicorn.collide(obstaclesGroup);
    if (iceCreamGroup.collide(obstaclesGroup) || iceCreamGroup.collide(beanStalkGroup)) {
      iceCreamGroup.remove();
    }

    for (var i = 0; i < beanStalkGroup.length; i++) {
      beans = beanStalkGroup[i];
      unicorn.collide(beans);
    }

    // picking up 3 ice creams gives you 1 rainbow poo, score resets to 0
    if (score == 3) {
      rainbowCount += 1;
      score = 0;
    }

    // the x key is the action key
    if (keyWentDown("x") && rainbowCount >= 1) {
      shootPoo();
      pooSound.volume = 0.3;
      pooSound.play();
      }

    // add each obstacle to a group, and then use the callback function
    // within the callback we can set the obstacle change when you shoot poo at it
    for (var j = 0; j < obstaclesGroup.length; j++) {
      obstacles = obstaclesGroup[j];
      pooGroup.overlap(obstacles, obstacleGrow);
    }

    if (stalkScore == 3) {
      background(255, 255, 150);
      mySprites.remove();
      textFont(instructionsFont);
      textSize(30);
      text("Hooray! Unicorn has climbed up the bean stalks", width / 2 - 250, height / 2);
    }
    // set callback fucntion when unicorn picks up ice cream
    unicorn.overlap(iceCreamGroup, collect);

    // draw the scoreboard;
    scoreBoard();

    // make sure sprites are drawn
    drawSprites();
  }
}

// when mouse is pressed, check if there is rainbow poo in store, if yes then allow a shot
function shootPoo() {
  if (rainbowCount >= 1) {
    rainbow = createSprite(unicorn.position.x + shootRight * (unicorn.width / 2 + 20), unicorn.position.y, 20, 20);
    rainbow.addImage(rainbowSprite);
    pooGroup.add(rainbow);
    rainbow.scale = 0.25;
    rainbow.setSpeed(shootRight * 2, shootRight * random(3, 5));
    // everytime you shoot, you lose one in your ammo
    rainbowCount -= 1;
  }
}

// score for ice creams collected
// the first parameter will be the sprite (individual or from a group) calling the function
// the second parameter will be the sprite (individual or from a group)
// against which the overlap, collide, bounce, or displace is checked
function collect(collector, collected) {
  score += 1;
  collected.remove();
}

// function that sets an animation of a growing beanstalk
function obstacleGrow(collector, collected) {
  // first remove the obstacle object
  collected.remove();
  // collector is the poop
  collector.remove();

  // set a new animation sprite 
  // create the bean stalk animation object in the position of the item removed
  // as the bean sprite has a different centre position to the animation this must be adjusted
  // beanLastSprite object is just used to calculate the height of the animation sprite
  beanStalk = createSprite(collected.position.x,
    collected.position.y - ((beanLastSprite.height - obstaclesSprite.height) * 0.2 / 2));

  beanStalk.addAnimation("beanStalker", beanAnim);

  // puts beam stalk on the lowest drawing hierarchy
  //beanStalk.depth = 0;
  beanStalk.scale = 0.2
  if (beanStalk.animation.playing === true) {
    beanStalk.animation.looping = false;
  }

  // slowdown animation
  beanStalk.animation.frameDelay = 6;

  // add the beanStalk sprite to a group so we can apply collisions


  stalkScore++;
  beanStalkGroup.add(beanStalk);
  console.log(stalkScore);
}

function scoreBoard() {
  // drawing the board background
  textFont(instructionsFont);
  strokeWeight(3);
  stroke(90);
  fill(230);
  rect(20, 20, 145, 75);

  // drawing the text
  fill(90);
  noStroke();
  textSize(20);
  // text and score can be in same text function, but separated to match alignment
  text("Ice Cream", 35, 50);
  text(score, 140, 50);
  text("Magic Poop", 35, 80);
  text(rainbowCount, 140, 80);
}

function mousePressed() {
  //newGame();
  gameStarts = true;

}

function instructionScreen() {
  background(255, 255, 150);
  textSize(40);
  fill(150, 100, 200);
  textFont(instructionsFont);
  text("Collect 3 Ice Creams to get one Magic Poop", 250, height / 2 - 20);
  fill(250, 100, 200);
  text("Press x to poop and make bean stalks grow", 242, height / 2 + 20);
  fill(50, 100, 220);
  textFont(startFont);
  textSize(35);
  text("Click mouse to START", 430, height / 2 + 120);
}