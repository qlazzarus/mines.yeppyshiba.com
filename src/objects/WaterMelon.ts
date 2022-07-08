import AbstractObject from "@/abstracts/AbstractObject";
import Asset from "@/enums/Asset";

class WaterMelon extends AbstractObject {
    constructor() {
        super(Asset.WATERMELON);
    }
}

export default WaterMelon;
