/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export default class CustomMath {
    public static clamp<T>(value: T, min: T, max: T): T {
        // eslint-disable-next-line no-nested-ternary
        return value > min ? (value < max ? value : max) : min;
    }
}
