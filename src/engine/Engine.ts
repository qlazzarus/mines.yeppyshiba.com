import { Application, Container, Loader } from "pixi.js";
import AbstractGameScene from "@/abstracts/scenes/AbstractGameScene";
import TransitionType from "@/enums/TransitionType";

class Engine {
    private sceneSettings: SceneSettings[];
    private app: Application;
    private loader: Loader;
    private currentScene?: SceneSettings;

    constructor(app: Application, loader: Loader) {
        this.app = app;
        this.loader = loader;
        this.sceneSettings = [];
    }

    init(scenes: SceneSettings[]) {
        this.sceneSettings = scenes;
        this.sceneSettings.forEach((sceneSettings: SceneSettings) => {
            sceneSettings.gameScene.init(this.app, this.loader, this.sceneSwitcher);
        });

        // Finding the scene with the lowest index
        this.currentScene = scenes.reduce((prev, curr) => {
            if (prev === undefined) {
                return curr;
            } else {
                return prev.index > curr.index ? curr : prev;
            }
        });

        this.setupScene(this.currentScene);
    }

    /**
     * Scene switching mechanism. Finalizes the currenst scene and setups
     * the target scene.
     * @memberof Engine
     */
    sceneSwitcher = (sceneName: string) => {
        if (!this.currentScene) {
            return;
        }

        this.currentScene.gameScene.setFinalizing(() => {
            const scene = this.sceneSettings.find((sceneSettings) => {
                return sceneSettings.name === sceneName;
            });

            if (scene) {
                this.setupScene(scene);
                this.currentScene = scene;
            } else {
                console.error("SCENE NOT FOUND: " + sceneName);
            }
        });
    };

    /**
     * Adds a scene to the PIXI.APP.STAGE, removing all previous children.
     * @param sceneSettings sceneSettings
     */
    private setupScene(sceneSettings: SceneSettings) {
        this.app.stage.removeChildren();

        const sceneContainer = new Container();
        this.app.stage.addChild(sceneContainer);

        const gameScene: AbstractGameScene = sceneSettings.gameScene;
        gameScene.setup(sceneContainer);

        sceneSettings.fadeInTransition.init(this.app, TransitionType.FADE_IN, sceneContainer);
        sceneSettings.fadeOutTransition.init(this.app, TransitionType.FADE_OUT, sceneContainer);

        gameScene.fadeInTransition = sceneSettings.fadeOutTransition;
        gameScene.fadeOutTransition = sceneSettings.fadeInTransition;
    }

    /**
     * PIXI.APP update loop.
     * @param delta delta
     */
    update(delta: number) {
        if (!this.currentScene) {
            return;
        }

        this.currentScene.gameScene.update(delta);
    }
}

export default Engine;
