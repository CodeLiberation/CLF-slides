/*
    target_full: example edition
    Written by Charlie Ann Page
    For the Code Liberation Foundation.
*/

targets = []
player_points = 0;
tick = 0;
function setup() {
  createCanvas(800,800);
  background(0);
  targets = [];
  player_points = 0;
  tick = 0;
  frameRate(60);
  textSize(20);
}

function draw() {
    clear(); // Clear the screen
    draw_targets(); // Draw the targets
    draw_score(); // Draw the score
    add_new_targets(); // Add a new target (if it's the right time.)
    clear_old_targets(); // Clear targets that were clicked or if there are too many.
    tick += 1;
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
    if (tick % 60 == 0) {
        // A new target spawns every second in a random location.
        target = new Target(600 * random(), 600 * random());
        targets.push(target);
    }
}

function clear_old_targets()
{
    for (var i = targets.length - 1; i >= 0; i--)
    {
        // If a target has been clicked on, it's removed from the array.
        if (targets[i].clicked)
        {
            targets.splice(i, 1);
        }
    }

    // If there are more than 5 targets, delete the oldest until there is only 5.
    if (targets.length > 5) {
        targets.splice(0, targets.length-5)
    }
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
        distance = this.distanceFrom(x, y);
        for (var i = 0; i < this.layers.length; i++)
        {
            if (this.layers[i].size > distance)
            {
                return this.layers[i].points
            }
        }
        return 0;
    }

    this.layers = [
        // The layers of the bullseye. This time they're set, but they could be variable later.
        new Layer(10, 10),
        new Layer(18, 5),
        new Layer(30, 3)
    ]
    this.clicked = false; // whether or not the target has been clicked.

    this.draw = function() {
        // Draws the target.
        red = true;
        for (var i = this.layers.length - 1; i >= 0; i--) // (Need to draw them in reverse to draw the big circles first.)
        {
            // Alternates drawing white and red filled circles.
            if (red) { red = false; fill(255, 0, 0);} else { red = true; fill(255, 255, 255);}
            ellipse(this.x, this.y, this.layers[i].size*2)
        }
    }
}

function Layer(size, points) {
    this.size = size; // The size of the layer.
    this.points = points; // The number of points for the layer.
}