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
  }

  create() {
    this.scene.start('weighScene');
  }
}
