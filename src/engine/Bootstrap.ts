import { Application, Loader, IApplicationOptions } from "pixi.js";
import Engine from "./Engine";

class Bootstrap {
    private app: Application;
    private loader: Loader;
    private engine: Engine;

    constructor(options: IApplicationOptions) {
        this.app = new Application(options);
        this.loader = Loader.shared;
        this.engine = new Engine(this.app);
    }

    asset(queue: { [index: string]: string }): void {
        Object.entries(queue).forEach(([key, value]) => this.loader.add(key, value));
    }

    init(scenes: SceneSettings[], window: Window, body: HTMLElement): void {
        this.engine.init(scenes);

        this.loaderInit();
        this.resizeInit(window, body);
        this.tickerInit();
    }

    private loaderInit(): void {
        this.loader.load();
    }

    private resizeInit(window: Window, body: HTMLElement): void {
        window.addEventListener("resize", this.onResize.bind(this));
        body.appendChild(this.app.view);
        this.onResize();
    }

    private onResize(event?: Event): void {
        const target = (event && <Window>event.target) || window || null;
        const innerWidth = (target && target.innerWidth) || GAME_WIDTH;
        const innerHeight = (target && target.innerHeight) || GAME_HEIGHT;

        const scaleX = innerWidth / GAME_WIDTH;
        const scaleY = innerHeight / GAME_HEIGHT;
        const scaled = Math.min(scaleX, scaleY);

        this.app.renderer.resize(GAME_WIDTH * scaled, GAME_HEIGHT * scaled);
        this.app.stage.scale.x = scaled;
        this.app.stage.scale.y = scaled;
    }

    private tickerInit(): void {
        this.app.ticker.add((delta: number) => this.engine.update(delta));
    }
}

export default Bootstrap;
