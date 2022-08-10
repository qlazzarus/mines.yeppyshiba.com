import { BitmapText, IBitmapTextStyle } from "pixi.js";

class AtariFont extends BitmapText implements GameObject {
    constructor(text: string, x: number, y: number, options: Partial<IBitmapTextStyle> = {}) {
        const defaultOptions = {
            fontName: "AtariClassicExtrasmooth",
            fontSize: 20,
        };

        super(text, Object.assign(defaultOptions, options));
        this.x = x;
        this.y = y;
    }
}

export default AtariFont;
