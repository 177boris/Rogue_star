class Level extends Phaser.Scene {
    constructor(tag) {
        super(tag);
        this.player = {};
        this.map = {};
        this.cursors = {};
        this.score = 0;
        // Clock already exists in scene
    }

    preload() {
        this.load.atlas("atlas", "assets/sprites.png", "assets/sprites.json");
        this.load.atlas("enemyAtlas", "assets/enemy.png", "assets/enemy.json");

        // By ansimuz, obtained from www.itch.io
        this.load.atlas("bullet", "assets/beam.png", "assets/beam.json");
    }

    create() {
        this.map = this.make.tilemap({ key: "map" });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        console.log(this.physics);
    }

    update(time, delta) {

    }



    setUpLevel() {
        this.setUpPlayer();
        this.setAnimations();
        this.setUpCamera();
    }

    setUpPlayer() {
        this.sprite = this.physics.add
            .sprite(400, 100, "atlas", "p-front")
            .setSize(30, 40)
            .setOffset(0, 24);
    }

    setAnimations() {
        this.anims.create({
            key: "p-left-walk",
            frames: this.anims.generateFrameNames("atlas", { prefix: "p-left-walk.", start: 0, end: 1, zeroPad: 3}),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "p-right-walk",
            frames: this.anims.generateFrameNames("atlas", { prefix: "p-right-walk.", start: 0, end: 1, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "p-front-walk",
            frames: this.anims.generateFrameNames("atlas", { prefix: "p-front-walk.", start: 0, end: 1, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "p-back-walk",
            frames: this.anims.generateFrameNames("atlas", { prefix: "p-back-walk.", start: 0, end: 1, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "bullet-anim",
            frames: this.anims.generateFrameNames("bullet", { prefix: "beam.", start: 0, end: 1, zeroPad: 3}),
            frameRate: 10,
            repeat: -1
        });
    }

    setUpCamera() {
        const camera = this.cameras.main;
        this.cameras.main.startFollow(this.sprite, true, 1, 1);

        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        camera.setZoom(1);
    }

}