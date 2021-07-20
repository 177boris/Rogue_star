class IntroMenu extends Menu {
    constructor() {
        super("IntroMenu");
    }

    init() {
        super.init();
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.startText = "Rogue Star";
        this.title = this.add.text(150, 130, this.startText, {
            fontFamily: '"Roboto Condensed"',
            fontSize: 160,
            align: "center"
        });

        this.buttonText = "Start Game";
        this.button = this.add.text(380, 350, this.buttonText, {
            fontFamily: '"Roboto Condesned"',
            fontSize: 60,
            align: "center"
        });
        this.button.setInteractive({ useHandCursor: true });
        this.button.on("pointerdown", () => this.scene.start("Level1"));
    }

    update() {
        super.update();
    }
}