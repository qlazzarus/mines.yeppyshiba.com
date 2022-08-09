import { Application, Container } from "pixi.js";
import AbstractScene from "@/abstracts/AbstractScene";
import TransitionType from "@/enums/TransitionType";
import SceneState from "@/enums/SceneState";

class Engine {
    private sceneSettings: SceneSettings[];
    private app: Application;
    private currentScene?: SceneSettings;

    constructor(app: Application) {
        this.app = app;
        this.sceneSettings = [];
    }

    init(scenes: SceneSettings[]) {
        if (scenes.length === 0) {
            console.error("SCENES NOT FOUND");
            return;
        }

        this.sceneSettings = scenes;
        this.currentScene = scenes[0];

        scenes.forEach((sceneSettings: SceneSettings) => {
            sceneSettings.gameScene.init(this.app, this.sceneSwitcher);
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

        const gameScene: AbstractScene = sceneSettings.gameScene;
        gameScene.setSceneState(SceneState.LOAD);
        gameScene.setup(sceneContainer);

        sceneSettings.fadeInTransition &&
            sceneSettings.fadeInTransition.init(this.app, TransitionType.FADE_IN, sceneContainer);
        sceneSettings.fadeOutTransition &&
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
