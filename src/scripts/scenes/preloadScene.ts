export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.bitmapFont("calibriFont", "assets/fonts/calibriFont_0.png", "assets/fonts/calibriFont.fnt");

    this.load.image("startButton", "assets/images/startButton.png");
    this.load.image("blackBox", "assets/images/blackBox.png");
    this.load.image("balance", "assets/images/balance.png");
  }

  create() {
    this.scene.start('weighScene');
  }
}
