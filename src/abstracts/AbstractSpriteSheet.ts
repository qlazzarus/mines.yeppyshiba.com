import { Loader, Sprite } from "pixi.js";

abstract class AbstractSpriteSheet extends Sprite implements GameObject {
    constructor(sheetName: string, textureName: string) {
        const sheet = Loader.shared.resources[sheetName].spritesheet;
        super(sheet?.textures[textureName]);
    }
}

export default AbstractSpriteSheet;
