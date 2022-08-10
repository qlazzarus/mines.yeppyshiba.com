/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "pixi.js";
import AbstractScene from "@/abstracts/AbstractScene";
import GameStatus from "@/enums/GameStatus";
import TileStatus from "@/enums/TileStatus";
import Explosive from "@/objects/Explosive";
import Tile from "@/objects/Tile";
import AtariFont from "@/objects/AtariFont";
import Flag from "@/objects/Flag";

class GameScene extends AbstractScene {
    private container!: Container;

    private mines!: TileStatus[][];
    private flagged!: (Flag | null)[][];
    private tiles!: Tile[][];
    private mineQueue: Matrix[];
    private textQueue: Matrix[];
    private openQueue: Map<string, Matrix>;
    private status: GameStatus;
    private flagCount = 0;
    private timer = 0;
    private emptyTileProcess: boolean;
    private clock!: AtariFont;
    private mineCounter!: AtariFont;

    static readonly columns = 9;
    static readonly rows = 9;
    static readonly maxMine = 10;
    static readonly unkownTile = "block-004";
    static readonly openedTile = "block-006";

    constructor() {
        super();
        this.mines = [...Array(GameScene.rows)].map((x) => Array(GameScene.columns).fill(TileStatus.EMPTY));
        this.flagged = [...Array(GameScene.rows)].map((x) => Array(GameScene.columns).fill(null));
        this.mineQueue = [];
        this.textQueue = [];
        this.openQueue = new Map<string, Matrix>();
        this.tiles = [...Array(GameScene.rows)].map((x) => Array(GameScene.columns).fill(null));
        this.status = GameStatus.READY;
        this.emptyTileProcess = false;
    }

    setup(sceneContainer: Container): void {
        const offsetX = GAME_WIDTH / 2;
        const offsetY = (GAME_HEIGHT - (Tile.tileHeight / 2) * (GameScene.rows - 1)) / 2;

        this.container = sceneContainer;
        this.placeMines();
        this.setTileStatus();

        this.drawMines(offsetX, offsetY);
        this.drawUi();

        const debug = new AtariFont("debug", 10, 10);
        debug.interactive = true;
        debug.buttonMode = true;
        debug.addListener(
            "click",
            (() => {
                console.log(this.status);
            }).bind(this),
        );

        sceneContainer.addChild(debug);
    }

    placeFlag(tile: Tile) {
        this.flagCount++;
        tile.setFlagged();

        const x = tile.getPosX();
        const y = tile.getPosY();
        const flag = new Flag(tile.x + (Tile.tileWidth / 8) * 5, tile.y - Tile.tileHeight / 2);
        this.container.addChild(flag);
        this.flagged[x][y] = flag;
    }

    removeFlag(tile: Tile) {
        const x = tile.getPosX();
        const y = tile.getPosY();
        const flag = this.flagged[x][y];

        if (!flag) {
            return;
        }

        this.flagCount--;
        tile.setUnflagged();
        this.container.removeChild(flag);
        this.flagged[x][y] = null;
    }

    afterRightClick(tile: Tile) {
        if (this.status === GameStatus.READY) {
            this.onPlaying();
        }

        if (this.status !== GameStatus.PLAYING) {
            return;
        }

        if (tile.isOpened()) {
            return;
        }

        tile.isFlagged() ? this.removeFlag(tile) : this.placeFlag(tile);
    }

    afterClick(tile: Tile) {
        if (this.status === GameStatus.READY) {
            this.onPlaying();
        }

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
        this.emptyTileAfterProcess();
        this.timerProcess();
        this.mineCountProcess();
    }

    private numberTile(tile: Tile, status: TileStatus): void {
        tile.setOpened();

        const number = new AtariFont(status + "", tile.x + Tile.tileWidth / 2 - 5, tile.y);
        number.tint = 0x000000;
        this.container.addChild(number);
    }

    private timerProcess(): void {
        if (this.status !== GameStatus.PLAYING) return;
        if (!this.timer) return;
        if (!this.clock) return;

        // cache
        const diff = Math.floor((Date.now() - this.timer) / 1000);
        const tobe = (diff < 10 ? "0" : "") + diff;
        if (this.clock.text === tobe) return;

        this.clock.text = tobe;
    }

    private mineCountProcess(): void {
        if (this.status !== GameStatus.PLAYING) return;
        if (!this.mineCounter) return;

        // cache
        const tobe = GameScene.maxMine - this.flagCount + "";
        if (this.mineCounter.text === tobe) return;

        this.mineCounter.text = tobe;
    }

    private emptyTileAfterProcess(): void {
        if (this.emptyTileProcess) return;
        const queue = this.openQueue;
        if (queue.size === 0) return;

        this.emptyTileProcess = true;

        for (const [key, [x, y]] of queue) {
            const tile = this.tiles[x][y];

            this.removeFlag(tile);

            tile.setOpened();
            queue.delete(key);
        }

        this.emptyTileProcess = false;
    }

    private emptyTile(tile: Tile): void {
        if (tile.isOpened()) {
            return;
        }

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
            if (this.openQueue.get(`${x}_${y}`)) return;

            const status = this.mines[x][y];
            if (status !== TileStatus.MINE) {
                this.openQueue.set(`${x}_${y}`, [x, y]);
                this.tiles[x][y].recursiveClick();
            }
        });
    }

    private gameOver(tile: Tile): void {
        tile.setOpened();

        const explosive = new Explosive(tile.x, tile.y - Tile.tileHeight / 2);
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
                const tile = new Tile(this, posX, posY, offsetX, offsetY);
                this.tiles[posX][posY] = tile;
                this.container.addChild(tile);
            }
        }
    }

    private drawUi() {
        this.clock = new AtariFont("", GAME_WIDTH / 2, 10);
        this.clock.align = "center";
        this.container.addChild(this.clock);

        this.mineCounter = new AtariFont("", (GAME_WIDTH / 4) * 3, 10);
        this.mineCounter.align = "center";
        this.container.addChild(this.mineCounter);
    }

    getStatus(): GameStatus {
        return this.status;
    }

    onPlaying(): void {
        this.status = GameStatus.PLAYING;
        this.timer = Date.now();
    }
}

export default GameScene;
