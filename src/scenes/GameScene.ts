/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "pixi.js";
import AbstractScene from "@/abstracts/AbstractScene";
import Tile from "@/objects/Tile";
import CoordinateUtil from "@/utils/CoordinateUtil";

class GameScene extends AbstractScene {
    private mines!: boolean[][];
    private tiles!: Tile[][];

    static readonly columns = 9;
    static readonly rows = 9;
    static readonly maxMine = 10;

    constructor() {
        super();
        this.mines = [...Array(GameScene.rows)].map((x) => Array(GameScene.columns).fill(false));
        this.tiles = [...Array(GameScene.rows)].map((x) => Array(GameScene.columns).fill(null));
    }

    setup(sceneContainer: Container): void {
        const offsetX = GAME_WIDTH / 2;
        const offsetY = (GAME_HEIGHT - (Tile.tileHeight / 2) * (GameScene.rows - 1)) / 2;

        this.placeMines();
        this.drawMines(sceneContainer, offsetX, offsetY);
    }

    afterBoom(tile: Tile) {
        console.log("boom", tile);
    }

    afterEmpty(tile: Tile) {
        console.log("empty", tile);
    }

    preTransitionUpdate(delta: number): void {}

    sceneUpdate(delta: number): void {}

    private placeMines(): void {
        let mineCount = 0;
        while (mineCount < GameScene.maxMine) {
            const x = Math.floor(Math.random() * GameScene.columns);
            const y = Math.floor(Math.random() * GameScene.rows);

            if (this.mines[x][y] === false) {
                this.mines[x][y] = true;
                mineCount++;
            }
        }
    }

    private drawMines(sceneContainer: Container, offsetX: number, offsetY: number): void {
        for (let posY = 0; posY < GameScene.rows; posY++) {
            for (let posX = 0; posX < GameScene.columns; posX++) {
                const status = CoordinateUtil.getTileStatus(this.mines, posX, posY, GameScene.columns, GameScene.rows);
                const tile = new Tile(this, "block-004", posX, posY, offsetX, offsetY);
                tile.setTileStatus(status);

                sceneContainer.addChild(tile);
                this.tiles[posX][posY] = tile;
            }
        }
    }
}

export default GameScene;
