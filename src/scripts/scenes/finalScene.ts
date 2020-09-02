import { GameObjects } from "phaser";
import dish from "../objects/dish";

export default class finalScene extends Phaser.Scene{

    private hydrateNumber: number;
    private mass: number;
    private CuSO4mass: number;
    private balance: GameObjects.Image;
    private dish: dish;
    private hitBox: GameObjects.Image;
    private massLabel: GameObjects.BitmapText;
    private blackBox: GameObjects.Image;
    private additionNumber: number;
    private dishMass: number;
    private overlapping: boolean;
    private equation: GameObjects.Image;


    constructor(){
        super({key: 'finalScene'});
    }

    create(){
        this.blackBox=this.add.image(400, 350, "blackBox");
        this.blackBox.setTintFill(0x2a2a2e);
        this.hitBox=this.physics.add.image(200, 230, "blackBox");
        this.hitBox.setScale(0.3);
        this.balance=this.add.image(200, 225, "balance");
        this.balance.setScale(0.80);

        this.massLabel=this.add.bitmapText(220, 300, "calibriFont", "0.00 g");
        this.massLabel.setFontSize(40);

        this.add.text(20, 20, "Find the mass of the anhydrous Copper (II) Sulfate and \nuse this to determine the starting hydrate", {fontFamily: "calibri", fill: "000000"});

        this.createDish();
        this.findCuSO4Mass();

        this.equation=this.add.image(600, 40, "equation");
        this.equation.setScale(0.6);

        this.physics.add.overlap(this.dish, this.hitBox, ()=>this.dishBoxOverlap(), undefined, this)
    }

    createDish(){
        if (this.additionNumber==1){
            this.dish=new dish(this, "addition1-5");
        }
        if (this.additionNumber==2){
            this.dish=new dish(this, "addition2-5");
        }
        if (this.additionNumber==3){
            this.dish=new dish(this, "addition3-5");
        }
        if (this.additionNumber==4){
            this.dish=new dish(this, "addition4-5");
        }
        this.dish.setAlpha(1.0);
    }

    findCuSO4Mass(){
        let hydrateMW=this.hydrateNumber*18.02+159.61;
        this.CuSO4mass=(this.mass*159.61)/(hydrateMW);
    }

    init(data){
        let d=data;
        this.hydrateNumber=d[0];
        this.additionNumber=d[1];
        this.mass=d[2];
        this.dishMass=d[3];
    }

    dishBoxOverlap(){
        this.overlapping=true;
        this.updateMassLabel();
    }

    updateMassLabel(){
        let totalMass=this.CuSO4mass+this.dishMass;
        this.massLabel.text=totalMass.toFixed(2) + " g";
    }

    update(){
        let overlap = this.physics.overlap(this.dish, this.hitBox);
        if (overlap==false&&this.overlapping==true){
            this.massLabel.text=0.000001.toFixed(2)+" g";
            this.overlapping=false;
        }
    }
}