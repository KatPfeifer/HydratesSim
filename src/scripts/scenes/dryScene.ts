import { GameObjects, Game } from "phaser";
import button from "../objects/button";
import dish from "../objects/dish";

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

    constructor(){
        super({key: "dryScene"});
    }

    create(){
        console.log("in create");
        this.blackBox=this.add.image(400, 350, "blackBox");
        this.blackBox.setTintFill(0x2a2a2e);
        this.tripodStand=this.add.image(300, 250, "tripodStand");
        this.tripodStand.setScale(0.55);

        this.bunsenBurner=this.add.image(300, 300, "bunsenBurner");
        this.bunsenBurner.setScale(0.35);

        this.burnerButton=new button(this, 100, 350, "burnerButton", 0.7);
        this.burnerButton.on("pointerdown", ()=>this.burnerAction(), this);

        this.hitOval=this.physics.add.image(300, 150, "hitOval");
        this.hitOval.setScale(0.3);
        this.hitOval.setAlpha(0.0);

        this.warningMessage = this.add.text(50, 20, "Put the evaporating dish on the tripod \nstand before lighting the burner", {fontFamily: "calibri", fill: "000000", fontSize: "20px"});
        this.warningMessage.setTintFill(0xf00707);
        this.warningMessage.setAlpha(0.0);

        this.flame=this.add.image(300, 204, "flame");
        this.flame.setScale(0.5);
        this.flame.setAlpha(0.0);

        this.nextButton = new button(this, 750, 375, "nextButton", 0.7);
        this.nextButton.on("pointerdown", ()=>this.goToNext(), this);

        this.createEvapDishImage();
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
            this.dish= new dish(this, "addition1");
            this.dish1= new dish(this, "addition4-1");
            this.dish2= new dish(this, "addition4-2");
            this.dish3= new dish(this, "addition4-3");
            this.dish4= new dish(this, "addition4-4");
            this.dish5= new dish(this, "addition4-5"); 
        }
        this.dish.setAlpha(1.0);
    }

    init(data){
        console.log("in init");
        this.givenData=data;
        this.additionNumber=this.givenData[1];

    }

    burnerAction(){
        if (this.physics.overlap(this.dish, this.hitOval)){
            this.flame.setAlpha(1.0);
            this.dryCompound();
        }
        else {
            this.warningMessage.setAlpha(1.0);
            this.time.addEvent({
                delay: 800,
                callback: this.hideWarning,
                callbackScope: this,
                loop: false 
            })
        }
    }

    hideWarning(){
        this.warningMessage.setAlpha(0.0);
    }

    dryCompound(){
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
    }

    goToNext(){
        this.scene.start("finalScene", this.givenData);
    }
}