// Define the canvas we will be working with
var myCanvas = document.getElementById("myCanvas");

// log the console
console.log(myCanvas);

// 2d -- make sure it's lowercase!
var myCanvasContext = myCanvas.getContext("2d");

// Canvas width & height
myCanvas.width = 640;
myCanvas.height = 480;

// Frames per second
var framesPerSecond = 60;

// Game loop
setInterval(function() {
	update();
	draw();
}, 1000/framesPerSecond); // 1 second

// update
var update = function() {
	
	if (38 in keysDown) { // Player holding up
		if (player.y - player.radius == 0) { // If player hits top boundary
			player.y = player.radius; // Stop moving higher
		}
		
		else { // Else, move up
			player.y -= player.speed;
		}
	}
	
	if (40 in keysDown) { // Player holding down
		if (player.y + player.radius == myCanvas.height) { // If player hits bottom boundary
			player.y = myCanvas.height - player.radius; // Stop moving lower
		}
		
		else { // Else, move down
			player.y += player.speed;
		}
	}
	
	if (37 in keysDown) { // Player holding left
		if (player.x - player.radius == 0) { // If player hits left boundary
			player.x = player.radius; // Stop moving left
		}
		
		else { // Else, move left
			player.x -= player.speed;
		}
	}
	
	if (39 in keysDown) { // Player holding right
		if (player.x + player.radius == myCanvas.width) { // If player hits right boundary
			player.x = myCanvas.width - player.radius; // Stop moving right
		}
		
		else { // Else, move right
			player.x += player.speed;
		}
	}
	
	// Collision - if the player's edge touches the enemy's edge on any side
	if ( player.x <= (enemy.x + player.radius) // if player's X is near enemy's X
		&& enemy.x <= (player.x + player.radius) // and if enemy X is touched by player's edge
        && player.y <= (enemy.y + player.radius) // and if player's Y is near enemy's Y
        && enemy.y <= (player.y + player.radius) // and if enemy's Y is within range of player's edge
	) {
		
		// Move the enemy to a random location
		enemy.x = Math.floor( ( Math.random() * myCanvas.width ) ) - 10;
		enemy.y = Math.floor( ( Math.random() * myCanvas.height ) ) - 10;
		enemiesCaught++; // Increase the score
		console.log("touching!"); // Console log to make sure it's touching
	}
};

// draw
var draw = function() {
	
	// Clear the canvas each update - we're not making a painting game
	myCanvasContext.clearRect(0,0,myCanvas.width,myCanvas.height);

	// Draw our background, player and enemy
	background.draw();
	player.draw();
	enemy.draw();
	
	// Draw the score
	score.draw();
};

// Set a background with an "object" -- a set of variables that can be used within a variable
var background = { // Use commas between object variables
	color: "#76f000", // Set a color! Remember to use quotes
	draw: function() {
		myCanvasContext.fillStyle = this.color; // The fill color for the background
		myCanvasContext.fillRect(0,0,myCanvas.width,myCanvas.height); // Fill the background
	}
}

// Main character object!! Yay!
var player = {
	color: "#ff9900",
	radius: 30, // Half the width and height of our circle
	x: 30, // X: horizontal location. The left edge of our player can't be past the edge of the canvas, so we move the circle right by our player's radius
	y: 30, // Y: vertical location.
	speed:10,
	draw: function() { 
		// When we access the draw function in relation to our main player, it will draw according to our specific settings
		myCanvasContext.fillStyle = this.color; // Define the circle's color
		myCanvasContext.beginPath(); // Begin the circle
		myCanvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		myCanvasContext.closePath(); // Finish the circle
		myCanvasContext.fill(); // Fill the circle with its color
	}
};

// Enemy object
var enemy = {
	color: "#ffffff",
	radius: 10,
	// The enemy should appear at random on the screen
	x: Math.floor( ( Math.random() * myCanvas.width ) - 10 ), // Round a random number between 0 and the circle edge
	y: Math.floor( ( Math.random() * myCanvas.height ) - 10), // random() creates a number between 0 and 1, so we have to multiply the value by our canvas' width/height
	draw: function() {
		//Make enemy circle
		myCanvasContext.beginPath();
		myCanvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		myCanvasContext.closePath();
		myCanvasContext.fillStyle = this.color;
		myCanvasContext.fill();
	}
};

// Initial number of enemies caught (for score)
var enemiesCaught = 0;

// The score object
var score = {
	color: "#000000", // Set a color! Remember to use quotes
	x: 16,
	y: 440,
	draw: function() {
		myCanvasContext.fillStyle = this.color;
	    myCanvasContext.font = "24px Helvetica";
	    myCanvasContext.textAlign = "left";
	    myCanvasContext.textBaseline = "top";
	    myCanvasContext.fillText("Enemies eaten: " + enemiesCaught, score.x, score.y);
	}
}

// Initial keysDown object -- no keys are down when the game starts
var keysDown = {};

addEventListener( "keydown", function (key) {
	keysDown[key.keyCode] = true;
}, false); // False at the end of the function tells it not to care about any information from the keypress besides the letter or symbol

addEventListener( "keyup", function (key) {
	delete keysDown[key.keyCode]; // Remove this key from the list of keys that are currently being pressed
}, false);
