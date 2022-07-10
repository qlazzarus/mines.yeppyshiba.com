import { Loader, Sprite } from "pixi.js";

abstract class AbstractSprite extends Sprite implements GameObject {
    constructor(textureName: string) {
        super(Loader.shared.resources[textureName].texture);
    }
}

export default AbstractSprite;
