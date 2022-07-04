import "@/style.css";
import Bootstrap from "@/engine/Bootstrap";
import Asset from "@/enums/Asset";
import Clockwise from "@/scenes/Clockwise";
import CounterClockwise from "@/scenes/CounterClockwise";
import Loader from "@/scenes/Loader";
import SimpleFadeTransition from "@/transitions/SimpleFadeTransition";

window.onload = async (): Promise<void> => {
    const assets = {
        [Asset.RABBIT]: "./assets/simpleSpriteSheet.json",
        [Asset.PIXIE]: "./assets/spine-assets/pixie.json",
        [Asset.WATERMELON]: "./assets/watermelon.png",
    };

    const scenes = [
        {
            name: "loader",
            gameScene: new Loader(),
        },
        {
            name: "clockwise",
            gameScene: new Clockwise(),
            fadeInTransition: new SimpleFadeTransition(0.1),
            fadeOutTransition: new SimpleFadeTransition(),
        },
        {
            name: "counterClockwise",
            gameScene: new CounterClockwise(),
            fadeInTransition: new SimpleFadeTransition(0.1),
            fadeOutTransition: new SimpleFadeTransition(),
        },
    ];

    const app = new Bootstrap({
        backgroundColor: 0xff0000,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
    });

    app.asset(assets);
    app.init(scenes, window, document.body);
};
