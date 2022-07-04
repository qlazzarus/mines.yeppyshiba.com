/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Container } from "pixi.js";
import AbstractGameScene from "@/abstracts/scenes/AbstractGameScene";

class Loader extends AbstractGameScene {
    setup(sceneContainer: Container): void {
        this.sceneState = SceneState.LOAD;
        
        const loader = this.getLoader();
        loader.onComplete.once(this.onLoadComplete);
        loader.onError.once(this.onLoadError);
    }

    preTransitionUpdate(delta: number): void {}

    sceneUpdate(delta: number): void {}
    
    private onLoadComplete(): void {
        console.log("onLoadComplete");
    }

    private onLoadError(): void {
        console.log("onLoadError");
    }    
}

export default Loader;
