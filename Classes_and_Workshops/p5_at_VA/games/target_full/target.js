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
    clear();
    draw_targets();
    draw_score();
    add_new_targets();
    clear_old_targets();
    tick += 1;
}

function mousePressed() {
    processClickAt(mouseX, mouseY);
}

function draw_score()
{
    fill(0);
    text("Score: " + player_points, 600,600);
}

function processClickAt(x, y) 
{
    for (var i = 0; i < targets.length; i++)
    {
        var points = targets[i].points(x, y);
        if (points > 0 && targets[i].clicked == false) {
            player_points += points;
            targets[i].clicked = true;
            break;
        }
    }
}

function draw_targets()
{
    for (var i = 0; i < targets.length; i++)
    {
        targets[i].draw();
    }
}

function add_new_targets()
{
    if (tick % 60 == 0) {
        target = new Target(600 * random(), 600 * random());
        targets.push(target);
    }
}

function clear_old_targets()
{
    for (var i = targets.length - 1; i >= 0; i--)
    {
        if (targets[i].clicked)
        {
            targets.splice(i, 1);
        }
    }

    if (targets.length > 5) {
        targets.splice(0, targets.length-5)
    }
}

function Target(x, y) 
{
    this.x = x;
    this.y = y;
    this.distanceFrom = function(x, y) { 
        return sqrt((this.x - x) ** 2 + (this.y - y) ** 2)
    }
    this.points = function(x, y) {
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
        new Layer(10, 10),
        new Layer(18, 5),
        new Layer(30, 3)
    ]
    this.clicked = false;

    this.draw = function() {
        red = true;
        for (var i = this.layers.length - 1; i >= 0; i--)
        {
            if (red) { red = false; fill(255, 0, 0);} else { red = true; fill(255, 255, 255);}
            ellipse(this.x, this.y, this.layers[i].size*2)
        }
    }
    console.log(this);
}

function Layer(size, points) {
    this.size = size;
    this.points = points;
}