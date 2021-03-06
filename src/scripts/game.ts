import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import WeighScene from './scenes/weighScene';
import DryScene from './scenes/dryScene';
import FinalScene from './scenes/finalScene';
import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 400;


const config: GameConfig = {
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, WeighScene, DryScene, FinalScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            //gravity: { y: 400 }
        }
    },
    dom:{
        createContainer: true,
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
