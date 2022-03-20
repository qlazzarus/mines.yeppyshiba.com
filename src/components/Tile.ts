import { Asset } from '@/enums';

export default class Tile extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene, x: number, y: number, id: string | number) {
        super(scene, x, y, Asset.ISOBLOCKS, id);
    }
}