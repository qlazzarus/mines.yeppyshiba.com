import { Polygon } from "pixi.js";
import AbstractSpriteSheet from "@/abstracts/AbstractSpriteSheet";
import Asset from "@/enums/Asset";
import GameStatus from "@/enums/GameStatus";
import GameScene from "@/scenes/GameScene";
import CoordinateUtil from "@/utils/CoordinateUtil";

class Tile extends AbstractSpriteSheet {
    static readonly hitOffsetX = 25;
    static readonly tileWidth = 42;
    static readonly tileHeight = 46;
    static readonly tileCoverHeight = 26;
    static readonly initialTint = 0xffffff;
    static readonly clickTint = 0xff0000;
    static readonly unkownTile = "block-004";
    static readonly openedTile = "block-006";

    private posX: number;
    private posY: number;
    private scene: GameScene;
    private opened: boolean;
    private flagged: boolean;

    constructor(scene: GameScene, posX: number, posY: number, offsetX: number, offsetY: number) {
        super(Asset.ISOBLOCKS, Tile.unkownTile);

        const { x, y } = CoordinateUtil.toIsometric(posX, posY);
        const isoX = x * (Tile.tileWidth / 2);
        const isoY = y * (Tile.tileHeight / 2);

        this.x = isoX + offsetX;
        this.y = isoY + offsetY;
        this.interactive = true;
        this.buttonMode = true;
        this.hitArea = this.getCoverArea();

        this.scene = scene;
        this.posX = posX;
        this.posY = posY;
        this.opened = false;
        this.flagged = false;
        this.addListener("pointerover", this.onOver.bind(this));
        this.addListener("pointerout", this.onOut.bind(this));
        this.addListener("click", this.onClick.bind(this));
        this.addListener("rightclick", this.onRightClick.bind(this));
    }

    private getCoverArea() {
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

    onRightClick() {
        if (![GameStatus.PLAYING, GameStatus.READY].includes(this.scene.getStatus()) || this.isOpened()) {
            return;
        }

        this.scene.afterRightClick(this);
    }

    recursiveClick() {
        if (![GameStatus.PLAYING, GameStatus.READY].includes(this.scene.getStatus()) || this.isOpened()) {
            return;
        }

        this.scene.afterClick(this);
    }

    onClick() {
        if (
            ![GameStatus.PLAYING, GameStatus.READY].includes(this.scene.getStatus()) ||
            this.isOpened() ||
            this.isFlagged()
        ) {
            return;
        }

        this.scene.afterClick(this);
    }

    private onOver() {
        if (![GameStatus.PLAYING, GameStatus.READY].includes(this.scene.getStatus())) {
            return;
        }

        if (this.isOpened() || this.isFlagged()) {
            return;
        }

        this.tint = Tile.clickTint;
    }

    private onOut() {
        if (![GameStatus.PLAYING, GameStatus.READY].includes(this.scene.getStatus())) {
            return;
        }

        if (this.isOpened() || this.isFlagged()) {
            return;
        }

        this.tint = Tile.initialTint;
    }

    getPosX(): number {
        return this.posX;
    }

    getPosY(): number {
        return this.posY;
    }

    setOpened(): void {
        this.setSheetTexture(Tile.openedTile);
        this.opened = true;

        this.buttonMode = false;
        this.interactive = false;
        this.tint = Tile.initialTint;
    }

    setUnflagged(): void {
        this.flagged = false;
        this.tint = Tile.initialTint;
    }

    setFlagged(): void {
        this.flagged = true;
        this.tint = 0x00ff00; // TODO
    }

    isOpened(): boolean {
        return this.opened;
    }

    isFlagged(): boolean {
        return this.flagged;
    }
}

export default Tile;
