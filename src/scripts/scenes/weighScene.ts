import { GameObjects } from "phaser";
import moveableThing from "../objects/moveableThing";

export default class weighScene extends Phaser.Scene{

    private hydrateNumber: number;
    private additionNumber: number;
    private blackBox: GameObjects.Image;
    private balance: GameObjects.Image;
    private mass: number;
    private massEvapDish: number;
    private massLabel: GameObjects.BitmapText;
    private evapDish: moveableThing;
    private hitBox: GameObjects.Image;
    private totalMass: number;


    constructor(){
        super({key: "weighScene"});
    }

    create(){
        this.pickHydrateNumber();
        this.findEvapDishMass();
        this.blackBox=this.add.image(400, 350, "blackBox");
        this.blackBox.setTintFill(0x323236);
        

        this.balance=this.add.image(200, 225, "balance");
        this.balance.setScale(0.80);
        this.hitBox=this.physics.add.image(200, 230, "blackBox");
        this.hitBox.setScale(0.3);
        
        this.mass = 0.000001;
        this.massLabel=this.add.bitmapText(220, 300, "calibriFont", this.mass.toFixed(2)+" g");
        this.massLabel.setFontSize(40);

        this.evapDish= new moveableThing(this, 520, 300, "evapDish", 0.6);
        this.evapDish.setScale(0.6);

        this.physics.add.overlap(this.evapDish, this.hitBox, this.updateMassLabel, undefined, this);
    }

    pickHydrateNumber(){
        this.hydrateNumber=Math.round(Math.random()*6);
        console.log("Hydrate number:" +this.hydrateNumber);
    }

    findEvapDishMass(){
        this.massEvapDish=21.50 + Math.round(Math.random()*100)/100;
        console.log("mass evap dish: "+ this.massEvapDish);
    }

    updateMassLabel(){
        this.totalMass = this.mass + this.massEvapDish;
        this.massLabel.text=this.totalMass.toFixed(2) + " g";
    }
}