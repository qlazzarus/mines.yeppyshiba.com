import { Asset } from "@/enums";
import { CoordinateUtil } from "@/utils";

export default class Tile extends Phaser.GameObjects.Image {
    static readonly tileWidth = 24;
    static readonly tileHeight = 24;
    static readonly frameWidth = 32;
    static readonly frameHeight = 32;

    constructor(
        scene: Phaser.Scene,
        posX: number,
        posY: number,
        offsetX: number,
        offsetY: number,
        id: string | number,
        scale?: number,
    ) {
        const { x, y } = CoordinateUtil.toIsometric(posX, posY);
        const isoX = x * ((Tile.tileWidth / 2) * (scale ?? 1));
        const isoY = y * ((Tile.tileHeight / 2) * (scale ?? 1));

        super(scene, isoX + offsetX, isoY + offsetY, Asset.MCBLOCKS, id);

        if (scale) this.setScale(scale);

        this.setData("row", posX);
        this.setData("col", posY);
        this.setDepth(y);

        this.initInteractive();
    }

    /*
    private initHitArea(): Phaser.Geom.Polygon {
        const { x, y } = this;
        return new Phaser.Geom.Polygon([
            x, y - Tile.frameHeight, // top
            x + Tile.frameWidth, y - (Tile.frameHeight / 2), // right
            x, y, // bottom
            x - Tile.frameWidth, y - (Tile.frameHeight / 2), // left
        ]);
    }
    */

    private initInteractive(): void {
        this.setInteractive();
        this.on("pointermove", () => this.setTint(0xff0000));
        this.on("pointerout", () => this.clearTint());
    }
}
