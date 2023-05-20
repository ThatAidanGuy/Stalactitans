class Level extends Phaser.Scene {
    constructor(name, spawnTime) {
        super(name);
        this.name = name;
        this.spawnTime = spawnTime;
        //global variable container
        this.container = [];
        //specific for rotating variable, that just makes this easier
        this.rotatingContainer = [];
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
        //set up simple variables in advance
        let gameOver = false;
        let levelClear = false;
        let hearts = 3;
        let rotating = false;
        //set up camera, background color
        const x = this.cameras.main.centerX;
        const y = this.cameras.main.centerY;
        this.cameras.main.setBackgroundColor('#8DDCDF');

        //create player
        let steve = this.physics.add.sprite(400,100,'stalactite_steve');
        steve.setCollideWorldBounds(true);
        steve.setScale(0.2);

        //Move player left and right
        //Up and down movement will be scene-specific to Level 2 and 3
        this.input.keyboard.on("keydown", (event) => {
            switch (event.key) {
                case "a":
                    steve.setVelocityX(-250);
                    break;
                case "d":
                    steve.setVelocityX(250);
                    break;
            }
        })

        this.input.keyboard.on("keyup", (event) => {
            switch (event.key) {
                case "a":
                case "d":
                    steve.setVelocityX(0); //I'd like to edit this to make it feel better later if I have time
                    break;
            }
        })

        //Rotate when J and K are pressed
        this.input.keyboard.on("keydown", (event) => {
            switch (event.key) {
                case "j":
                    if (steve.angle == 0) {
                        rotating = true;
                        this.rotatingContainer.push(rotating);
                        let leftRotation = this.tweens.add({
                            targets: steve,
                            angle: steve.angle + 45,
                            duration: 250,
                            ease: 'Linear',
                            onComplete: function() {
                                this.tweens.add({
                                    targets: steve,
                                    angle: steve.angle - 45,
                                    duration: 500,
                                    ease: 'Linear'
                                });
                                rotating = false;
                                this.rotatingContainer.push(rotating);

                            },
                            callbackScope: this
                        });
                    }
                    break;

                case "k":
                    if (steve.angle == 0) {
                        rotating = true;
                        this.rotatingContainer.push(rotating);
                        let rightRotation = this.tweens.add({
                            targets: steve,
                            angle: steve.angle - 45,
                            duration: 250,
                            ease: 'Linear',
                            onComplete: function() {
                                this.tweens.add({
                                    targets: steve,
                                    angle: steve.angle + 45,
                                    duration: 500,
                                    ease: 'Linear'
                                });
                                rotating = false;
                                this.rotatingContainer.push(rotating);
                            },
                            callbackScope: this
                        });
                    }
                    break;

            }
        })

        //attach rotating variable to J and K tweens
        /*TweenOnUpdateCallback(leftRotation, rotating, () => {
            rotating = true;
        })*/

        //create icicles
        let icicles = this.physics.add.group();

        //create the npcs
        //top row
        let npc1 = this.add.sprite(100, 550, 'npc_happy');
        npc1.setScale(0.3);
        let npc2 = this.add.sprite(200, 550, 'npc_happy');
        npc2.setScale(0.3);
        let npc3 = this.add.sprite(300, 550, 'npc_happy');
        npc3.setScale(0.3);
        let npc4 = this.add.sprite(400, 550, 'npc_happy');
        npc4.setScale(0.3);
        let npc5 = this.add.sprite(500, 550, 'npc_happy');
        npc5.setScale(0.3);
        let npc6 = this.add.sprite(600, 550, 'npc_happy');
        npc6.setScale(0.3);
        let npc7 = this.add.sprite(700, 550, 'npc_happy');
        npc7.setScale(0.3);
        //bottom row
        let npc8 = this.add.sprite(150, 600, 'npc_happy');
        npc8.setScale(0.3);
        let npc9 = this.add.sprite(250, 600, 'npc_happy');
        npc9.setScale(0.3);
        let npc10 = this.add.sprite(350, 600, 'npc_happy');
        npc10.setScale(0.3);
        let npc11 = this.add.sprite(450, 600, 'npc_happy');
        npc11.setScale(0.3);
        let npc12 = this.add.sprite(550, 600, 'npc_happy');
        npc12.setScale(0.3);
        let npc13 = this.add.sprite(650, 600, 'npc_happy');
        npc13.setScale(0.3);

        //push relevant variables to global variable container
        this.container.push(icicles); //[0]
        this.container.push(steve); //[1];
        this.container.push(hearts); //[2];
        this.container.push(rotating); //[3];

        //create icicle spawn timer
        //but only run it every [spawnTime] seconds
        let icicleSpawnTimer = this.time.addEvent({
            delay: this.spawnTime * 1000,
            loop: true,
            callback: this.spawnIcicle, //this is its own function()
            callbackScope: this
        })
        this.spawnIcicle();

        }

        //define specific functions in advance
        spawnIcicle() {
            let icicles = this.container[0];
            let steve = this.container[1];
            let rotating = this.rotatingContainer[0];
            if (!rotating) {
                rotating = false;
            }
            

                let x = Phaser.Math.RND.between(100, 700) //stay inside screen
                //make sure icicles don't overlap
                icicles.getChildren().forEach(function (icicle) {
                    while (Math.abs(x - icicle.x) < 100) {
                        x = Phaser.Math.RND.between(100,700);
                    }
                });
                //set icicle.y to ceiling, same as player
                let y = steve.y; //change this for levels 2 & 3 to be randomly either level
                let icicle = icicles.create(x,y, 'icicle');
                icicle.setScale(0.2);
                icicle.setVelocityY(0);
                this.physics.add.collider(steve, icicle);
                icicle.body.setImmovable();

                //icicle & player interaction
                this.physics.add.overlap(steve, icicle, () => {
                    console.log(rotating);
                    if (rotating) {
                        icicle.setTexture('shards');
                        this.tweens.add({
                            targets: icicle,
                            alpha: {from: 1, to: 0},
                            duration: 250,
                            onComplete: function() {
                                /*this.tweens.add({
                                    targets: icicle,
                                    y: 2000,
                                    duration: 1
                                })*/
                            }
                        })
                    }
                }, null, this);

                
        }


    update() {
    }
};

//in progress: collision