import { GameObjects } from "phaser";
import moveableThing from "../objects/moveableThing";
import button from "../objects/button";
import dish from "../objects/dish";

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
    private overlapping: boolean;
    private nextButton: button;
    private warningText: GameObjects.Text;
    private addition1: dish;
    private addition2: dish;
    private addition3: dish;
    private addition4: dish;
    private dishes: GameObjects.Group;
    private warning2: GameObjects.Text;

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
        this.warningText=this.add.text(20, 60, "Use good weighing technique!", {fontFamily: "calibri", fill: "f00707"});
        this.warningText.setTintFill(0xf00707);
        this.warningText.setAlpha(0.0);
        this.warning2=this.add.text(20, 60, "Add compound to the evaporating dish!", {fontFamily: "calibri", fill: "f00707"});
        this.warning2.setTintFill(0xf00707);
        this.warning2.setAlpha(0.0);

        this.add.text(20, 20, "Find the mass of the evaporating dish, then add compound and determine the mass of \nthe compound. Make sure to use proper technique!", {fontFamily: "calibri", fill: "000000"});

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

        this.physics.add.overlap(this.evapDish, this.hitBox, this.evapHitOverlap, undefined, this);
    
    
        this.addButton = new button(this, 700, 40, "addButton", 0.7);
        this.addButton.on('pointerdown', ()=>this.changeAdditions("add"), this);
    
        this.resetButton = new button(this, 45, 385, "resetButton", 0.7);
        this.resetButton.on('pointerdown', ()=>this.reset(), this);

        this.nextButton = new button(this, 750, 375, "nextButton", 0.7);
        this.nextButton.on("pointerdown", ()=>this.goToDry(), this);

        this.createDishes();
    }

    createDishes(){
        this.addition1= new dish(this, "addition1");
        this.addition2=new dish(this, "addition2");
        this.addition3=new dish(this, "addition3");
        this.addition4=new dish(this, "addition4");

        this.dishes= this.physics.add.group([this.addition1, this.addition2, this.addition3, this.addition4]);

        this.physics.add.overlap(this.hitBox, this.dishes, this.evapHitOverlap, undefined, this);
    }


    update(){
        let overlap = this.physics.overlap(this.evapDish, this.hitBox);
        if (overlap==false&&this.overlapping==true){
            this.massLabel.text=0.000001.toFixed(2)+" g";
            this.overlapping=false;
        }
    }
    pickHydrateNumber(){
        this.hydrateNumber=Math.round(Math.random()*6);
        console.log("Hydrate number:" +this.hydrateNumber);
    }

    findEvapDishMass(){
        this.massEvapDish=21.50 + Math.round(Math.random()*100)/100;
        console.log("mass evap dish: "+ this.massEvapDish);
    }

    evapHitOverlap(){
        this.overlapping=true;
        this.updateMassLabel();
    }

    updateMassLabel(){
        this.totalMass = this.mass + this.massEvapDish;
        this.massLabel.text=this.totalMass.toFixed(2) + " g";
    }

    changeAdditions(name: string){
        if (this.physics.overlap(this.evapDish, this.hitBox)){
            this.warningText.setAlpha(1.0);
            this.time.addEvent({
                delay: 800,
                callback: this.hideWarning,
                callbackScope: this,
                loop: false 
            });
            return;
        }

        if (name == "add"&&this.additionNumber<4){
            this.additionNumber++;
            this.changeCompoundMass();
        }
        this.resetDishImages();
        if (this.additionNumber==0){
            this.evapDish.setAlpha(0.0);
        }
        if (this.additionNumber==1){
            this.addition1.setAlpha(1.0);
        }
        if (this.additionNumber==2){
            this.addition2.setAlpha(1.0);
        }
        if (this.additionNumber==3){
            this.addition3.setAlpha(1.0);
        }
        if (this.additionNumber==4){
            this.addition4.setAlpha(1.0);
        }
    }

    changeCompoundMass(){
        this.mass=1.5*this.additionNumber + Math.round(Math.random()*100)/100;
        console.log("compound mass: " + this.mass.toFixed(2));
    }

    reset(){
        this.massLabel.text=0.0001.toFixed(2) + " g";
        this.mass=0.0001;
        this.additionNumber=0;

        this.evapDish.x=520;
        this.evapDish.y=300;
        this.resetDishImages();
        this.evapDish.setAlpha(1.0);
        this.addition1.resetPosition();
        this.addition2.resetPosition();
        this.addition3.resetPosition();
        this.addition4.resetPosition();
    }

    resetDishImages(){
        this.evapDish.setAlpha(0.0);
        this.addition1.setAlpha(0.0);
        this.addition2.setAlpha(0.0);
        this.addition3.setAlpha(0.0);
        this.addition4.setAlpha(0.0);

    }

    hideWarning(){
        this.warningText.setAlpha(0.0);
    }

    hideText(){
        this.warning2.setAlpha(0.0);
    }

    goToDry(){
        if (this.additionNumber==0){
            this.warning2.setAlpha(1.0);
            this.time.addEvent({
                delay: 800,
                callback: this.hideText,
                callbackScope: this,
                loop: false
            })
            return;
        }
        this.scene.start("dryScene", [this.hydrateNumber, this.additionNumber, this.mass, this.massEvapDish]);
    }
}