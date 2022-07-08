import AbstractSpriteSheet from "@/abstracts/AbstractSpriteSheet";
import Asset from "@/enums/Asset";

class Tile extends AbstractSpriteSheet {
    constructor(textureName: string) {
        super(Asset.ISOBLOCKS, textureName);
    }
}

export default Tile;
