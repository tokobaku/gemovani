/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export enum SlidesActionEnum {
    UPDATE_SLIDES = 'UPDATE_SLIDES'
}

export interface SlideTranslation {
    locale: string;
    content?: string;
}

export interface Slide {
    image: string;
    sortOrder?: number;
    translations: SlideTranslation[];
}

export interface SlidesAction {
    type: SlidesActionEnum;
    data: Slide[];
}

export const updateSlides = (slides: Slide[]): SlidesAction => ({
    type: SlidesActionEnum.UPDATE_SLIDES,
    data: slides
});
