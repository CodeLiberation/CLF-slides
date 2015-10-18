var iceCreamSprite;
var unicorn;

// group that counts ice cream collected
var iceCreamCollected;
// group that counts ice creams spawned
var iceCreamGroup;
var iceCreamScore = 0;

function preload() {
  unicorn = loadImage("images/unicornPlaceholder.jpg")
}

function setup() {
  createCanvas(600, 600);

  // create all the arrays
  iceCreamGroup = new Group();
  iceCreamCollected = new Group();

  // load image here
  unicornSprite = createSprite(width / 2, height / 2);
  unicornSprite.scale = 0.1;
  unicornSprite.addImage(unicorn);
  
  // keeping count of ice creams spawned
  // for (i = 0; i < iceCreamGroup.length; i++) {
  //   var iceCream = iceCreamGroup[i];
  // }
  spawnIceCream();
}

function draw() {
  background(100, 255, 100);
  // randomly generate ice cream cones on screen
  
  // if (frameCount % 50 == Math.floor(random(30))){
  // spawnIceCream();
  // }
  // move around to pick up ice cream by walking over it
  unicornSprite.velocity.x = mouseX - unicornSprite.position.x;
  unicornSprite.velocity.y = mouseY - unicornSprite.position.y;
  unicornSprite.overlap(iceCreamGroup, collect);
  // if (unicornSprite.overlap(iceCreamGroup) == false){
  //   unicornSprite.    //collect(unicornSprite, iceCreamGroup)
  //   iceCreamScore += 1;
  //   iceCreamSprite.remove();
  //}

  // for (i = 0; i < iceCreamCollected.length; i++) {
  //   var iceCreamScore = iceCreamCollected[i];
  // }
  


  // once picked up 5 cones, press button / click mouse to shoot rainbow




  // unicornSprite.position.x = mouseX;
  // unicornSprite.position.y = mouseY;

  // make something grow when rainbow hits?


  // scoreboard for ice cream cone stored
  rect(50, 50, 50, 50)
  textSize(25);
  fill(0);
  text(iceCreamGroup.length, 80, 80);
  text(iceCreamScore, 80, 100);
  
  //unicorn.debug = mouseIsPressed;
  //iceCream.debug = mouseIsPressed;

  // scoreboard for number of rainbows to shoot
  drawSprites();
  

}

function spawnIceCream() {
  for (i = 0; i < 20; i++)
      iceCreamSprite = createSprite(random(width), random(height), 30, 30);
      iceCreamGroup.add(iceCreamSprite);
}

function collect(collector, collected) {
    //iceCreamScore += 1;
    // add some sort of animation change of the unicorn
    //iceCreamSprite.addToGroup(iceCreamCollected);
    collected.remove();
    // if(iceCreamScore > 5 && mouseIsPressed == 1) {
    //   rect(40, 40, 40, 40);
    // }
//}
  
}