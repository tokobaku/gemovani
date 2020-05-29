/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import QueryString from 'Helper/QueryString';

export const IMAGE_URL_PREFIX = '/image/';

export default class Asset {
    public static getImageUrl(image: string, queryParams?: object): string {
        return `${IMAGE_URL_PREFIX}${image}?${QueryString.convertObjectToQueryString(queryParams || {})}`;
    }

    public static getAudioUrl(audioPath: string): string {
        return `/sound/${audioPath}`;
    }
}
