/* Bouncy Game */

float ball_x, ball_y, ball_speed_x, ball_speed_y;
float ball_diameter;

int score;
float total_time;
float time_left;

PImage ball;
PImage background;

PFont info_font;

void setup() {
  size(1000, 1000);
  
  ball = loadImage("comet.png");
  background = loadImage("background.png");
  ball_diameter = ball.width;
  
  info_font = loadFont("KarmaticArcade-48.vlw");
  
  ball_x = random(width);
  ball_y = random(height);
  ball_speed_x = random(-10, 10);
  ball_speed_y = random(-10, 10);
   
  score = 0;
  
  total_time = 30000;
}


void draw() {
  time_left = total_time - millis();
  
  imageMode(CORNER);
  image(background, 0, 0);
  
  if (time_left > 0) {
    ball_x += ball_speed_x;
    ball_y += ball_speed_y;
    
    if (ball_x < 0 + (ball_diameter/2) || ball_x > width - (ball_diameter/2)) {
       ball_speed_x*= -1; 
    }
    
    if (ball_y < 0 + (ball_diameter/2) || ball_y > height- (ball_diameter/2)) {
       ball_speed_y*= -1; 
    }
   
    imageMode(CENTER);
    image(ball, ball_x, ball_y, ball_diameter, ball_diameter);
    
    textFont(info_font, 48);
    textAlign(CORNER);
    text("Score: " + score, 20, 50);
    textAlign(CENTER);
    text(int(time_left/1000), width/2, 50);
  } else {
    textFont(info_font, 48);
    textAlign(CENTER);
    text("You scored " + score + "!", width/2, height/2);
  }
  
}

void mousePressed() {
  if (time_left > 0) {
     if (dist(ball_x, ball_y, mouseX, mouseY) < ball_diameter/2) {
       
       if (ball_diameter > 10) {
         ball_diameter--;
       }
       
       score++;
       
        ball_x = random(width);
        ball_y = random(height);
        ball_speed_x = random(-10, 10);
        ball_speed_y = random(-10, 10);
     } else {
       score--; 
     }
  }
}
