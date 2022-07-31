/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "pixi.js";
import AbstractScene from "@/abstracts/AbstractScene";
import GameStatus from "@/enums/GameStatus";
import TileStatus from "@/enums/TileStatus";
import Explosive from "@/objects/Explosive";
import Tile from "@/objects/Tile";
import NumberTile from "@/objects/NumberTile";

class GameScene extends AbstractScene {
    private container!: Container;

    private mines!: TileStatus[][];
    private tiles!: Tile[][];
    private mineQueue: Matrix[];
    private textQueue: Matrix[];
    private openQueue: Tile[];
    private status: GameStatus;

    static readonly columns = 9;
    static readonly rows = 9;
    static readonly maxMine = 10;
    static readonly unkownTile = "block-004";
    static readonly openedTile = "block-006";

    constructor() {
        super();
        this.mines = [...Array(GameScene.rows)].map((x) => Array(GameScene.columns).fill(TileStatus.EMPTY));
        this.mineQueue = [];
        this.textQueue = [];
        this.openQueue = [];
        this.tiles = [...Array(GameScene.rows)].map((x) => Array(GameScene.columns).fill(null));
        this.status = GameStatus.PLAYING;
    }

    setup(sceneContainer: Container): void {
        const offsetX = GAME_WIDTH / 2;
        const offsetY = (GAME_HEIGHT - (Tile.tileHeight / 2) * (GameScene.rows - 1)) / 2;

        this.container = sceneContainer;
        this.placeMines();
        this.setTileStatus();
        this.drawMines(offsetX, offsetY);
        console.log(this.mines);
    }

    afterClick(tile: Tile) {
        if (this.status !== GameStatus.PLAYING) {
            return;
        }

        const x = tile.getPosX();
        const y = tile.getPosY();
        const tileStatus = this.mines[x][y];

        switch (tileStatus) {
            case TileStatus.EMPTY:
                this.emptyTile(tile);
                return;
            case TileStatus.MINE:
                this.gameOver(tile);
                return;
            default:
                this.numberTile(tile, tileStatus);
                return;
        }
    }

    preTransitionUpdate(delta: number): void {}

    sceneUpdate(delta: number): void {
        const queue = this.openQueue;
        if (queue.length === 0) {
            return;
        }

        const tile = queue.pop();
        if (tile) tile.onClick();
    }

    private numberTile(tile: Tile, status: TileStatus): void {
        console.log(this.openQueue);

        const number = new NumberTile(status + "");
        number.x = tile.x + Tile.tileWidth / 2 - 5;
        number.y = tile.y;
        tile.setSheetTexture(GameScene.openedTile);
        this.container.addChild(number);
    }

    private emptyTile(tile: Tile): void {
        if (tile.isOpened()) {
            return;
        }

        tile.setSheetTexture(GameScene.openedTile);

        const posX = tile.getPosX();
        const posY = tile.getPosY();
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

        vectors.forEach(([vecX, vecY]) => {
            const x = posX + vecX;
            const y = posY + vecY;

            if (x < 0 || y < 0) return;
            if (x >= GameScene.columns || y >= GameScene.rows) return;

            const status = this.mines[x][y];
            const vectorTile = this.tiles[x][y];
            if (status !== TileStatus.MINE) {
                this.openQueue.push(vectorTile);
            }
        });
    }

    private gameOver(tile: Tile): void {
        console.log(this.openQueue);

        const explosive = new Explosive();
        explosive.play();
        explosive.x = tile.x;
        explosive.y = tile.y - Tile.tileHeight / 2;
        this.status = GameStatus.OVER;
        this.container.addChild(explosive);
    }

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

                if (x < 0 || y < 0) return;
                if (x >= GameScene.columns || y >= GameScene.rows) return;

                if (this.mines[x][y] !== TileStatus.MINE) {
                    this.mines[x][y] = this.mines[x][y] + 1;
                }
            });
        });
    }

    private drawMines(offsetX: number, offsetY: number): void {
        for (let posY = 0; posY < GameScene.rows; posY++) {
            for (let posX = 0; posX < GameScene.columns; posX++) {
                const tile = new Tile(this, GameScene.unkownTile, posX, posY, offsetX, offsetY);
                this.tiles[posX][posY] = tile;
                this.container.addChild(tile);
            }
        }
    }

    getStatus(): GameStatus {
        return this.status;
    }
}

export default GameScene;
