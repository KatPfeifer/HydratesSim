export default class dish extends Phaser.GameObjects.Image{
    constructor(scene: Phaser.Scene, name: string){
        super(scene, 520, 300, name);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.6);
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.on("drag", this.doDrag, this);
        this.setAlpha(0.0);

    }

    doDrag(pointer){
        this.x=pointer.x;
        this.y=pointer.y;
    }

    resetPosition(){
        this.x=520;
        this.y=300;
    }
}