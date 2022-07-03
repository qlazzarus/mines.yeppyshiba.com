/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Container } from "pixi.js";
import AbstractGameScene from "@/abstracts/scenes/AbstractGameScene";

class Loader extends AbstractGameScene {
    setup(sceneContainer: Container): void {}

    preTransitionUpdate(delta: number): void {}

    sceneUpdate(delta: number): void {}
}

export default Loader;
