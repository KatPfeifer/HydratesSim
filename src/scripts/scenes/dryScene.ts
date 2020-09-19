import { GameObjects, Game } from "phaser";
import button from "../objects/button";
import dish from "../objects/dish";
import buttonOutline from "../objects/buttonOutline";

export default class dryScene extends Phaser.Scene{

    private blackBox: GameObjects.Image;
    private dish: dish;
    private dish1: dish;
    private dish2: dish;
    private dish3: dish;
    private dish4: dish;
    private dish5: dish;
    private tripodStand: GameObjects.Image;
    private bunsenBurner: GameObjects.Image;
    private burnerButton: button;
    private additionNumber: number;
    private hitOval: GameObjects.Image;
    private warningMessage: GameObjects.Text;
    private flame: GameObjects.Image;
    private nextButton: button;
    private givenData: any;
    private flameOn: boolean;
    private drying: boolean;
    private dry: boolean;
    private backButton: button;
    private nextOutline: buttonOutline;
    private backOutline: buttonOutline;
    private burnerOutline: buttonOutline;
    private nextWarning: GameObjects.Text;

    constructor(){
        super({key: "dryScene"});
    }

    create(){
        this.flameOn=false;
        this.drying=false;
        this.dry=false;
        console.log("in create");
        this.blackBox=this.add.image(400, 350, "blackBox");
        this.blackBox.setTintFill(0x2a2a2e);
        this.tripodStand=this.add.image(400, 250, "tripodStand");
        this.tripodStand.setScale(0.55);

        this.bunsenBurner=this.add.image(400, 300, "bunsenBurner");
        this.bunsenBurner.setScale(0.35);

        this.burnerButton=new button(this, 150, 300, "burnerButton", 0.7);
        this.burnerButton.on("pointerdown", ()=>this.burnerAction(), this);
        this.burnerOutline = new buttonOutline(this, 150, 300, "burnerButton", 0.7, 0x7a3002);
        this.burnerButton.on('pointerover', ()=>this.burnerOutline.enterHoverState(), this);
        this.burnerButton.on("pointerout", ()=>this.burnerOutline.exitHoverState("word"), this);

        this.backButton = new button(this, 50, 375, "backButton", 0.7);
        this.backButton.on("pointerdown", ()=>this.goBack(), this);
        this.backOutline = new buttonOutline(this, 50, 375, "backButton", 0.7, 0x390040);
        this.backButton.on("pointerover", ()=>this.backOutline.enterHoverState(), this);
        this.backButton.on('pointerout', ()=>this.backOutline.exitHoverState("word"), this);

        this.hitOval=this.physics.add.image(400, 150, "hitOval");
        this.hitOval.setScale(0.3);
        this.hitOval.setAlpha(0.0);

        this.warningMessage = this.add.text(400, 20, "Put the evaporating dish on the tripod \nstand before lighting the burner", {fontFamily: "calibri", fill: "000000", fontSize: "16px"});
        this.warningMessage.setTintFill(0xf00707);
        this.warningMessage.setAlpha(0.0);

        this.nextWarning = this.add.text(450, 30, "Dry the compound before continuing!", {fontFamily: "calibri", fill: "000000", fontSize: "16px"});
        this.nextWarning.setTintFill(0xf00707);
        this.nextWarning.setAlpha(0.0);

        this.add.text(20, 20, "Use the Bunsen burner to dry \nthe Copper (II) Sulfate Hydrate. \nWhen this compound is heated \nin air, it loses its water to form \nwhite copper (II) sulfate crystals.", {fontFamily: "calibri", fill: "000000"});

        this.flame=this.add.image(400, 204, "flame");
        this.flame.setScale(0.5);
        this.flame.setAlpha(0.0);

        this.nextButton = new button(this, 750, 375, "nextButton", 0.7);
        this.nextButton.on("pointerdown", ()=>this.goToNext(), this);
        this.nextOutline = new buttonOutline(this, 750, 375, "nextButton", 0.7, 0x006326);
        this.nextButton.on('pointerover', ()=>this.nextOutline.enterHoverState(), this);
        this.nextButton.on('pointerout', ()=>this.nextOutline.exitHoverState("word"), this);

        this.createEvapDishImage();

        this.physics.add.overlap(this.hitOval, this.dish, this.resolveOverlap, undefined, this)
    }

