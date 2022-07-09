/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "pixi.js";
import AbstractScene from "@/abstracts/AbstractScene";
import Tile from "@/objects/Tile";

class GameScene extends AbstractScene {
    private tiles!: Tile[];
    static readonly mapWidth = 10;
    static readonly mapHeight = 10;

    constructor() {
        super();
        this.tiles = [];
    }

    setup(sceneContainer: Container): void {
        const centerX = GAME_WIDTH / 2;
        const centerY = (GAME_HEIGHT - (Tile.tileHeight / 2) * (GameScene.mapHeight - 1)) / 2;

        console.log({ GAME_WIDTH, GAME_HEIGHT, centerX, centerY });

        for (let y = 0; y < GameScene.mapHeight; y++) {
            for (let x = 0; x < GameScene.mapWidth; x++) {
                const tile = new Tile("block-004", x, y, centerX, centerY);

                this.tiles.push(tile);
                sceneContainer.addChild(tile);
            }
        }
    }

    preTransitionUpdate(delta: number): void {}

    sceneUpdate(delta: number): void {}
}

export default GameScene;
