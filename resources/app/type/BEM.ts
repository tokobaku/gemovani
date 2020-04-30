/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export interface Mods {
    [key: string]: string | boolean | number | undefined | null;
}

export interface Mix extends BEM {
    mix?: undefined;
}

export interface BEM {
    block?: string;
    elem?: string;
    mods?: Mods;
    mix?: Mix;
}
