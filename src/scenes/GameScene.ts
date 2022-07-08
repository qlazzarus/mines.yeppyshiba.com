import { Container, Sprite } from "pixi.js";
import AbstractScene from "@/abstracts/AbstractScene";
import WaterMelon from "@/objects/WaterMelon";

class GameScene extends AbstractScene {
    private melon!: Sprite;

    setup(sceneContainer: Container): void {
        this.melon = new WaterMelon();
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
