import 'phaser';
import { GameScene, LoaderScene, MainScene } from '@/scenes';

class Game extends Phaser.Game {
    constructor() {
        super(<Phaser.Types.Core.GameConfig>{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            type: Phaser.WEBGL,
            parent: 'content',
            pixelArt: true,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            scene: [
                LoaderScene, 
                MainScene,
                GameScene
            ]
        });
    }
}

new Game();