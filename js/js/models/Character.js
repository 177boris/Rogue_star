class Character {

    constructor(sprite) {
        this.sprite = sprite;
        this.lives = 3;
        this.lastMove = "down";
        this.canMove = true;
        this.speed = 175;
        this.reset = true;
        //this.currentWeapon = new Weapon();
    }

    create(currentScene) {
        // Horizontal movement
        if (this.lastMove = "left") {
            this.sprite.body.setVelocityX(-this.speed);
        } else if (this.lastMove = "right") {
            this.sprite.body.setVelocityX(this.speed);
        }

        // Vertical movement
        if (this.lastMove = "up") {
            this.sprite.body.setVelocityY(-this.speed);
        } else if (this.lastMove = "down") {
            this.sprite.body.setVelocityY(this.speed);
        }
        console.log("I am going here");
        this.sprite.body.setVelocityX(0);
        this.sprite.body.setVelocityY(0);
    }

    update(time, delta, currentScene) {
        if (this.reset) {
            console.log("I reset keys");
            currentScene.cursors.left.isDown = false;
            currentScene.cursors.right.isDown = false;
            currentScene.cursors.up.isDown = false;
            currentScene.cursors.down.isDown = false;
        }
        this.reset = false;

        const prevVelocity = this.sprite.body.velocity.clone();

        if (Phaser.Input.Keyboard.JustDown(currentScene.spacebar)) {
            currentScene.shootBullet();
        }

        // Stop any previous movement from the last frame
        if (this.canMove) {
            this.sprite.body.setVelocity(0);

            // Horizontal movement
            if (currentScene.cursors.left.isDown) {
                console.log("I am down");
                this.sprite.body.setVelocityX(-this.speed);
            } else if (currentScene.cursors.right.isDown) {
                this.sprite.body.setVelocityX(this.speed);
            }

            // Vertical movement
            if (currentScene.cursors.up.isDown) {
                this.sprite.body.setVelocityY(-this.speed);
            } else if (currentScene.cursors.down.isDown) {
                this.sprite.body.setVelocityY(this.speed);
            }

            // Normalize and scale the velocity so that player can't move faster along a diagonal
            this.sprite.body.velocity.normalize().scale(this.speed);

            // Update the animation last and give left/right animations precedence over up/down animations
            if (currentScene.cursors.left.isDown) {
                this.sprite.anims.play("p-left-walk", true);
                this.lastMove = "left";
            } else if (currentScene.cursors.right.isDown) {
                this.sprite.anims.play("p-right-walk", true);
                this.lastMove = "right";
            } else if (currentScene.cursors.up.isDown) {
                this.sprite.anims.play("p-back-walk", true);
                this.lastMove = "up";
            } else if (currentScene.cursors.down.isDown) {
                this.sprite.anims.play("p-front-walk", true);
                this.lastMove = "down";
            } else {
                this.sprite.anims.stop();

                // If we were moving, pick and idle frame to use
                if (prevVelocity.x < 0) {
                    this.sprite.setTexture("atlas", "p-left");
                    this.lastMove = "left";
                } else if (prevVelocity.x > 0) {
                    this.sprite.setTexture("atlas", "p-right");
                    this.lastMove = "right";
                } else if (prevVelocity.y < 0) {
                    this.sprite.setTexture("atlas", "p-back");
                    this.lastMove = "up";
                } else if (prevVelocity.y > 0) {
                    this.sprite.setTexture("atlas", "p-front");
                    this.lastMove = "down";
                }
            }
        }
    }
}