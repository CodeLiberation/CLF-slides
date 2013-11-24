// Define the canvas we will be working with
var myCanvas = document.getElementById("myCanvas");

// Set the canvas' context to 2d -- we won't be making a 3d game
var myCanvasContext = myCanvas.getContext("2d");

// Set the canvas width and height -- it knows that this is in the context of pixels, so no need to add "px"
myCanvas.width = 640;
myCanvas.height = 480;

// The game loop - update and redraw the canvas 30 times in 1000ms (1 second)
var gameIsRunning = true;
setInterval( function() {
	// If the number of enemies is under 30, keep updating and drawing the game
	if (enemiesCaught < 30) {
		update();
		draw();
	}
	// Otherwise, stop and say you win!
	else {
		gameIsRunning = false;
		myCanvasContext.fillStyle = this.color;
		myCanvasContext.font = "24px Helvetica";
		myCanvasContext.textAlign = "left";
		myCanvasContext.fillText("You Win!", myCanvas.width/2, myCanvas.height/2);
	}
	
}, 1000/60 );

// This will update the location of the player and enemy, as well as the score
var update = function() {

	//Added after the key-pressing eventListeners below -- move the player
	if (38 in keysDown) { // If up is pressed
		player.y = player.y - player.speed;
	}
	
	if (40 in keysDown) { // If down is pressed
		player.y = player.y + player.speed;
	}
	
	if (37 in keysDown) { // If left is pressed
		player.x = player.x - player.speed;
	}
	
	if (39 in keysDown) { // If right is pressed
		player.x = player.x + player.speed;
	}
	
	// if the player's edge touches the enemy's edge on any side -- feel free to tinker with this and refine it
	if ( player.x <= (enemy.x + player.radius) // player's X is near enemy's X
		&& enemy.x <= (player.x + player.radius) // enemy X is touched by player's edge
		&& player.y <= (enemy.y + player.radius) // player's Y is near enemy's Y
		&& enemy.y <= (player.y + player.radius) // Enemy's Y is within range of player's edge
	 ) {
 		// Move the enemy to a random location
		 enemy.x = Math.floor( ( Math.random() * (myCanvas.width - 20) ) + 10 );
		 enemy.y = Math.floor( ( Math.random() * (myCanvas.height - 20) ) + 10 );
		 enemiesCaught++; // Increase the number of enemies caught/eaten by 1 each time
		 player.radius = player.radius + enemiesCaught; // Increase the player's radius by the number of enemies caught
	}
};

// This will draw our game once all the variables are updated
var draw = function() {
	// Draw our background, player and enemy
	myCanvasContext.fillStyle = "#CCCCCC"; // Set the canvas fill color
	myCanvasContext.fillRect(0,0, myCanvas.width, myCanvas.height);
	
	enemy.draw();
	player.draw();
	
	// Draw the score
	score.draw();
};

// The main player object
var player = {
	color: "#7766ff",
	radius: 30, // Half the width and height of our circle
	x: 30, // X: horizontal location. The left edge of our player can't be past the edge of the canvas, so we move the circle right by our player's radius
	y: 30, // Y: vertical location. The right edge of our player can't be past the edge of the canvas either
	speed: 10,
	draw: function() { // When we access the draw function in relation to our player, it will draw according to this function
		
		myCanvasContext.beginPath();// Start the circle!
		myCanvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false); // x pos, y pos, width (radius * 2), beginning angle, ending angle (circumference), anti-clockwise? NO!		
		myCanvasContext.closePath();// Finish the circle
		
		myCanvasContext.fillStyle = this.color; // The fill color for our player
		myCanvasContext.fill(); // Fill our player with the above color
	}
};

// The enemy object
var enemy = {
	color: "#FFFFFF",
	radius: 10,
	// Enemy appears at random
	x: Math.floor( Math.random() * myCanvas.width ), // Random rounded number between 0 and the circle edge
	y: Math.floor( Math.random() * myCanvas.height ),
	draw: function() {
		//Make enemy circle
		myCanvasContext.beginPath();
		myCanvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		myCanvasContext.closePath();
		myCanvasContext.fillStyle = this.color;
		myCanvasContext.fill();
	}
};

var enemiesCaught = 0; // Initial number of enemies caught

// The score object
var score = {
	color: "#000000",
	draw: function() {
		myCanvasContext.fillStyle = this.color;
		myCanvasContext.font = "24px Helvetica";
		myCanvasContext.textAlign = "left";
		myCanvasContext.fillText("Enemies eaten: " + enemiesCaught, score.x, score.y);
	}
};

score.x = 20;
score.y = myCanvas.height - 20;

var keysDown = {}; // List of pressed keys

addEventListener("keydown", function(key) {
	keysDown[key.keyCode] = true;
}); // If a key is pressed, add it to the keysDown list

addEventListener("keyup", function(key) {
	delete keysDown[key.keyCode];
}); // If the key is no longer being pressed, delete it from the list