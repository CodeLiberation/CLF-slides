myGame.GamePlay2.prototype = {
  preload: function() {
    // Objects have been preloaded at beginning of game in 'Preload' state
  },

  create: function() {
    //Background color
    this.stage.backgroundColor = "#c2eafe";
    
    //The sun
    myGame.sun = this.add.sprite( 100, 50, 'objects', 6);
    
    //Add tile map to game
    myGame.map = game.add.tilemap('map2');
    myGame.setupTiles();
  
    //Run function when tile collides
    myGame.map.setTileIndexCallback(26, this.completeStage, this, myGame.BG);
    
    //Objects
    myGame.object_games = this.add.sprite( 340, 288, 'objects', 3);
    myGame.object_games.collidedWith = false;
    
    myGame.setupStage();
  },

  update: function() {
    myGame.monitorCollision();
    myGame.monitorMovement();
    
    //Games dialog
    if (myGame.checkOverlap(myGame.player, myGame.object_games) && !myGame.object_games.collidedWith) {      
      if (myGame.enterKey.isDown) {
        myGame.object_games.collidedWith = true;
        myGame.sounds.dice.play();
        myGame.object_games.kill();
        myGame.showDialog('My parents and I often played board games when I was young. As I got older, I continued playing games. We didn\'t have a lot of money, so I often had to save for months in order to buy the games I wanted. Games taught me patience, strategy, and the value of time and money.');
      }
    }
  },
  completeStage: function() {
    if (myGame.enterKey.isDown) {
      if (myGame.jumpingTextShown && myGame.object_diary.collidedWith && myGame.object_comic.collidedWith && myGame.object_cat.collidedWith && myGame.object_games.collidedWith) {
        this.state.start('WinState');  
      } else {
        this.state.start('LoseState');  
      }
    }  
  }
}