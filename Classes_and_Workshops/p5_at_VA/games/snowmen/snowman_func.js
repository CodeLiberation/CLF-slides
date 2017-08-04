function draw() {
    clear()
    draw_snowman(100, 100)
    draw_snowman(300, 100)
    draw_snowman(500, 100)
}

function setup() {
  createCanvas(800,800);
  background(255);
}

/*Try writing a function that draws a snowman at a certain position:
* One larger circle for the body.
* One circle for the head.
* Two circular eyes.
* A triangle for the nose.
* A sideways ellipse for the mouth.

<pre><code data-trim>*/
function draw_snowman(x, y) {
	// Draw a snowman where the center of it's head is at (x, y).
    fill(255);
    ellipse(x, y, 50)
    ellipse(x, y+65,80)
    ellipse(x-5, y-5, 5)
    ellipse(x+5, y-5, 5)
    triangle(x-5, y+3, x, y, x+5, y+3)
    ellipse(x, y+10, 20, 10)
}