import { GameObjects } from "phaser";
import dish from "../objects/dish";
import button from "../objects/button";
import buttonOutline from "../objects/buttonOutline";

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
    private answerBox: any;
    private answerInput: any;
    private answer: any;
    private instruction: GameObjects.Text;
    private correct: GameObjects.Text;
    private wrong: GameObjects.Text;
    private restartButton: button;
    private restartOutline: buttonOutline;


    constructor(){
        super({key: 'finalScene'});
    }

    create(){
        console.log("hydrate number: "+ this.hydrateNumber);
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

        this.equation=this.add.image(580, 30, "equation");
        this.equation.setScale(0.8);

        this.answerBox=this.add.dom(550, 100).createFromCache('inputForm');
        this.answerBox.addListener('click');
        this.answerBox.on('click', ()=>this.handleClick(event));

        this.instruction =this.add.text(415, 115, "Enter a whole number to see if your answer \nfor n in the starting hydrate is correct", {fontFamily: "calibri", fill: "000000", fontSize: "16px"});
        this.instruction.setTintFill(0x0537ed);

        this.correct=this.add.text(415, 175, "You got it! Nice job!", {fontFamily: "calibri", fontSize: "18px", fill: "000000"});
        this.correct.setTintFill(0x00b318);
        this.correct.setAlpha(0.0);

        this.wrong=this.add.text(415, 175, "Not quite, try again!", {fontFamily: 'calibri', fill: '000000', fontSize: "18px"});
        this.wrong.setTintFill(0xab0314);
        this.wrong.setAlpha(0.0);

        this.restartButton=new button(this, 750, 375, "restartButton", 0.7);
        this.restartButton.on('pointerdown', ()=>this.restart(), this);
        this.restartOutline = new buttonOutline(this, 750, 375, "restartButton", 0.7, 0x45245e);
        this.restartButton.on('pointerover', ()=>this.restartOutline.enterHoverState(), this);
        this.restartButton.on('pointerout', ()=>this.restartOutline.exitHoverState("word"), this);

        this.physics.add.overlap(this.dish, this.hitBox, ()=>this.dishBoxOverlap(), undefined, this)
    }

    restart(){
        this.scene.start("weighScene");
    }

    handleClick(e){
        if (e.target.name=="submitButton"){
            this.answerInput=this.answerBox.getChildByName("answerField");
            this.answer=this.answerInput.value;
            this.compareAnswer();
        }
    }

    hideWrong(){
        this.wrong.setAlpha(0.0);
    }

    compareAnswer(){
        if (this.answer==this.hydrateNumber){
            this.correct.setAlpha(1.0);
        }
        if (this.answer!=this.hydrateNumber){
            this.wrong.setAlpha(1.0);
            this.time.addEvent({
                delay: 2000,
                callback: this.hideWrong,
                callbackScope: this,
                loop: false 
            })
        }
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