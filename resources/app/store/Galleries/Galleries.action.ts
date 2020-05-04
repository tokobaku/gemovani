/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export enum GalleriesActionEnum {
    UPDATE_GALLERIES = 'UPDATE_GALLERIES'
}

export interface Gallery {
    url_key: string;
    translations: GalleryTranslation[];
    items: GalleryItem[];
}

export interface GalleryTranslation {
    locale: string;
    title: string;
    description: string | null;
}

export interface GalleryItem {
    type: 'photo' | 'video';
    value: string;
}

export interface GalleriesAction {
    type: GalleriesActionEnum;
    data: Gallery[];
}

export const updateGalleries = (galleries: Gallery[]): GalleriesAction => ({
    type: GalleriesActionEnum.UPDATE_GALLERIES,
    data: galleries
});
