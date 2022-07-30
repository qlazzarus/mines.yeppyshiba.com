import AbstractSpriteSheet from "@/abstracts/AbstractSpriteSheet";
import Asset from "@/enums/Asset";
import TileStatus from "@/enums/TileStatus";
import GameScene from "@/scenes/GameScene";
import CoordinateUtil from "@/utils/CoordinateUtil";
import { Polygon } from "pixi.js";

class Tile extends AbstractSpriteSheet {
    static readonly hitOffsetX = 25;
    static readonly tileWidth = 42;
    static readonly tileHeight = 46;
    static readonly tileCoverHeight = 26;
    static readonly initialTint = 0xffffff;
    static readonly clickTint = 0xff0000;

    private posX: number;
    private posY: number;
    private scene: GameScene;
    private tileStatus: TileStatus | null;
    private opened: boolean;
    private flagged: boolean;
    private question: boolean;

    constructor(scene: GameScene, id: string, posX: number, posY: number, offsetX: number, offsetY: number) {
        super(Asset.ISOBLOCKS, id);

        const { x, y } = CoordinateUtil.toIsometric(posX, posY);
        const isoX = x * (Tile.tileWidth / 2);
        const isoY = y * (Tile.tileHeight / 2);

        this.x = isoX + offsetX;
        this.y = isoY + offsetY;
        this.interactive = true;
        this.buttonMode = true;
        this.tileStatus = null;
        this.hitArea = this.getCoverArea();

        this.scene = scene;
        this.posX = posX;
        this.posY = posX;
        this.opened = false;
        this.flagged = false;
        this.question = false;
        this.addListener("pointerover", this.onOver.bind(this));
        this.addListener("pointerout", this.onOut.bind(this));
        this.addListener("click", this.onClick.bind(this));
    }

    getCoverArea() {
        return new Polygon(
            Tile.hitOffsetX,
            0,
            Tile.hitOffsetX + Tile.tileWidth / 2,
            Tile.tileCoverHeight / 2,
            Tile.hitOffsetX,
            Tile.tileCoverHeight,
            Tile.hitOffsetX - Tile.tileWidth / 2,
            Tile.tileCoverHeight / 2,
        );
    }

    drawStatus(): void {
        // TODO
        console.log(this.tileStatus);
    }

    afterClick() {
        this.opened = true;
        this.tint = Tile.initialTint;

        if (this.tileStatus === TileStatus.MINE) {
            this.scene.afterBoom(this);
            return;
        }

        if (this.tileStatus === TileStatus.EMPTY) {
            this.scene.afterEmpty(this);
            return;
        }

        this.drawStatus();
    }

    onClick() {
        if (this.opened) {
            return;
        }

        this.afterClick();
    }

    onOver() {
        if (this.opened) {
            return;
        }

        this.tint = Tile.clickTint;
    }

    onOut() {
        if (this.opened) {
            return;
        }

        this.tint = Tile.initialTint;
    }

    setTileStatus(status: TileStatus) {
        this.tileStatus = status;
    }

    getPosX(): number {
        return this.posX;
    }

    getPosY(): number {
        return this.posY;
    }

    getTileStatus() {
        return this.tileStatus;
    }
}

export default Tile;
