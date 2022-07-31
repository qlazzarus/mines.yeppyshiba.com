import AbstractAnimatedSprite from "@/abstracts/AbstractAnimatedSprite";
import Asset from "@/enums/Asset";

class Explosive extends AbstractAnimatedSprite {
    constructor() {
        super(Asset.EXPLOSIVE, "default");

        this.animationSpeed = 0.5;
        this.loop = false;
    }
}

export default Explosive;
