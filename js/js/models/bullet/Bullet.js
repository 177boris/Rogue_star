class Bullet {
    constructor(currentScene, startx, starty, direc) {
        this.scene = currentScene;
        if (direc == "up") {
            starty = starty - 30;
        } else if (direc == "right") {
            startx = startx + 30;
        } else if (direc == "down") {
            starty = starty + 30;
        } else if (direc == "left") {
            startx = startx - 30;
        }
        this.sprite = currentScene.physics.add.sprite(startx, starty, "bullet", "beam.000")
            .setSize(30, 40)
            .setOffset(0, 24);
        this.veloX = 0;
        this.veloY = 0;
        if (direc == "up") {
            this.sprite.angle = 0;
        } else if (direc == "right") {
            this.sprite.angle = 90;
        } else if (direc == "down") {
            this.sprite.angle = 180;
        } else if (direc == "left") {
            this.sprite.angle = 270;
        }
    }

    update(time, delta){

    }
}