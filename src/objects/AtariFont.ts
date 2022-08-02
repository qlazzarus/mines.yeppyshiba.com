import { BitmapText, IBitmapTextStyle } from "pixi.js";

class AtariFont extends BitmapText implements GameObject {
    constructor(text: string, options: Partial<IBitmapTextStyle> = {}) {
        const defaultOptions = {
            fontName: "AtariClassicExtrasmooth",
            fontSize: 20,
        };

        super(text, Object.assign(defaultOptions, options));
    }
}

export default AtariFont;
