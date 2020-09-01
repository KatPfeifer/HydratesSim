export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.bitmapFont("calibriFont", "assets/fonts/calibriFont_0.png", "assets/fonts/calibriFont.fnt");

    this.load.image("startButton", "assets/images/startButton.png");
    this.load.image("blackBox", "assets/images/blackBox.png");
    this.load.image("balance", "assets/images/balance.png");
    this.load.image("evapDish", "assets/images/evapDish.png");
    this.load.image("jar", "assets/images/jar.png");
    this.load.image("addButton", "assets/images/addButton.png");
    this.load.image("removeButton", "assets/images/removeButton.png");
    this.load.image("resetButton", "assets/images/resetButton.png");
    this.load.image("nextButton", "assets/images/nextButton.png");
    this.load.image("addition1", "assets/images/addition1.png");
    this.load.image("addition2", "assets/images/addition2.png");
    this.load.image("addition3", "assets/images/addition3.png");
    this.load.image("addition4", "assets/images/addition4.png");
    this.load.image("addition5", "assets/images/addition5.png");
  }

  create() {
    this.scene.start('weighScene');
  }
}
