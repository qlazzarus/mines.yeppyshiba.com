import type { Application, Container } from "pixi.js";
import type TransitionType from "@/enums/TransitionType";
import type AbstractGameScene from "@/abstracts/scenes/AbstractGameScene";

declare global {
    const VERSION: string;
    const GAME_WIDTH: number;
    const GAME_HEIGHT: number;

    interface SceneTransition {
        init(app: Application, type: TransitionType, sceneContainer: Container): void;
        update(delta: number, callback: () => void): void;
    }

    interface SceneSettings {
        name: string;
        gameScene: AbstractGameScene;
        fadeInTransition?: SceneTransition;
        fadeOutTransition?: SceneTransition;
    }

    interface GameScene {
        sceneUpdate(delta: number): void;
    }

    type Assets = {
        type: "image" | "audio";
        path: string;
    };
}
