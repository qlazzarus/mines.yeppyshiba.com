export default class CoordinateUtil {
    public static toIsometric(x: number, y: number): {x : number; y : number} {
        return {
            x: x - y, 
            y: (x + y) / 2
        };
    }

    public static toCartesian(x: number, y: number): {x : number; y : number} {
        return {
            x: (2 * y + x) / 2,
            y: (2 * y - x) / 2
        };
    }
}