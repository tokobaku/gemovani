/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export default class Device {
    public static isAndroid(): boolean {
        return Device.is('Android');
    }

    public static is(deviceType: string): boolean {
        return new RegExp(`/${deviceType}/g`).test(navigator.userAgent);
    }
}
