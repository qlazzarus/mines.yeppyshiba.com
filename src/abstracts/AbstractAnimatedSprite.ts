import { AnimatedSprite, Loader } from "pixi.js";

abstract class AbstractAnimatedSprite extends AnimatedSprite implements GameObject {
    constructor(sheetName: string, sequenceName: string) {
        const sheet = Loader.shared.resources[sheetName].spritesheet;
        super(sheet?.animations[sequenceName]);
    }
}

export default AbstractAnimatedSprite;
