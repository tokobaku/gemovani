/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export enum ToursActionEnum {
    UPDATE_TOURS = 'UPDATE_TOURS'
}

export interface TourTranslation {
    locale: string;
    title: string;
    description: string;
}

export interface Tour {
    cover_image: string;
    url_key: string;
    start_date: Date;
    end_date: Date;
    translations: TourTranslation[];
}

export interface ToursAction {
    type: ToursActionEnum;
    data: Tour[];
}

export const updateTours = (tours: Tour[]): ToursAction => ({
    type: ToursActionEnum.UPDATE_TOURS,
    data: tours
});
