/*
Ball Drop Game
Author: Phoenix Perry
Code Liberation
Created: 22-07-17
*/


var gameState = "startScreen"; //this will change as we play the game
var isTouching = false; //checks if circles are touching
var score = 0;
var speed = 5;
var ui_color;
var ui_text_color;
var ui_accent_color;
var enemySize = 100; //size of emeny
enemy_y_pos = 0; //for keeping track of enemy locaiton

var playerSize = 100; //size of player

function setup() {
  //runs once when the program starts
  createCanvas(windowWidth,windowHeight);
  background(0);
  ui_color = color(255, 204, 0); //to initialize the colors you need to use a p5 method so it must be one in setup
  ui_text_color = color(255,255,255, 255);
  ui_accent_color = color(0,200,255);
  colorMode(RGB, 255); //sets the color mode to rgb
  enemy_x_pos = 0;
  enemy_x_pos = random(0+enemySize, width-enemySize); //create a ramdom x position to start the game with
  enemy_y_pos = enemy_y_pos - enemySize;

}
//this function makes a button with text. i made it up!
function createBtn(x, y, w, h, btn_text, text_color, btn_color, btn_accent)
{
  var over = false; //this just changes if the user is over the mouse
  if(mouseX > x && mouseX < x+w && mouseY > y && mouseY< y+h) //this logic test if the player is over the button
  {
    fill(btn_accent, 255);//if so, you can color it
    over = true;  // set the over var to true  b/c we're over the btn
  }else{
     fill(btn_color);
     over = false;
  }
//  console.log(over);
  //draw the btn
  rect(x,y,w,h, 10);
  fill(text_color);
  // add the text
  textSize(16);
  textAlign(CENTER, CENTER);
  text(btn_text,x,y,w,h);
  return over; //this uses this idea of returning a var out of a function
}

function draw() {
  //start the game here
  if(gameState==="startScreen")
  {
    //this saves if the user is over the btn or not
      var overBtn = createBtn(width/2-100,height/2-50, 200,100, "Play", ui_text_color,ui_color, ui_accent_color);

      if(overBtn && mouseIsPressed) //if the user is over the mouse and pressing the mouse btn
      {
        gameState="playGame"; //change the game stage
      //  console.log("play game");
      }

  }else if (gameState==="playGame") {
    background(0);
    //game code goes here:
    //draw player
    fill(ui_color, 255);
    ellipse(mouseX,mouseY,playerSize);

    //make enemey & move it
    enemy_y_pos += speed; // this is just like saying enemy_y_pos = enemy_y_pos + speed;

    //draw the ememy
    fill(ui_accent_color, 255);
    ellipse(enemy_x_pos,enemy_y_pos,enemySize);

    //redrop enemy if you are off screen
    if(enemy_y_pos > height)
    {
      enemy_y_pos = 0 - enemySize;
      enemy_x_pos = random(0+enemySize, width-enemySize); //move up above the screen
      ellipse(0-enemySize,0-enemySize,enemySize); //accomidate the size of the enemy so it's off screen.

      //there's a limit to how fast the game can go before it gets absurd
      if(speed < 50){
        speed+=1;
      }

    }
    //tell me how far apart the two circles is
    var  dist_between = dist(mouseX,mouseY,enemy_x_pos,enemy_y_pos);
    //if the distace between is less than the player radius you are touching circles
    if(dist_between < playerSize/2)
    {
      score++; //increase the score by one
      enemy_y_pos = 0 - enemySize; //reset the height of the of the enemy
      enemy_x_pos = random(0+enemySize, width-enemySize); //randomly change the drop location
    // ++++++ this ends the game once the enemy is 50 or less in size.
    // how could you make it so you get points by avoiding the circle falling and if you get hit you die?
      if(enemySize > 50){
        enemySize = enemySize-5;
      }else
        {
          gameState="end_game";
        }
    }
    //show score of the game
    fill(ui_text_color);
    textAlign(CENTER, CENTER);
    text("Your score is " + score, width/20, height/20, 200, 100);

  } else if(gameState === "end_game"){
    background(0);
    enemySize = 100; //reset the enemy size
    score = 0; // clear the score
    speed = 5; // reset the speed

    //make the replay button and save if the player is over it
    var overBtn = createBtn(width/2 - 100,height/2 - 50, 200,100, "Replay", ui_text_color,ui_color, ui_accent_color);


    if(overBtn && mouseIsPressed) //if you're over the button and pressing it down, restart the game.
    {
       gameState="playGame"; //this is what changes the state of the game to the play state
    }
    console.log(gameState);
  }

}


//**************** CHALLENGES
// 1.  Can you make it so the btn function returns true if the player is over the button and also clicking the mouse?
// 2. Can you make the game play starts with 10 points and you lose a point every single time you miss a catch and the game ends when you are out of points?
// 3. try making the game tuning have different dynamics. How do you make the game more fun or harder? What mechanics contribute to this?
// 4. Try and make the colors change every time the game plays
