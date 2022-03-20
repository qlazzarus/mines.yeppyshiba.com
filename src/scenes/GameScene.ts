import { Tile } from '@/components';
import { Scene } from '@/enums';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super(Scene.GAME_SCENE);
    }

    public preload(): void {
    }

    public create(): void {
        const mapWidth = 20;
        const mapHeight = 20;
        
        const tileWidthHalf = 20;
        const tileHeightHalf = 12;

        const centerX = GAME_WIDTH / 2;
        const centerY = GAME_HEIGHT / 2;

        const blocks = [];

        for (let y = 0; y < mapHeight; y++) {
            for (let x = 0; x < mapWidth; x++) {
                let tx = (x - y) * tileWidthHalf;
                let ty = (x + y) * tileHeightHalf;

                let block = (x % 2 === 0 || y % 2 === 0) ? 'block-000' : 'block-001';
                
                let tile = new Tile(this, centerX + tx, centerY + ty, block);

                tile.setData('row', x);
                tile.setData('col', y);
                tile.setDepth(centerY + ty);
                
                blocks.push(tile);
                this.children.add(tile);
            }
        }
    }

    public update(): void {
    }
}