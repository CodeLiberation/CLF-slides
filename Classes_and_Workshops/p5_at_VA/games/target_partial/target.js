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

    // IMPLEMENT ME! Add a new target every so often.

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
        x = 100; // IMPLEMENT ME! Make the values of x and y random.
        y = 100;
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
        // IMPLEMENT ME!
    }

    this.clicked = false; // This is "false" if the target has not been clicked yet, true otherwise.

    this.draw = function() {
        // Draws this target
        // IMPLEMENT ME!
    }
}