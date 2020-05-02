/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export enum ConfigActionEnum {
    UPDATE_CONFIG = 'UPDATE_CONFIG'
}

export interface Config {
    config: {
        title: string;
        gemovani_logo: string;
    };
}

export interface ConfigAction {
    type: ConfigActionEnum;
    data: Config;
}

export const updateConfig = (data: Config): ConfigAction => ({
    type: ConfigActionEnum.UPDATE_CONFIG,
    data
});
