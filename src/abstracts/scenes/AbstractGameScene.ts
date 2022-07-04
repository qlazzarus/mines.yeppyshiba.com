import { Application, Container, Loader, LoaderResource } from "pixi.js";
import SceneState from "@/enums/SceneState";

/**
 * Base implementation of a scene. Provides lifecycle update logic.
 * @abstract
 * @class AbstractGameScene
 * @implements {GameScene}
 */
abstract class AbstractGameScene implements GameScene {
    private sceneState!: SceneState;
    protected app!: Application;
    protected loader!: Loader;
    protected sceneSwitcher!: (sceneName: string) => void;
    protected fadeInSceneTransition?: SceneTransition;
    protected fadeOutSceneTransition?: SceneTransition;
    protected sceneContainer!: Container;
    private onDone!: () => void;

    set fadeInTransition(fadeInSceneTransition: SceneTransition | undefined) {
        this.fadeInSceneTransition = fadeInSceneTransition;
    }

    set fadeOutTransition(fadeOutSceneTransition: SceneTransition | undefined) {
        this.fadeOutSceneTransition = fadeOutSceneTransition;
    }

    /**
     * Basic initialization of a scene, passing in the PIXI.APP
     * @param app pixi.application
     * @param sceneSwitcher sceneSwitcher
     */
    init(app: Application, loader: Loader, sceneSwitcher: (sceneName: string) => void): void {
        this.app = app;
        this.loader = loader;
        this.sceneSwitcher = sceneSwitcher;
    }

    /**
     * Setup the scene for usage.
     * @param sceneContainer sceneContainer
     */
    abstract setup(sceneContainer: Container): void;

    /**
     * Handler that is called before the transition has completed.
     * To be used when some motion is necessary before the full scene update has started.
     * @param delta delta
     */
    abstract preTransitionUpdate(delta: number): void;

    /**
     * Core scene update loop.
     * @param delta delta
     */
    abstract sceneUpdate(delta: number): void;

    getSceneState(): SceneState {
        return this.sceneState;
    }

    setSceneState(sceneState: SceneState): void {
        this.sceneState = sceneState;

        if (sceneState === SceneState.DONE && this.onDone) {
            this.onDone();
        }
    }

    /**
     * Scene lifecycle update loop.
     * @param delta delta
     */
    update(delta: number): void {
        switch (this.sceneState) {
            case SceneState.LOAD:
                if (this.fadeInSceneTransition) {
                    this.fadeInSceneTransition.update(delta, () => this.setSceneState(SceneState.PROCESS));
                } else {
                    this.setSceneState(SceneState.PROCESS);
                }

                this.preTransitionUpdate(delta);
                break;
            case SceneState.PROCESS:
                this.sceneUpdate(delta);
                break;
            case SceneState.FINALIZE:
                if (this.fadeOutSceneTransition) {
                    this.fadeOutSceneTransition.update(delta, () => this.setSceneState(SceneState.DONE));
                } else {
                    this.setSceneState(SceneState.DONE);
                }

                break;
        }
    }

    setFinalizing(onDone: () => void) {
        this.onDone = onDone;
        this.setSceneState(SceneState.FINALIZE);
    }

    getLoader() {
        return this.loader;
    }

    getTexture(textureName: string): LoaderResource {
        return this.loader.resources[textureName];
    }
}

export default AbstractGameScene;
