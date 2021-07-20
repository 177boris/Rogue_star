class GameOverMenu extends Menu {
    constructor() {
        super("GameOverMenu");
    }

    init(data) {
        super.init();
        this.score = data.score;
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.goText = "Game Over! \n" +
                        "Your score was: " + this.score;

        this.HUD = this.add.text(this.sys.game.config.width/2 - 215, this.sys.game.config.height/2 - 80, this.goText, {
            fontFamily: '"Roboto Condensed"',
            fontSize: 60,
            align: "center"
        });

        this.startOverButton = this.add.text(445, 400, "Play again", {
            fontFamily: '"Roboto Condensed"',
            fontSize: 30,
            align: "center"
        });

        this.startOverButton.setInteractive({ useHandCursor: true });
        this.startOverButton.on("pointerdown", () => this.scene.start("Level1"));
    }

    update() {
        super.update();
    }
}