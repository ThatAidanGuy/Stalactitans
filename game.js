//Scenes defined up here
//Non-level scenes will have a lot of stuff here,
//but level scenes will just extend the levelTemplate object,
//and the differences are passed into it as arguments.

const game = new Phaser.game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 1920
    },
    scene: [],
    powerPerformance: "high-performance",
    title: "Stalactitans",
    physics: {
        default: "arcade",
        arcade: {
            //this is a line to activate debug mode in development
            debug: true
        }
    }
})