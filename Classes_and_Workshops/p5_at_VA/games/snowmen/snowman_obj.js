  sm1 = new Snowman(100, 100);
  sm2 = new Snowman(300, 100);
  sm3 = new Snowman(500, 100);
function setup() {
  createCanvas(800,800);
  background(255);
  frameRate(60);
}

function draw() {
    clear()
    sm1.draw()
    sm2.draw()
    sm3.draw()
    sm3.y += 1;
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