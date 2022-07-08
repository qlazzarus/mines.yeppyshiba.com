import type { Application, Container } from "pixi.js";
import type TransitionType from "@/enums/TransitionType";
import type AbstractScene from "@/abstracts/AbstractScene";

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
        gameScene: AbstractScene;
        fadeInTransition?: SceneTransition;
        fadeOutTransition?: SceneTransition;
    }

    interface Scene {
        sceneUpdate(delta: number): void;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface GameObject {}

    type Assets = {
        type: "image" | "audio";
        path: string;
    };
}
