import { GameObjects } from "phaser";
import moveableThing from "../objects/moveableThing";
import button from "../objects/button";

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
    private jar: GameObjects.Image;
    private addButton: button;
    private resetButton: button;


    constructor(){
        super({key: "weighScene"});
    }

    create(){
        this.pickHydrateNumber();
        this.findEvapDishMass();
        this.blackBox=this.add.image(400, 350, "blackBox");
        this.blackBox.setTintFill(0x2a2a2e);
        this.hitBox=this.physics.add.image(200, 230, "blackBox");
        this.hitBox.setScale(0.3);

        this.balance=this.add.image(200, 225, "balance");
        this.balance.setScale(0.80);
        this.jar=this.add.image(700, 250, "jar");
        this.jar.setScale(0.5);
        
        this.additionNumber=0;
        this.mass = 0.000001;
        this.massLabel=this.add.bitmapText(220, 300, "calibriFont", this.mass.toFixed(2)+" g");
        this.massLabel.setFontSize(40);

        this.evapDish= new moveableThing(this, 520, 300, "evapDish", 0.6);
        this.evapDish.setScale(0.6);

        this.physics.add.overlap(this.evapDish, this.hitBox, this.updateMassLabel, undefined, this);
    
    
        this.addButton = new button(this, 700, 40, "addButton", 0.7);
        this.addButton.on('pointerdown', ()=>this.changeAdditions("add"), this);
    
        this.resetButton = new button(this, 45, 385, "resetButton", 0.7);
        this.resetButton.on('pointerdown', ()=>this.reset(), this);
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

    changeAdditions(name: string){
        if (name == "add"&&this.additionNumber<5){
            this.additionNumber++;
        }
        this.changeCompoundMass();
    }

    changeCompoundMass(){
        this.mass=1.5*this.additionNumber + Math.round(Math.random()*100)/100;
        console.log("compound mass: " + this.mass.toFixed(2));
    }

    reset(){
        this.massLabel.text=0.0001.toFixed(2) + " g";

        this.evapDish.x=520;
        this.evapDish.y=300;
    }
}