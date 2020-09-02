import ExampleObject from '../objects/exampleObject';
import button from '../objects/button';
import buttonOutline from '../objects/buttonOutline';
import { GameObjects, Game } from 'phaser';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private startButton: button;
  private startOutline: buttonOutline;
  private copperSulfate: GameObjects.Image;
  private equation: GameObjects.Image;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.add.bitmapText(150, 20, "calibriFont", "Determination of the Formula of a Hydrate");
    this.startButton=new button(this, 400, 375, "startButton", 0.8);
    this.startButton.on('pointerdown', ()=>this.goToWeigh(), this);
    this.startOutline=new buttonOutline(this, 400, 375, "startButton", 0.8, 0x030054);
    this.startButton.on('pointerover', ()=>this.startOutline.enterHoverState(), this);
    this.startButton.on('pointerout', ()=>this.startOutline.exitHoverState("word"), this);
  
    this.copperSulfate=this.add.image(400, 225, "copperSulfate");
    this.equation=this.add.image(400, 100, "equation");
  }

  update() {
  }

  goToWeigh(){
    this.scene.start("weighScene");
  }
}
