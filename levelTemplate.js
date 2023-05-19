class Level extends Phaser.Scene {
    constructor(name) {
        super(name);
        this.name = name;
    }

    preload() {
        this.load.image('heart', 'assets/heart.png');
        this.load.image('icicle', 'assets/icicle.png');
        this.load.image('npc_happy', 'assets/npc_happy.png');
        this.load.image('npc_sad', 'assets/npc_sad.png');
        this.load.image('shards', 'assets/shards.png');
        this.load.image('stalactite_shock', 'assets/stalactite_shock.png');
        this.load.image('stalactite_steve', 'assets/stalactite_steve.png');
    }

    create() {
        //set up camera, background color
        const x = this.cameras.main.centerX;
        const y = this.cameras.main.centerY;
        this.cameras.main.setBackgroundColor('#8DDCDF');

        //create player
        let steve = this.physics.add.sprite(100,100,'stalactite_steve');
        steve.setCollideWorldBounds(true);

        //create icicles
        icicles = this.physics.add.group();

        //create the npcs
        npc1 = this.add.sprite(100, 300, 'npc_happy');
        npc2 = this.add.sprite(200, 300, 'npc_happy');
        npc3 = this.add.sprite(300, 300, 'npc_happy');
        npc4 = this.add.sprite(400, 300, 'npc_happy');
        npc5 = this.add.sprite(500, 300, 'npc_happy');
        npc6 = this.add.sprite(600, 300, 'npc_happy');

    }

}