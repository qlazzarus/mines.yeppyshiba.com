/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Container } from "pixi.js";
import AbstractGameScene from "@/abstracts/scenes/AbstractGameScene";
import Scene from "@/enums/Scene";

class LoaderScene extends AbstractGameScene {
    setup(sceneContainer: Container): void {
        const loader = this.getLoader();
        loader.onComplete.once(this.onLoadComplete.bind(this));
        loader.onError.once(this.onLoadError.bind(this));
    }

    preTransitionUpdate(delta: number): void {}

    sceneUpdate(delta: number): void {}

    private onLoadComplete(): void {
        this.sceneSwitcher(Scene.GAME_SCENE);
    }

    private onLoadError(): void {
        console.log("onLoadError");
    }
}

export default LoaderScene;
