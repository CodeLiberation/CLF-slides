/* --- GAME OBJECT --- */
// Declare myGame, the object that contains our game's states
var myGame = {
  //Define our game states
  Preload: function(game) {},
  MainMenu: function(game) {},
  GamePlay1: function(game) {},
  GamePlay2: function(game) {},
  WinState: function(game) {},
  LoseState: function(game) {}
};


/* --- GOOGLE WEBFONT OBJECT --- */
//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    google: {
      families: ['Press+Start+2P']
    }

};


/* --- SETUP FUNCTIONS --- */

// Title text on main menu, win & lose states
myGame.showTitleText = function(y, text) {
  var titleText = game.add.text(game.world.centerX, y, text);

  titleText.font = 'Press Start 2P';
  titleText.fill = '#ffffff';
  titleText.align = 'center';
  titleText.fontSize = 30;
  titleText.anchor.setTo(0.5);
  titleText.wordWrap = true;
  titleText.lineSpacing = 5;
  titleText.wordWrapWidth = 600;
}

// Note text on main menu, win & lose states
myGame.showNoteText = function(y, text) {
  var noteText = game.add.text(game.world.centerX, y, text);

  noteText.font = 'Press Start 2P';
  noteText.fill = '#ffffff';
  noteText.align = 'center';
  noteText.fontSize = 18;
  noteText.anchor.setTo(0.5);
  noteText.wordWrap = true;
  noteText.lineSpacing = 5;
  noteText.wordWrapWidth = 500;
}

// Set up each stage with the player and dialog windows
myGame.setupStage = function() {
  myGame.sounds = {};
  myGame.sounds.button = game.add.audio('button');
  myGame.sounds.pen = game.add.audio('pen');
  myGame.sounds.meow = game.add.audio('meow');
  myGame.sounds.dice = game.add.audio('dice');
  
  //Physics & gravity
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 800;
  
  //Player
  myGame.player = game.add.sprite( 32, 256, 'player', 0);
  
  //Player Animations
  myGame.player.leftStandingAnim = myGame.player.animations.add("standing-left", [5]);
  myGame.player.rightStandingAnim = myGame.player.animations.add("standing-right", [0]);
  myGame.player.leftWalkingAnim = myGame.player.animations.add("walk-left", [6,7,6,5,8,9,8,5]);
  myGame.player.rightWalkingAnim = myGame.player.animations.add("walk-right", [1,2,1,0,3,4,3,0]);
  myGame.player.leftJumpingAnim = myGame.player.animations.add("jump-left", [10]);
  myGame.player.rightJumpingAnim = myGame.player.animations.add("jump-right", [11]);
  
  //Player's physics
  game.physics.enable(myGame.player, Phaser.Physics.ARCADE);
  myGame.player.body.collideWorldBounds = true;
  
  // dialog window
  myGame.dialogWindow = game.add.sprite( game.camera.x, game.world.height - 131, 'dialogWindow');
  myGame.dialogWindow.visible = false;
  
  //Dialogtext
  myGame.dialogText = game.add.text(game.camera.x + 16, 362, '');
  myGame.dialogText.font = 'Press Start 2P';
  myGame.dialogText.fontSize = 12;
  myGame.dialogText.wordWrap = true;
  myGame.dialogText.wordWrapWidth = 620;
  myGame.dialogText.visible = false;
  myGame.dialogText.lineSpacing = 5;
  
  //Create cursor keys
  myGame.cursors = game.input.keyboard.createCursorKeys();
  myGame.cursors.up.onDown.add(myGame.playerJump, myGame.player);
  
  //Enter key
  myGame.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  myGame.enterKey.onDown.add(myGame.hideDialog, game);
  
  //Spacebar key
  myGame.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  
 //Camera follows player
  game.camera.follow(myGame.player);
}

