/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Loader, Sprite } from "pixi.js";

abstract class AbstractSprite extends Sprite implements GameObject {
    constructor(textureName: string) {
        super(Loader.shared.resources[textureName].texture);
    }
}

export default AbstractSprite;
