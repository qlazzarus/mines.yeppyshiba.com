import { Tile } from '@/components';
import { Scene } from '@/enums';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super(Scene.GAME_SCENE);
    }

    public preload(): void {
    }

    public create(): void {
        const mapWidth = 10;
        const mapHeight = 10;
        
        const scale = 3;

        const centerX = GAME_WIDTH / 2;
        const centerY = (GAME_HEIGHT - (Tile.tileHeight / 2 * scale) * (mapHeight - 1)) / 2;

        for (let y = 0; y < mapHeight; y++) {
            for (let x = 0; x < mapWidth; x++) {
                this.children.add(new Tile(this, x, y, centerX, centerY, 2, scale));
            }
        }
    }

    public update(): void {
    }
}