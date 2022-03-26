import { Tile } from '@/components';
import { Scene } from '@/enums';
import { CoordinateUtil } from '@/utils';

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
        const tileWidth = 12 * scale;
        const tileHeight = 12 * scale;

        const centerX = GAME_WIDTH / 2;
        const centerY = (GAME_HEIGHT - tileHeight * (mapHeight - 1)) / 2;

        for (let y = 0; y < mapHeight; y++) {
            for (let x = 0; x < mapWidth; x++) {
                //let coords = CoordinateUtil.toIsometric(x, y);
                //let tx = coords.x * tileWidth;
                //let ty = coords.y * tileHeight;
                /*
                let tile = ;

                tile.setData('row', x);
                tile.setData('col', y);
                tile.setDepth(coords.y);
                */
            
                this.children.add(new Tile(this, x, y, centerX, centerY, 2, scale));
            }
        }
    }

    public update(): void {
    }
}