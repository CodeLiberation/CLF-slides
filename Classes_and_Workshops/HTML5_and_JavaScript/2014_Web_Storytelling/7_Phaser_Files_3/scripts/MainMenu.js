myGame.MainMenu.prototype = {
  preload: function() {
    // Objects have been preloaded at beginning of game in 'Preload' state
  },

  create: function() {
    this.stage.backgroundColor = '#03826n';
    
    myGame.showTitleText(game.world.centerY/2, 'A Little About Me');
    
    myGame.startButton = this.add.button(this.world.centerX, 400, 'startButton', this.startGame, this, 1, 0, 2);
    myGame.startButton.anchor.setTo(0.5);
    
    myGame.showNoteText(250, '*Instructions* \n\n Arrow keys to move & jump \n Enter to interact with objects');
    
  },

  update: function() {
    
  },
  startGame: function() {
    this.state.start('GamePlay1');
  }
}

