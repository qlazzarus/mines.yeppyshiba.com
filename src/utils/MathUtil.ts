export default class MathUtil {
    public static generateRandomInteger(max: number) {
        return Math.floor(Math.random() * max) + 1;
    }

    public static generateRandomBoolean() {
        return Math.round(Math.random()) === 1;
    }
}
