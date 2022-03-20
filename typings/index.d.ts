export {};

declare global {
    const ASSET_PATH: string;
    const CANVAS_RENDERER: boolean;
    const GAME_HEIGHT: number;
    const GAME_WIDTH: number;
    const WEBGL_RENDERER: boolean;

    type AssetQueueType = {
        type: 'image' | 'audio',
        name: string,
        path: string
    } | {
        type: 'spritesheet',
        name: string,
        path: string,
        frameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig
    } | {
        type: 'bitmap-font',
        name: string,
        path: string,
        fontData: string
    } | {
        type: 'atlas',
        name: string,
        path: string,
        atlasData: string
    }
}