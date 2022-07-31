import "@/style.css";
import Bootstrap from "@/engine/Bootstrap";
import Asset from "@/enums/Asset";
import Scene from "@/enums/Scene";
import GameScene from "@/scenes/GameScene";
import LoaderScene from "@/scenes/LoaderScene";
import SimpleFadeTransition from "@/transitions/SimpleFadeTransition";

window.onload = async (): Promise<void> => {
    const assets = {
        [Asset.EXP]: "./assets/exp2_0.json",
        [Asset.ISOBLOCKS]: "./assets/isoblocks.json",
    };

    const scenes = [
        {
            name: Scene.LOADER_SCENE,
            gameScene: new LoaderScene(),
        },
        {
            name: Scene.GAME_SCENE,
            gameScene: new GameScene(),
            fadeInTransition: new SimpleFadeTransition(0.1),
            fadeOutTransition: new SimpleFadeTransition(),
        },
    ];

    const app = new Bootstrap({
        backgroundColor: 0x000000,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
    });

    app.asset(assets);
    app.init(scenes, window, document.body);
};
