/* eslint-disable @typescript-eslint/no-unused-vars */
import AbstractSpriteSheet from "@/abstracts/AbstractSpriteSheet";
import Asset from "@/enums/Asset";
import CoordinateUtil from "@/utils/CoordinateUtil";

class Tile extends AbstractSpriteSheet {
    static readonly tileWidth = 42;
    static readonly tileHeight = 46;

    constructor(id: string, posX: number, posY: number, offsetX: number, offsetY: number) {
        super(Asset.ISOBLOCKS, id);

        const { x, y } = CoordinateUtil.toIsometric(posX, posY);
        const isoX = x * (Tile.tileWidth / 2);
        const isoY = y * (Tile.tileHeight / 2);

        this.x = isoX + offsetX;
        this.y = isoY + offsetY;
        this.interactive = true;
        this.addListener("pointerup", this.onClick.bind(this));
    }

    onClick() {
        console.log("hello world");
    }
}

export default Tile;
