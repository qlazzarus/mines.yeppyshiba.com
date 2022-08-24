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
    static readonly clickHold = 200;
    static readonly unkownTile = "block-004";
    static readonly openedTile = "block-006";

    private posX: number;
    private posY: number;
    private scene: GameScene;
    private opened: boolean;
    private flagged: boolean;
    private lastClicked: number;
    private lastClickCallback: NodeJS.Timeout | null;

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
        this.lastClicked = 0;
        this.lastClickCallback = null;

        this.addListener("pointerover", this.onOver.bind(this));
        this.addListener("pointerout", this.onOut.bind(this));

        this.addListener("pointerdown", this.onClickStart.bind(this));
        this.addListener("pointerup", this.onClickEnd.bind(this));

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

    checkHoldEvent() {
        this.lastClickCallback = null;
        this.setHold();
    }

    onClickStart() {
        this.lastClicked = Date.now();
        if (!this.lastClickCallback) {
            this.lastClickCallback = setTimeout(this.checkHoldEvent.bind(this), Tile.clickHold);
        }
    }

    onClickEnd() {
        const diff = Date.now() - this.lastClicked;

        if (diff > Tile.clickHold) {
            this.scene.afterHoldClick(this);
        } else {
            this.onClick();
        }
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
        this.setUnHold();
    }

    private setHold() {
        // TODO
        /*
        this.scale = {
            x: 0.5,
            y: 0.5,
        };
        */
        //console.log("sethold");
    }

    private setUnHold() {
        // TODO
        /*
        this.scale = {
            x: 1,
            y: 1,
        };
        */
        //console.log("setunhold");
    }

    private onOver() {
        if (![GameStatus.PLAYING, GameStatus.READY].includes(this.scene.getStatus())) {
            return;
        }

        if (this.isOpened() || this.isFlagged()) {
            return;
        }

        this.tint = Tile.clickTint;
        this.setUnHold();
    }

    private onOut() {
        if (![GameStatus.PLAYING, GameStatus.READY].includes(this.scene.getStatus())) {
            return;
        }

        if (this.isOpened() || this.isFlagged()) {
            return;
        }

        this.tint = Tile.initialTint;
        this.setUnHold();
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
        this.setUnHold();
    }

    setUnflagged(): void {
        this.flagged = false;
        this.tint = Tile.initialTint;
        this.setUnHold();
    }

    setFlagged(): void {
        this.flagged = true;
        this.tint = 0x00ff00; // TODO
        this.setUnHold();
    }

    isOpened(): boolean {
        return this.opened;
    }

    isFlagged(): boolean {
        return this.flagged;
    }
}

export default Tile;
