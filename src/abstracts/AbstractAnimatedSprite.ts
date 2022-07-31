import { AnimatedSprite, Loader } from "pixi.js";

abstract class AbstractAnimatedSprite extends AnimatedSprite implements GameObject {
    constructor(sheetName: string, sequenceName: string) {
        const sheet = Loader.shared.resources[sheetName].spritesheet;
        if (!sheet) throw new Error("Could not load sheet " + sheetName);

        const animation = sheet.animations[sequenceName];
        if (!animation) throw new Error("Could not load animation " + sequenceName);

        super(animation);
    }
}

export default AbstractAnimatedSprite;
