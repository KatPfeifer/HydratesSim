import { GameObjects } from "phaser";

export default class weighScene extends Phaser.Scene{

    private hydrateNumber: number;
    private additionNumber: number;
    private blackBox: GameObjects.Image;
    private balance: GameObjects.Image;


    constructor(){
        super({key: "weighScene"});
    }

    create(){
        this.pickHydrateNumber();
        this.blackBox=this.add.image(400, 350, "blackBox");
        this.blackBox.setTintFill(0x323236);
        this.balance=this.add.image(200, 225, "balance");
        this.balance.setScale(0.80);
        
    }

    pickHydrateNumber(){
        this.hydrateNumber=Math.round(Math.random()*6);
        console.log("Hydrate number:" +this.hydrateNumber);
    }
}