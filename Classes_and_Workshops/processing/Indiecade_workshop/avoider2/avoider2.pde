float falling_thing_x, falling_thing_y;
float falling_thing_speed;
float falling_thing_radius;
float falling_thing_period;

float player_x;
float player_y;
float player_radius;

int score;

String game_state;

PImage titlescreen;
PImage endscreen;
PImage candy;
PImage bear;
PImage bg;


void setup() {
  falling_thing_radius = 80;
  falling_thing_x = random(0, width);
  falling_thing_y = 0;
  falling_thing_speed = 5;
  falling_thing_period = 200;
  
  player_radius = 70;
  
  score = 0;
  
  game_state = "start";
  
  size(300, 800);
  
  titlescreen = loadImage("titlescreen.png");
  endscreen = loadImage("endscreen.png");
  candy = loadImage("candy.png");
  bear = loadImage("bear.png");
  bg = loadImage("bg.png");
}

void draw() {
  background(255);
  
  if (game_state == "start") {
    image(titlescreen, 0, 0);
    
    if (mousePressed) {
     game_state = "game"; 
    }
 
  }
  
  if (game_state == "game") {
    player_x = mouseX;
    player_y = mouseY;
    falling_thing_y = falling_thing_y + falling_thing_speed;
    image(bg, 0, 0);
    image(candy, falling_thing_x - candy.width/2, falling_thing_y - candy.height/2, falling_thing_radius, falling_thing_radius);
    image(bear, player_x - bear.width/2, player_y - bear.height/2, player_radius, player_radius);
    
    fill(0);
    text("Score: " + score, 10, 20);
    
    if (falling_thing_y > height + falling_thing_radius) {
     falling_thing_radius++;
     
     if (falling_thing_speed < 23) {
       falling_thing_speed*=1.25; 
     }
     
     falling_thing_y = 0 - falling_thing_radius;
     falling_thing_x = random(width);
     score++;
    }
    
    if (dist(player_x, player_y, falling_thing_x, falling_thing_y) < (falling_thing_radius + player_radius)/2) {
     game_state = "end"; 
    }
  }
  
  if (game_state == "end") {
    image(endscreen, 0, 0);
    String end_text = "Your final score:\n" + score + " candies dodged!";
    textAlign(CENTER);
    fill(0);
    text(end_text, width/2, height/2);
  }
  
}
