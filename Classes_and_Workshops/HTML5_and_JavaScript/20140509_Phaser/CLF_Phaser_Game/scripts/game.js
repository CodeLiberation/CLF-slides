// New game + 
var game = new Phaser.Game(640, 480, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

// Global variables

// Player
var player;

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

var introText;
var gameStarted = false;


// Preload images
function preload() {

  game.load.image('sky', 'assets/sky.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('baddie', 'assets/baddie.png', 32 , 32);
}

// create the game game (draw)
function create() {
  game.add.sprite(0, 0, 'sky');

  player = game.add.sprite(32, game.world.height - 150, 'dude');
  player.animations.add('left', [0]);
  player.animations.add('down', [1]);
  player.animations.add('right', [2]);
  player.animations.add('up', [3]);
  
  // Give player the ability to move and collide with objects
  game.physics.enable(player, Phaser.Physics.ARCADE);
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
  
  // Text -- score
  scoreText = game.add.text(32, 24, scoreString + score);
  scoreText.visible = false;
  
  // Text -- HP
  hitPointsText = game.add.text(32, 64, hitPointsString + hitPoints);
  hitPointsText.visible = false;
  
  // Text -- intro text
  introText = game.add.text(50, 32, "Collect the Pigcats when they're weak!\nClick to start the game");
  
  // When right mouse button is clicked, start the game
  game.input.onDown.add(startGame, this);
  
}

// Update game so it can be redrawn
function update() {
  player.body.velocity.setTo(0, 0);
  if (gameStarted) {
    if (cursors.left.isDown) {
        //  Move left
        player.body.velocity.x = -150;
        player.animations.play('left');
    }

    else if (cursors.right.isDown) {
        //  Move right
        player.body.velocity.x = 150;
        player.animations.play('right');
    }

    if (cursors.up.isDown) {
        //  Move up
        player.body.velocity.y = -150;
        player.animations.play('up');
    }

    else if (cursors.down.isDown) {
        //  Move down
        player.body.velocity.y = 150;
        player.animations.play('down');
    }
  }

  // Animation to play for enemy states
  if (enemies.safe) {
      enemies.forEach(function(enemy) {
        enemy.animations.play('safe');
      });
  } else {
    enemies.forEach(function(enemy) {
      enemy.animations.play('unsafe');
    });
  }

  // Enable player-enemy collision
  game.physics.arcade.collide(player, enemies, collideWithEnemy);

  // Populate score & HP with updated text
  scoreText.setText(scoreString + score);
  hitPointsText.setText(hitPointsString + hitPoints);
}


// Create 10 enemies
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

  // Game over text
  introText.text = 'Game Over!\nClick to try again.';
  introText.visible = true;
  
  // Hide score and HP
  scoreText.visible = false;
  hitPointsText.visible = false;

  // Allow player to reset game
  game.input.onDown.add(startGame, this);
}

// Win state function
function winState() {
  // Stop timer
  game.time.events.stop();
    
  // Game over text
  introText.text = 'Great Job!\nClick to try again.';
  introText.visible = true;
  
  // Hide score and HP
  scoreText.visible = false;
  hitPointsText.visible = false;

  // Allow player to reset game
  game.input.onDown.add(startGame, this);
}

