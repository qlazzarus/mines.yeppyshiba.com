import TileStatus from "@/enums/TileStatus";

export default class CoordinateUtil {
    public static toIsometric(x: number, y: number): { x: number; y: number } {
        return {
            x: x - y,
            y: (x + y) / 2,
        };
    }

    public static toCartesian(x: number, y: number): { x: number; y: number } {
        return {
            x: (2 * y + x) / 2,
            y: (2 * y - x) / 2,
        };
    }

    public static getTileStatus(mines: boolean[][], x: number, y: number, maxX: number, maxY: number): TileStatus {
        if (mines[x][y]) {
            return TileStatus.MINE;
        }

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

        let mineCount = 0;
        vectors.forEach((vector) => {
            const targetX = x + vector[0];
            const targetY = y + vector[1];

            if (targetX > 0 && targetX < maxX && targetY > 0 && targetY < maxY && mines[targetX][targetY]) {
                mineCount++;
            }
        });

        switch (mineCount) {
            case 1:
                return TileStatus.ONE;
            case 2:
                return TileStatus.TWO;
            case 3:
                return TileStatus.THREE;
            case 4:
                return TileStatus.FOUR;
            case 5:
                return TileStatus.FIVE;
            case 6:
                return TileStatus.SIX;
            case 7:
                return TileStatus.SEVEN;
            case 8:
                return TileStatus.EIGHT;
            default:
                return TileStatus.EMPTY;
        }
    }
}
