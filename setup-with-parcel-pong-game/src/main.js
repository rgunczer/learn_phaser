import Phaser from 'phaser';

import TitleScreen from './scenes/TitleScreen';
import GameScreen from './scenes/GameScreen';

const config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    backgroundColor: '#616161',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
};

const game = new Phaser.Game(config);

game.scene.add('title-screen', TitleScreen);
game.scene.add('game-screen', GameScreen);

// game.scene.start('title-screen');
game.scene.start('game-screen');
