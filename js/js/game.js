let config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 600,
    pixelArt: true,
    parent: "game",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    //scene: [ Boot, Preloader, IntroMenu, LoginMenu, GameOverMenu, LeaderboardMenu ]
};

const game = new Phaser.Game(config);

game.scene.add("GameOverMenu", GameOverMenu);
game.scene.add("Level1", Level1);
game.scene.add("IntroMenu", IntroMenu);

//game.scene.start("GameOverMenu", {score: 340});
game.scene.start("IntroMenu");
//game.scene.start("Level1");
