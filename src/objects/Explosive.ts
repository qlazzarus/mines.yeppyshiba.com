import AbstractAnimatedSprite from "@/abstracts/AbstractAnimatedSprite";
import Asset from "@/enums/Asset";

class Explosive extends AbstractAnimatedSprite {
    constructor(x: number, y: number) {
        super(Asset.EXPLOSIVE, "default");

        this.animationSpeed = 0.5;
        this.loop = false;
        this.x = x;
        this.y = y;
        this.play();
    }
}

export default Explosive;
