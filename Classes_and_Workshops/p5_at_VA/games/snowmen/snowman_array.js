snowmen = []
function setup() {
  createCanvas(800,800);
  background(255);
  frameRate(60);
  for (var i = 1; i < 7; i++) {
    snowmen.push(new Snowman(i*100, 100))
  }
}

function draw() {
    clear()
    draw_snowmen(snowmen);
}

function draw_snowmen(sm) 
{
    for (var i = 0; i < sm.length; i++)
    {
        sm[i].draw()
    }
}

/*Try writing a function that draws a snowman at a certain position:
* One larger circle for the body.
* One circle for the head.
* Two circular eyes.
* A triangle for the nose.
* A sideways ellipse for the mouth.

<pre><code data-trim>*/
function Snowman(x, y) {
	// Draw a snowman where the center of it's head is at (x, y).
    this.x = x;
    this.y = y;
    this.draw = function() {
        fill(255);
        ellipse(this.x, this.y, 50)
        ellipse(this.x, this.y+65,80)
        ellipse(this.x-5, this.y-5, 5)
        ellipse(this.x+5, this.y-5, 5)
        triangle(this.x-5, this.y+3, this.x, this.y, this.x+5, this.y+3)
        ellipse(this.x, this.y+10, 20, 10)
    }
}