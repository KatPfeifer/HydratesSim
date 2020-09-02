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

    this.load.image("tripodStand", "assets/images/tripodStand.png");
    this.load.image("bunsenBurner", "assets/images/bunsenBurner.png");
    this.load.image("burnerButton", "assets/images/burnerButton.png");
    this.load.image("addition1-1", "assets/images/addition1-1.png");
    this.load.image("addition1-2", "assets/images/addition1-2.png");
    this.load.image("addition1-3", "assets/images/addition1-3.png");
    this.load.image("addition1-4", "assets/images/addition1-4.png");
    this.load.image("addition1-5", "assets/images/addition1-5.png");

    this.load.image("addition2-1", "assets/images/addition2-1.png");
    this.load.image("addition2-2", "assets/images/addition2-2.png");
    this.load.image("addition2-3", "assets/images/addition2-3.png");
    this.load.image("addition2-4", "assets/images/addition2-4.png");
    this.load.image("addition2-5", "assets/images/addition2-5.png");

    this.load.image("addition3-1", "assets/images/addition3-1.png");
    this.load.image("addition3-2", "assets/images/addition3-2.png");
    this.load.image("addition3-3", "assets/images/addition3-3.png");
    this.load.image("addition3-4", "assets/images/addition3-4.png");
    this.load.image("addition3-5", "assets/images/addition3-5.png");

    this.load.image("addition4-1", "assets/images/addition4-1.png");
    this.load.image("addition4-2", "assets/images/addition4-2.png");
    this.load.image("addition4-3", "assets/images/addition4-3.png");
    this.load.image("addition4-4", "assets/images/addition4-4.png");
    this.load.image("addition4-5", "assets/images/addition4-5.png");

    this.load.image("hitOval", "assets/images/oval.png");
    this.load.image("flame", "assets/images/flame.png");

  }

  create() {
    this.scene.start('MainScene', [4, 2, 1.36, 22.00]);
  }
}
