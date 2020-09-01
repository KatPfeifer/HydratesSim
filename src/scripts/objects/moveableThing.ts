export default class moveableThing extends Phaser.GameObjects.Image{
    constructor(scene: Phaser.Scene, x: number, y: number, name: string, scale: number){
        super(scene, x, y, name);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(scale);
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.on("drag", this.doDrag, this);

    }

    doDrag(pointer){
        this.x=pointer.x;
        this.y=pointer.y;
    }
}