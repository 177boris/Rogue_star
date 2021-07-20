class Enemy {
    constructor(currentScene, startx, starty) {
        this.scene = currentScene;
        this.health = 100;
        this.sprite = currentScene.physics.add.sprite(startx, starty, "enemyAtlas", "enemy-front")
            .setSize(30, 40)
            .setOffset(0, 24);
    }
}