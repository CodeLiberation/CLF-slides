myGame.GamePlay1.prototype = {
  preload: function() {
    // Objects have been preloaded at beginning of game in 'Preload' state
  },

  create: function() {
    //Background color
    this.stage.backgroundColor = "#c2eafe";
    
    //The sun
    myGame.sun = this.add.sprite( 100, 50, 'objects', 6);
    
    //Add tile map to game
    myGame.map = game.add.tilemap('map1');
    myGame.setupTiles();
  
    //Run function when tile collides
    myGame.map.setTileIndexCallback(26, this.completeStage, this, myGame.BG);
    
    //Objects
    myGame.object_diary = this.add.sprite( 200, 250, 'objects', 0);
    myGame.object_diary.collidedWith = false;
   
    myGame.object_comic = this.add.sprite( 620, 200, 'objects', 1);
    myGame.object_comic.collidedWith = false;
    
    myGame.object_cat = this.add.sprite( 950, 288, 'objects', 2);
    myGame.object_cat.animations.add("walk", [4,5]);
    myGame.object_cat.collidedWith = false;
    myGame.object_cat.checkWorldBounds = true;
    myGame.object_cat.outOfBoundsKill = true;
        
    myGame.setupStage();
  },

  update: function() {
    myGame.monitorCollision();
    myGame.monitorMovement();
    
    //Move the sun with the camera
    myGame.sun.x = this.camera.x + 100;
    
    //Diary dialog
    if (myGame.checkOverlap(myGame.player, myGame.object_diary) && !myGame.object_diary.collidedWith) {      
      if (myGame.enterKey.isDown) {
        myGame.object_diary.collidedWith = true;
        myGame.sounds.button.play();
        myGame.object_diary.kill();
        myGame.showDialog('This is my old diary. I used to write in it every day as a teenager. It helped keep me sane as I transformed into an adult.');
      }
    }
    
    //Comic dialog
    if (myGame.checkOverlap(myGame.player, myGame.object_comic) && !myGame.object_comic.collidedWith) {      
      if (myGame.enterKey.isDown) {
        myGame.object_comic.collidedWith = true;
        myGame.sounds.pen.play();
        myGame.object_comic.kill();
        myGame.showDialog('As a kid, I loved reading comics because they were beautiful and full of words. I started reading manga as a teenager and spent a lot of time drawing my own comics.');
      }
    }
    
    //Cat dialog
    if (myGame.checkOverlap(myGame.player, myGame.object_cat) && !myGame.object_cat.collidedWith) {      
      if (myGame.enterKey.isDown) {
        myGame.object_cat.collidedWith = true;
        myGame.sounds.meow.play();
        myGame.showDialog('I\'ve had many cats. Cats have a great sense of balance when it comes to interaction with others -- they remind me that alone time is important.');
      }
    }
    
    if (myGame.object_cat.collidedWith == true) {
      myGame.object_cat.animations.play("walk", 20, true);
      myGame.object_cat.x += 8;
    }
  },
  completeStage: function() {
    if (myGame.enterKey.isDown) {
      this.state.start('GamePlay2');  
    }  
  }
}