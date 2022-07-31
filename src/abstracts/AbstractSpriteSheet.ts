import { Loader, Sprite, Spritesheet } from "pixi.js";

abstract class AbstractSpriteSheet extends Sprite implements GameObject {
    private sheet!: Spritesheet;

    constructor(sheetName: string, textureName: string) {
        const sheet = Loader.shared.resources[sheetName].spritesheet;
        if (!sheet) throw new Error("Could not load sheet " + sheetName);

        super(sheet.textures[textureName]);
        this.sheet = sheet;
    }

    setSheetTexture(textureName: string) {
        this.texture = this.sheet.textures[textureName];
    }
}

export default AbstractSpriteSheet;