// Setup tiles
myGame.setupTiles = function() {  
  //Add tileset image to game
  myGame.map.addTilesetImage('tileset');
  
  //Tile map layers
  myGame.BG = myGame.map.createLayer('BG');
  myGame.Floor = myGame.map.createLayer('Floor');
  
  //Resize tile map layers to screen
  myGame.Floor.resizeWorld();
  
  //Using more than one tile layer? You have to specify the one to collide with
  myGame.map.setCollisionBetween(0, 3, true, 'Floor');
  myGame.map.setCollision(26, false, 'BG');
}

/* --- UPDATE FUNCTIONS --- */

myGame.monitorCollision = function() {
  game.physics.arcade.collide(myGame.player, myGame.Floor);
  game.physics.arcade.collide(myGame.player, myGame.BG);
}

myGame.monitorMovement = function() {
  myGame.player.body.velocity.x = 0;
  
  // If movement is not being ignored
  if (!myGame.ignoreMovement) {
    
    // Left movement, right morement
    if (myGame.cursors.left.isDown) {
      
      // Speed left
      myGame.player.body.velocity.x = -150;
      
      if (myGame.player.body.onFloor()) {
        // Walking animation
        myGame.player.animations.play("walk-left", 10, true);
      } else {
        // Jumping animation
        myGame.player.animations.play("jump-left", 1, true);
      }
    
    } else if (myGame.cursors.right.isDown) {
      
      // Speed right
      myGame.player.body.velocity.x = 150;
    
      if (myGame.player.body.onFloor()) {
        
        // Walking animation
        myGame.player.animations.play("walk-right", 10, true);
      } else {
        
        // Jumping animation
        myGame.player.animations.play("jump-right", 1, true);
      }
    }
  }
  
  // On up callback
  game.input.keyboard.onUpCallback = function(event) {
    
    //If player is on floor
    if (myGame.player.body.onFloor()) {        
      if (event.keyCode == myGame.cursors.left.keyCode) {
        //Play standing animation
        myGame.player.animations.play("standing-left", 1, true);
        
      } else if (event.keyCode == myGame.cursors.right.keyCode) {
        
        //Play standing animation
        myGame.player.animations.play("standing-right", 1, true);
      }
    }
  };

  // Turn off jumping animation when player is not jumping
  if (myGame.player.leftJumpingAnim.isPlaying && myGame.player.body.velocity.y == 0) {
    myGame.player.animations.play("standing-left", 1, true);
  
  } else if (myGame.player.rightJumpingAnim.isPlaying && myGame.player.body.velocity.y == 0)  {
    myGame.player.animations.play("standing-right", 1, true);
  }
}

// Player jump
myGame.playerJump = function() {
  if (myGame.player.body.onFloor()) {
      myGame.player.body.velocity.y = -300;
      
      if (!myGame.jumpingTextShown) {
        myGame.showDialog("Jumping is something I like to do a lot. Yay, yay, yay, yay, yay!");
        myGame.jumpingTextShown = true;
      }

      if (myGame.player.leftStandingAnim.isPlaying || myGame.player.leftWalkingAnim.isPlaying) {
        myGame.player.animations.play("jump-left", 1, true);
      } else if (myGame.player.rightStandingAnim.isPlaying || myGame.player.rightWalkingAnim.isPlaying) {
        myGame.player.animations.play("jump-right", 1, true);
      }
  }
}

// Check overlap
myGame.checkOverlap = function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}


/* --- DIALOGS --- */

// Trigger dialog
myGame.showDialog = function(text) {
  myGame.ignoreMovement = true;
  
  myGame.dialogWindow.x = game.camera.x;
  myGame.dialogWindow.visible = true;
  
  myGame.dialogText.x = game.camera.x + 16;
  myGame.dialogText.setText(text);
  myGame.dialogText.visible = true;
}

// Hide dialog
myGame.hideDialog = function() {
  myGame.ignoreMovement = false;

  myGame.dialogWindow.visible = false;
  myGame.dialogText.visible = false;
  myGame.dialogText.setText('');
}