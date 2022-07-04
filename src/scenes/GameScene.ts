import { Container, Sprite } from "pixi.js";
import AbstractGameScene from "@/abstracts/scenes/AbstractGameScene";
import Asset from "@/enums/Asset";

class GameScene extends AbstractGameScene {
    private melon!: Sprite;

    setup(sceneContainer: Container): void {
        this.melon = new Sprite(this.getTexture(Asset.WATERMELON).texture);
        this.melon.anchor.x = 0.5;
        this.melon.anchor.y = 0.5;

        this.melon.x = this.app.renderer.width / 2;
        this.melon.y = this.app.renderer.height / 2;

        sceneContainer.addChild(this.melon);
    }

    preTransitionUpdate(delta: number): void {
        this.melon.rotation += 0.1 * delta;
    }

    sceneUpdate(delta: number): void {
        this.melon.rotation += 0.1 * delta;
    }
}

export default GameScene;
