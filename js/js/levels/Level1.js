class Level1 extends Level {

    constructor() {
        super("Level1");
        this.enemySpawnDelay = 10000;
        this.enemySpawnCoords = [[175, 165],
                                [1425, 165],
                                [175, 1345],
                                [1425, 1345],
                                [480, 928],
                                [320, 544],
                                [768, 544],
                                [864, 192],
                                [1280, 448],
                                [928, 832],
                                [704, 1344],
                                [1088, 1216],
                                [1408, 576],
                                [1408, 896]];
        this.difficultyRate = 0.9;
        this.difficultyTimeGap = 50000;
        this.currentTime = 120;
        this.maxX = 0;
        this.move = 1;

        this.reset = true;
    }

    preload() {
        super.preload();

        this.load.image("tiles1", "assets/colony-db32-grounds-ready-new.png");
        this.load.image("tiles2", "assets/colony-db32-other-ready-new.png");
        this.load.tilemapTiledJSON("map", "assets/levelMapFinal5.json");

        // Phantom from Space Kevin MacLeod (incompetech.com)
        // Licensed under Creative Commons: By Attribution 3.0 License
        // http://creativecommons.org/licenses/by/3.0/
        this.load.audio("mainMusic", ["assets/PhantomFromSpace.ogg", "assets/PhantomFromSpace.mp3"]);

        // Sound effects obtained from https://www.zapsplat.com
        this.load.audio("playerHit", "assets/playerHit.mp3");
        this.load.audio("playerDies", "assets/playerDies.mp3");
        this.load.audio("enemyHit", "assets/enemyHit.mp3");

        // By Phil Michalski, from PMSFX.COM
        this.load.audio("gunShot", "assets/gunShot.mp3");

        // PassagierAbsetzen by Kastenfrosch
        // Licensed under Creative Commons 0: 1.0
        // https://creativecommons.org/publicdomain/zero/1.0/
        this.load.audio("enemyDies", "assets/enemyDies.mp3");
    }

    create() {
        super.create();
        this.colliderActivated = true;

        this.score = 0;
        this.currentTime = 120;

        const tileset1 = this.map.addTilesetImage("grounds", "tiles1");
        const tileset2 = this.map.addTilesetImage("other", "tiles2");

        // Set up HUD
        this.scoreText = "Score: " + "\n" +
                            "Time: " + "\n +" +
                            "Lives: ";
        this.HUD = this.add.text(0, 0, this.scoreText, { fontFamily: '"Roboto Condensed"' });
        this.HUD.setScrollFactor(0, 0);
        this.HUD.setDepth(10);


        this.createMapLayers(tileset1, tileset2);

        super.setUpLevel();
        this.sprite.body.setVelocity(0, 0);

        this.player = new Character(this.sprite);
        console.log("WITNESS ME2");
        console.log(this.player.sprite);
        console.log(this.player.sprite.body.velocity);

        this.enemies = this.add.group({
            classType: Phaser.GameObjects.Sprite
        });

        this.bullets = this.add.group({
            classType: Phaser.GameObjects.Sprite
        });
        this.bullets.runChildUpdate = true;

        //this.enemies.add(new Enemy(this, 50, 50).sprite);
        this.spawnEnemies();

        //const debugGraphics = this.add.graphics().setAlpha(0.75);

        //Debug world layers
        // console.log(this.worldLayer);
        // console.log(this.belowLayer);
        // this.worldLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });

        this.physics.add.collider(this.player.sprite, this.worldLayer);

        // this.timer = new Phaser.Time.TimerEvent({
        //     callback: this.spawnEnemies(),
        //     loop: true,
        //     delay: 1
        // });

        this.createTimer();

        this.scoreTimer = this.time.addEvent({
            delay: 1000,
            callback: this.decrementTimer,
            callbackScope: this,
            loop: true
        });

        this.enemyTimerRate = this.time.addEvent({
            delay: this.difficultyTimeGap,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true
        });

        this.music = this.sound.add("mainMusic");
        this.musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };
        this.music.play(this.musicConfig);

    }

    shootBullet() {
        console.log("Creating a bullet!");
        console.log(this.bullets);
        let newBullet = new Bullet(this, this.player.sprite.x, this.player.sprite.y, this.player.lastMove).sprite;
        this.bullets.add(newBullet);
        this.physics.add.collider(newBullet, this.worldLayer, this.bulletHitsObject, null, this);
        this.sound.play("gunShot");
        //this.player.sprite.body.setVelocity(300, 300);
    }

    createTimer() {
        this.enemyTimer = this.time.addEvent({
            delay: this.enemySpawnDelay,                // ms
            callback: this.spawnEnemies,
            callbackScope: this,
            //args: [],
            loop: true
        });
    }

    decrementTimer() {
        this.currentTime += -1;
        if (this.currentTime == 0) {
            // END GAME
            this.endGame();
        }
    }

    increaseDifficulty() {
        console.log("Increasing difficulty");
        this.enemyTimer.remove();
        this.enemySpawnDelay *= this.difficultyRate;
        this.createTimer();
    }

    spawnEnemies() {
        for (var i=0; i < 3; i++) {
            // this.enemies.add(new Enemy(this, Math.floor(Math.random()*this.map.widthInPixels) + 1,
            //                             Math.floor(Math.random()*this.map.heightInPixels) + 1).sprite);
            this.coords = this.enemySpawnCoords[Math.floor(Math.random()*14)];
            let newEnemy = new Enemy(this, this.coords[0], this.coords[1]).sprite;
            newEnemy.setImmovable(true);
            this.enemies.add(newEnemy);
        }
    }

    createMapLayers(tileset1, tileset2) {

        this.belowLayer = this.map.createStaticLayer("Basic Tile Layer", tileset1, 0, 0);
        this.worldLayer = this.map.createStaticLayer("Walls", tileset2, 0, 0);

        this.worldLayer.setCollisionByProperty({ collides: true });
        this.worldLayer.setCollisionBetween(0, 3000);
    }

    playerHit(player, enemy) {
        // Find the enemy that's hitting the player and call the appropriate
        // methods on the player and the enemy
        console.log("Oh God I've been hit");
        console.log(this);
        this.player.lives -= 1;

        if (this.player.lives == 0) {
            this.sound.play("playerDies");
            this.endGame();
        }
        else {
            this.sound.play("playerHit");
            //this.playerKnockback();
            this.colliderActivated = false;
            this.player.canMove = false;
            this.playerKnockback();
        }
    }

    playerKnockback() {

        this.knockbackTimer = this.time.addEvent({
            delay: 500,
            callbackScope: this,
            callback: () => {this.colliderActivated = true; this.player.canMove = true}
        });
        // Needs to move backwards depending on last direction
        //this.player.sprite.body.enable = false;
        if (this.player.lastMove == "up") {
            this.player.sprite.body.setVelocity(0, 150);
        } else if (this.player.lastMove == "down") {
            this.player.sprite.body.setVelocity(0, -150);
        } else if (this.player.lastMove == "left") {
            this.player.sprite.body.setVelocity(150, 0);
        } else if (this.player.lastMove == "right") {
            this.player.sprite.body.setVelocity(-150, 0);
        }
    }

    bulletHitsEnemy(bullet, enemy) {
        // Remove the bullet
        bullet.destroy();
        this.bullets.remove(bullet);

        // Find the right enemy being shot and kill it
        enemy.destroy();
        this.enemies.remove(enemy);
        this.sound.play("enemyDies");

        this.score += 10;
        console.log("A bullet has hit an enemy");
    }

    bulletHitsObject(bullet, object) {
        // Remove the bullet
        console.log("I am removing the bullet");
        bullet.destroy();
        this.bullets.remove(bullet);
    }

    enemyMovement(){
        let enemies = this.enemies.getChildren();
        let numEnemies = enemies.length;
        if(this.move == 1){
            for( var i = 0; i < numEnemies;i++)
                enemies[i].x += 1;
            this.maxX += 1;
        }
        else{
            for(var i = 0; i < numEnemies;i++)
                enemies[i].x -= 1;
            this.maxX -= 1;
        }
        if(this.maxX == 50)
            this.move = 0;
        if(this.maxX == 0)
            this.move = 1;
    }

    endGame() {
        // GAME END
        console.log("Ending game!");
        this.player.canMove = false;
        this.sound.stopAll();
        this.sprite.body.setVelocity(0, 0);
        this.scene.start("GameOverMenu", {score: this.score});
    }

    update(time, delta) {
        super.update(time, delta);
        this.player.update(time, delta, this);
        //console.log(this.timer.getElapsed());


        Phaser.Actions.Call(this.bullets.getChildren(), function(bullet) {
            if (bullet.angle == 0) {
                bullet.setVelocityY(-400);
            } else if (bullet.angle == 90) {
                bullet.setVelocityX(400);
            } else if (bullet.angle == -180) {
                bullet.setVelocityY(400);
            } else if (bullet.angle == -90) {
                bullet.setVelocityX(-400);
            }
        });

        // Set collisions and overlap
        this.physics.collide(this.player.sprite, this.enemies, this.playerHit, () => {

            return this.colliderActivated;
        }, this);

        this.physics.collide(this.bullets, this.worldLayer, this.bulletHitsObject, null, this);
        this.physics.collide(this.bullets, this.enemies, this.bulletHitsEnemy, null, this);

        this.HUD.setText("Score: " + this.score + "\n" +
                            "Time: " + this.currentTime + "\n" +
                            "Lives: " + this.player.lives);

        this.enemyMovement();


        // Update every enemy

    }
}