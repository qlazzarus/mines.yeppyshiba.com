/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Container, Loader } from "pixi.js";
import AbstractScene from "@/abstracts/AbstractScene";
import Scene from "@/enums/Scene";

class LoaderScene extends AbstractScene {
    setup(sceneContainer: Container): void {
        const loader = Loader.shared;
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
