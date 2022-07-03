import { Application, Container, Graphics, Sprite } from "pixi.js";
import TransitionType from "@/enums/TransitionType";

class SimpleFadeTransition implements SceneTransition {
    private app!: Application;
    private type!: TransitionType;
    private transitionSprite!: Sprite;
    private updateStep: number;

    constructor(updateStep = 0.01) {
        this.updateStep = updateStep;
    }

    init(app: Application, type: TransitionType, sceneContainer: Container): void {
        this.app = app;
        this.type = type;
        this.createTransitionSprite(type);
        sceneContainer.addChild(this.transitionSprite);
    }

    private createTransitionSprite(type: TransitionType) {
        const { width, height } = this.app.renderer;

        const graphics = new Graphics();
        graphics.beginFill(0x000000);
        graphics.drawRect(0, 0, width, height);
        graphics.endFill();

        this.transitionSprite = new Sprite(
            this.app.renderer.generateTexture(graphics, {
                scaleMode: 1,
                resolution: 1,
            }),
        );

        const alpha = type === TransitionType.FADE_OUT ? 1 : 0;
        this.transitionSprite.alpha = alpha;
    }

    update(delta: number, callback: () => void): void {
        switch (this.type) {
            case TransitionType.FADE_OUT:
                if (this.transitionSprite.alpha > 0) {
                    this.transitionSprite.alpha -= this.updateStep * delta;
                } else {
                    callback();
                }
                break;

            case TransitionType.FADE_IN:
                if (this.transitionSprite.alpha < 1) {
                    this.transitionSprite.alpha += this.updateStep * delta;
                } else {
                    callback();
                }
                break;
        }
    }
}

export default SimpleFadeTransition;