    createEvapDishImage(){
        console.log(this.additionNumber);
        if (this.additionNumber==1){
            console.log("where I should be");
            this.dish= new dish(this, "addition1");
            this.dish1= new dish(this, "addition1-1");
            this.dish2= new dish(this, "addition1-2");
            this.dish3= new dish(this, "addition1-3");
            this.dish4= new dish(this, "addition1-4");
            this.dish5= new dish(this, "addition1-5"); 
        }

        if (this.additionNumber==2){
            this.dish= new dish(this, "addition2");
            this.dish1= new dish(this, "addition2-1");
            this.dish2= new dish(this, "addition2-2");
            this.dish3= new dish(this, "addition2-3");
            this.dish4= new dish(this, "addition2-4");
            this.dish5= new dish(this, "addition2-5");  
        }

        if (this.additionNumber==3){
            this.dish= new dish(this, "addition3");
            this.dish1= new dish(this, "addition3-1");
            this.dish2= new dish(this, "addition3-2");
            this.dish3= new dish(this, "addition3-3");
            this.dish4= new dish(this, "addition3-4");
            this.dish5= new dish(this, "addition3-5"); 
        }

        if (this.additionNumber==4){
            this.dish= new dish(this, "addition4");
            this.dish1= new dish(this, "addition4-1");
            this.dish2= new dish(this, "addition4-2");
            this.dish3= new dish(this, "addition4-3");
            this.dish4= new dish(this, "addition4-4");
            this.dish5= new dish(this, "addition4-5"); 
        }
        this.dish.setAlpha(1.0);
        this.dish.x=620;
    }

    init(data){
        console.log("in init");
        this.givenData=data;
        this.additionNumber=this.givenData[1];

    }

    resolveOverlap(){
        if (this.flameOn==true&&this.dry==false){
            this.dryCompound();
        }
    }

    burnerAction(){
        console.log("drying: "+ this.drying);
        if (this.flameOn==false){
            this.flame.setAlpha(1.0);
            this.flameOn=true;
            if (this.physics.overlap(this.hitOval, this.dish)){
                this.dryCompound();
            }
            return;
        }
        if (this.flameOn==true){
            if (this.drying==false){
                this.flame.setAlpha(0.0);
                this.flameOn=false;
            }
        }
    }

    hideWarning(){
        this.warningMessage.setAlpha(0.0);
    }

    dryCompound(){
        this.drying=true;
        this.time.addEvent({
            delay: 800,
            callback: this.dry01,
            callbackScope: this,
            loop: false 
        });
        this.time.addEvent({
            delay: 1600,
            callback: this.dry12,
            callbackScope: this,
            loop: false 
        });
        this.time.addEvent({
            delay: 2400,
            callback: this.dry23,
            callbackScope: this,
            loop: false 
        });
        this.time.addEvent({
            delay: 3200,
            callback: this.dry34,
            callbackScope: this,
            loop: false 
        });
        this.time.addEvent({
            delay: 4000,
            callback: this.dry45,
            callbackScope: this,
            loop: false 
        });
    }

    dry01(){
        this.dish.setAlpha(0.0);
        this.dish1.setAlpha(1.0);
    }
    dry12(){
        this.dish1.setAlpha(0.0);
        this.dish2.setAlpha(1.0);
    }
    dry23(){
        this.dish2.setAlpha(0.0);
        this.dish3.setAlpha(1.0);
    }
    dry34(){
        this.dish3.setAlpha(0.0);
        this.dish4.setAlpha(1.0);
    }
    dry45(){
        this.dish4.setAlpha(0.0);
        this.dish5.setAlpha(1.0);
        this.drying=false;
        this.dry=true;
        console.log("in dry45, drying: "+ this.drying);
    }

    goToNext(){
        if (this.dry==false){
            this.nextWarning.setAlpha(1.0);
            this.time.addEvent({
                delay: 2000,
                callback: this.hideNextWarning,
                callbackScope: this,
                loop: false 
            })
        }
        else {
            this.scene.start("finalScene", this.givenData);
        }
        
    }

    hideNextWarning(){
        this.nextWarning.setAlpha(0.0);
    }

    goBack(){
        this.scene.start("weighScene");
    }
}