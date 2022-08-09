import AbstractAnimatedSprite from "@/abstracts/AbstractAnimatedSprite";
import Asset from "@/enums/Asset";

class Flag extends AbstractAnimatedSprite {
    constructor() {
        super(Asset.FLAG, "default");

        this.animationSpeed = 0.5;
        this.loop = false;
    }
}

export default Flag;
