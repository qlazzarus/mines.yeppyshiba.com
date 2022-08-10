import { filters } from "pixi.js";
import AbstractAnimatedSprite from "@/abstracts/AbstractAnimatedSprite";
import Asset from "@/enums/Asset";

class Flag extends AbstractAnimatedSprite {
    constructor(x: number, y: number) {
        super(Asset.FLAG, "default");

        const colorFilter = new filters.ColorMatrixFilter();
        colorFilter.negative(true);

        this.animationSpeed = 0.25;
        this.loop = true;
        this.x = x;
        this.y = y;
        this.scale.x *= 0.125;
        this.scale.y *= 0.125;
        this.filters = [colorFilter];
        this.play();
    }
}

export default Flag;
