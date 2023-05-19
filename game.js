//Scenes defined up here
//When I start reusing code I will move things to prefabs.js and levelTemplate.js

class TitleScreen extends Phaser.Scene {};

class Intro extends Phaser.Scene {};

class Level1 extends Level {
    constructor() {
        super('Level1', 3);
    }
    //Note: do not put anything else here, it will override the level template
};

class Summary extends Phaser.Scene {};
//I can reuse the summary for multiple levels by passing variables
//into the constructor

class Level2 extends Level {

};

class Level3 extends Level {

};

class Ending extends Phaser.Scene {};

// Create Phaser game
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [Level1]
  };

let game = new Phaser.Game(config);