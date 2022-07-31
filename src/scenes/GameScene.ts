/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "pixi.js";
import AbstractScene from "@/abstracts/AbstractScene";
import TileStatus from "@/enums/TileStatus";
import Tile from "@/objects/Tile";

class GameScene extends AbstractScene {
    private mines!: TileStatus[][];
    private tiles!: Tile[][];
    private mineQueue: Matrix[];

    static readonly columns = 9;
    static readonly rows = 9;
    static readonly maxMine = 10;

    constructor() {
        super();
        this.mines = [...Array(GameScene.rows)].map((x) => Array(GameScene.columns).fill(TileStatus.EMPTY));
        this.mineQueue = [];
        this.tiles = [...Array(GameScene.rows)].map((x) => Array(GameScene.columns).fill(null));
    }

    setup(sceneContainer: Container): void {
        const offsetX = GAME_WIDTH / 2;
        const offsetY = (GAME_HEIGHT - (Tile.tileHeight / 2) * (GameScene.rows - 1)) / 2;

        this.placeMines();
        this.setTileStatus();
        this.drawMines(sceneContainer, offsetX, offsetY);
    }

    afterClick(tile: Tile) {
        console.log("afterClick", tile);
    }

    preTransitionUpdate(delta: number): void {}

    sceneUpdate(delta: number): void {}

    private placeMines(): void {
        let mineCount = 0;
        while (mineCount < GameScene.maxMine) {
            const x = Math.floor(Math.random() * GameScene.columns);
            const y = Math.floor(Math.random() * GameScene.rows);

            if (this.mines[x][y] === TileStatus.EMPTY) {
                this.mines[x][y] = TileStatus.MINE;
                this.mineQueue.push([x, y]);
                mineCount++;
            }
        }
    }

    private setTileStatus(): void {
        const vectors = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ];

        this.mineQueue.forEach(([posX, posY]) => {
            vectors.forEach(([vecX, vecY]) => {
                const x = posX + vecX;
                const y = posY + vecY;

                if (
                    x > 0 &&
                    x < GameScene.columns &&
                    y > 0 &&
                    y < GameScene.rows &&
                    this.mines[x][y] !== TileStatus.MINE
                ) {
                    this.mines[x][y] = this.mines[x][y] + 1;
                }
            });
        });
    }

    private drawMines(sceneContainer: Container, offsetX: number, offsetY: number): void {
        for (let posY = 0; posY < GameScene.rows; posY++) {
            for (let posX = 0; posX < GameScene.columns; posX++) {
                const tile = new Tile(this, "block-004", posX, posY, offsetX, offsetY);
                this.tiles[posX][posY] = tile;

                sceneContainer.addChild(tile);
            }
        }
    }
}

export default GameScene;
