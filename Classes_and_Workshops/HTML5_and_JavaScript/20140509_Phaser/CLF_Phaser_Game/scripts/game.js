// New game + 
var game = new Phaser.Game(640, 480, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

/*---- GLOBAL VARIABLES ----*/

// Player
var player;

// Cursors
var cursors;

// Enemies
var enemies;

// HP
var hitPoints;
var hitPointsString = 'HP: ';
var hitPointsText;

// score
var score;
var scoreString = 'Score: ';
var scoreText;

// Intro text
var introText;

// Game Started boolean
var gameStarted = false;

/*---- PRELOAD IMAGES ----*/
function preload() {
  game.load.image('sky', 'assets/sky.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('baddie', 'assets/baddie.png', 32 , 32);
}

// create the game game (draw)
function create() {
  // Background
  game.add.sprite(0, 0, 'sky');

  // Player art!
  player = game.add.sprite(32, game.world.height - 150, 'dude');
  player.animations.add('left', [0]);
  player.animations.add('down', [1]);
  player.animations.add('right', [2]);
  player.animations.add('up', [3]);
  
  // Give player the ability to move and collide with objects
  game.physics.enable(player, Phaser.Physics.ARCADE);
  
  // Collide with edges
  player.body.collideWorldBounds = true;
  
  // Keyboard input
  cursors = game.input.keyboard.createCursorKeys();
  
  //  The enemies group
  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;
  
  // Safe variable
  enemies.safe = false;
  
  // Function to create enemies
  
  // Text -- hide the score, but set it up so it can be updated
  scoreText = game.add.text(32, 24, '');
  scoreText.visible = false;
  
  // Text -- hide the HP, but set it up so it can be updated
  hitPointsText = game.add.text(32, 64, '');
  hitPointsText.visible = false;
  
  // Text -- show intro text on load
  introText = game.add.text(50, 32, "Collect the Pigcats when they're weak!\nClick to start the game");
  
  // When right mouse button is clicked, start the game
  game.input.onDown.add(startGame, this);
  
}

// Update game so it can be redrawn
function update() {
  if (gameStarted) {
    // Left, right, don't move on the x plane when neither is pressed
    if (cursors.left.isDown) {
      // If left is pressed, move -150 x
      player.body.velocity.x = -150;
      player.animations.play('left');
    
    } else if (cursors.right.isDown) {
      // If right is pressed, move 150 x
      player.body.velocity.x = 150;
      player.animations.play('right');
    
    } else {
      player.body.velocity.x = 0;
    }
  
    // Up, down, don't move on the y plane when neither is pressed
    if (cursors.up.isDown) {
      // If up is pressed, move -150 y
      player.body.velocity.y = -150;
      player.animations.play('up');
    
    } else if (cursors.down.isDown) {
      // If down is pressed, move 150 y
      player.body.velocity.y = 150;
      player.animations.play('down');
    } else {
      player.body.velocity.y = 0;
    }
  
    // Animation to play for enemy states
    if (enemies.safe) {
      // For each enemy, play a safe animation
        enemies.forEach(function(enemy) {
        enemy.animations.play('safe');
      });
    } else {
      // For each enemy, play an unsafe animation
        enemies.forEach(function(enemy) {
        enemy.animations.play('unsafe');
      });
    }
  }

  // Enable player-enemy collision
  game.physics.arcade.collide(player, enemies, collideWithEnemy);

  // Populate score & HP with updated text
  scoreText.setText(scoreString + score);
  hitPointsText.setText(hitPointsString + hitPoints);
}

/*---- FUNCTIONS ----*/

// Create 10 enemies. We'll reference this function a few times (start, win, lose)
function createEnemies() {
  // Do this 10 times
  for (var i = 0; i < 10; i++) {
    var enemy = enemies.create((Math.random() * game.world.width), ((Math.random() * game.world.height) - 32), 'baddie');
    
    // Enemy doesn't move
    enemy.body.moves = false;
    
    // If enemy spawns out of x bounds, move it in
    if (enemy.x > (game.world.width - 32)) {
      enemy.x = game.world.width - 48;
    } else if (enemy.x < 32) {
      enemy.x = 48;
    }

    // If enemy spawns out of y bounds, move it in
    if (enemy.y > (game.world.height - 32)) {
      enemy.y = game.world.height - 48;
    } else if (enemy.y < 32) {
      enemy.y = 48;
    }
  }
  
  // Add safe & unsafe animations to each enemy
  enemies.forEach(function(enemy) {
    enemy.animations.add('safe', [1]);
    enemy.animations.add('unsafe', [0]);
  });
}

// Function to toggle safe vs dangerous
function switchEnemyState() {
  if ( enemies.safe == false ) {
    enemies.safe = true;
  } else {
    enemies.safe = false;
  }
}

// Define the function for colliding with the enemy
function collideWithEnemy(player, enemy) {
  // Remove HP or increase points depending on enemy state
  if ( !enemies.safe ) {
    hitPoints--;
  } else {
    score++;
  }
  
  // Kill the enemy whether or not player gains a point
  enemy.destroy();
  
  // If HP is 0, lose; if HP is more than 0 and enemies are left, win!
  if ( hitPoints == 0 ) {
    gameStarted = false;
    loseState();
      
  } else if ( hitPoints > 0 && enemies.length == 0 ) {
    gameStarted = false;
    winState();
  }
}

// Define the function for starting the game
function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    hitPoints = 5;
    score = 0;
    
    // Hide intro
    introText.visible = false;
    
    // Show score and HP
    scoreText.visible = true;
    hitPointsText.visible = true;
    
    // Start switching enemy states
    game.time.events.start();
    game.time.events.loop(1000, switchEnemyState, this);
    
    // Create Enemies
    createEnemies();

  }
}

// Lose state function
function loseState() {
  // Stop timer
  game.time.events.stop();

  // Stop the player from moving
  player.body.velocity.setTo(0, 0);
  
  // Set & show game over text
  introText.text = 'Game Over!\nClick to try again.'; // The \n is a "newline"
  introText.visible = true;
  
  // Hide score and HP
  scoreText.visible = false;
  hitPointsText.visible = false;

  // Allow player to reset game by clicking down
  game.input.onDown.add(startGame, this);
}

// Win state function
function winState() {
  // Stop timer
  game.time.events.stop();

  // Stop the player from moving
  player.body.velocity.setTo(0, 0);
    
  // Set & show game over text
  introText.text = 'Great Job!\nClick to try again.'; // The \n is a "newline"
  introText.visible = true;
  
  // Hide score and HP
  scoreText.visible = false;
  hitPointsText.visible = false;

  // Allow player to reset game by clicking down
  game.input.onDown.add(startGame, this);
}

