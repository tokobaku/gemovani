/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export enum VillagesActionEnum {
    UPDATE_VILLAGES = 'UPDATE_VILLAGES'
}

export interface VillageTranslation {
    locale: string;
    title: string;
    description: string;
}

export interface Village {
    cover_image: string;
    url_key: string;
    longitude: string;
    latitude: string;
    translations: VillageTranslation[];
}

export interface VillagesAction {
    type: VillagesActionEnum;
    data: Village[];
}

export const updateVillages = (villages: Village[]): VillagesAction => ({
    type: VillagesActionEnum.UPDATE_VILLAGES,
    data: villages
});
