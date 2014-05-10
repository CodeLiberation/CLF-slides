// New game: width, height
var game = new Phaser.Game(640, 480, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

// Player
var player;
var cursors;

// Preload images
function preload() {
  game.load.image('sky', 'assets/sky.png');
  game.load.spritesheet('player', 'assets/dude.png', 32, 48);
  game.load.spritesheet('pigcat', 'assets/baddie.png', 32, 32);
}

// Create the game & draw things in their initial location
function create() {
  // Background
  game.add.sprite(0,0, 'sky');
  
  // Player art!
  player = game.add.sprite(32, 200, 'player');
  
  game.physics.enable(player, Phaser.Physics.ARCADE);
  
  player.animations.add('left', [0]);
  player.animations.add('right', [2]);
  player.animations.add('up', [3]);
  player.animations.add('down', [1]);
  
  player.body.collideWorldBounds = true;
  
  // Keyboard keys!
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  // Left, right, no moving x
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
  
  // Up, down, no moving y
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
  
  
}