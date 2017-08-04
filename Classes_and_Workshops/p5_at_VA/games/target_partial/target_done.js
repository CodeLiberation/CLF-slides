/*
    target_partial: worksheet edition
    Written by Charlie Ann Page
    For the Code Liberation Foundation.
*/

targets = []
player_points = 0;
tick = 0;
function setup() {
  // Some boring configuration
  createCanvas(800,800);
  background(0);
  targets = [];
  player_points = 0;
  tick = 0;
  frameRate(60); // 60fps
  textSize(20);

  // Adds three targets to start
  add_new_targets();
  add_new_targets();
  add_new_targets();
}

function draw() {
    clear(); // Clear the screen
    draw_targets(); // Draw the targets
    draw_score(); // Draw the score

   if (random() < (1/60)) {
       add_new_targets();
   }
    tick += 1; // Each frame we'll increment this "tick" counter by one. We might be able to use this...
}

function mousePressed() {
    // When the mouse is pressed, call processClickAt with (mouseX, mouseY).
    processClickAt(mouseX, mouseY);
}

function draw_score()
{
    // Draws the player's score to the screen
    fill(0);
    text("Score: " + player_points, 600,600);
}

function processClickAt(x, y) 
{
    // Process a mouse click at (x, y)
    for (var i = 0; i < targets.length; i++)
    {
        var points = targets[i].points(x, y);
        // Checks how many points a click is worth to a given target.
        // If it's over 0, that target is used and the points added.
        if (points > 0 && targets[i].clicked == false) {
            player_points += points;
            targets[i].clicked = true;
            break;
        }
    }
}

function draw_targets()
{   
    // Draws every target.
    for (var i = 0; i < targets.length; i++)
    {
        targets[i].draw();
    }
}

function add_new_targets()
{
        // Adds a new target at a random location
        x = random() * 800;
        y = random() * 800;
        target = new Target(x, y);
        targets.push(target);
}

function Target(x, y) 
{
    // This defines a Target class.
    this.x = x; // x coordinate of the target
    this.y = y; // y coordinate of the target

    this.distanceFrom = function(x, y) { 
        // This function returns the distance from a point (x, y) to the target's center.
        return sqrt((this.x - x) ** 2 + (this.y - y) ** 2)
    }


    this.points = function(x, y) {
        // Using the distance from a point (x, y) - calculate how many points that click is worth.
        distance = this.distanceFrom(x,y);
        if (distance < 10) { // We drew the inner ring as a circle with width 20 - which means the radius is 10.
            return 10; // 10 points in the inner ring.
        } else if (distance < 25) { 
            return 5; // 5 points for the middle ring.
        } else if (distance < 40) {
            return 3; // 3 points for the outer ring.
        } else {
            return 0; // No points for anything else.
        }
    }

    this.clicked = false; // This is "false" if the target has not been clicked yet, true otherwise.

    this.draw = function() {
        if (this.clicked) { return; } // Honestly I'm being a bit cheeky here because this isn't in the extension exercise.
        // The above just hides the target if it's been clicked.
        
        // Draws this target
        fill(255, 0, 0); // Red
        ellipse(this.x, this.y, 80);
        fill(255, 255, 255); // White
        ellipse(this.x, this.y, 50);
        fill(255, 0, 0); // Red
        ellipse(this.x, this.y, 20);
    }
}