import { Asset } from "@/enums";

export default <AssetQueueType[]>[
    {
        type: "bitmap-font",
        name: Asset.ATARI_SMOOTH,
        path: "assets/atari-smooth.png",
        fontData: "assets/atari-smooth.xml",
    },
    {
        type: "spritesheet",
        name: Asset.FLAG,
        path: "assets/flag.png",
        frameConfig: {
            frameWidth: 202,
            frameHeight: 324,
        },
    },
    {
        type: "spritesheet",
        name: Asset.MCBLOCKS,
        path: "assets/mcblocks.png",
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
        },
    },
];
