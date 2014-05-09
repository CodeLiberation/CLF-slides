float faller_x;
float faller_y;
float faller_speed;
float faller_diameter;

int score;

String game_state;

void setup() {
 size(300, 800);
 
 score = 0;
 
 faller_x = random(width);
 faller_y = 0;
 faller_speed = 5;
 faller_diameter = 40;
 
 game_state = "start";
}

void draw() {
  if (game_state == "start") {
    background(255, 255, 255);
    fill(0, 0, 0);
    textAlign(CENTER);
    text("Click to start!", width/2, height/2);
    
    if (mousePressed == true) {
     game_state = "game"; 
    }
    
  }
  
  if (game_state == "game") {
    background(255, 255, 255);
    text(score, width/2, 10);
  
    faller_y = faller_y + faller_speed;
    ellipse(faller_x, faller_y, faller_diameter, faller_diameter);
  
    if (faller_y > height) {
     faller_x = random(width);
     faller_y = 0; 
     faller_speed = faller_speed + 1;
     faller_diameter = faller_diameter + 1;
     // score = score + 1;
     // score += 1;
     score++;
    }
   
    if (dist(mouseX, mouseY, faller_x, faller_y) < faller_diameter/2) {
      game_state = "end";
    }
  }
  
  if (game_state == "end") {
    background(255, 255, 255);
    text("GAME OVER, FRIENDO!\nYour score was " + score + "!", width/2, height/2);
  }

}
