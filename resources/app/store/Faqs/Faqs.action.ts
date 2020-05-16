/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export enum FaqsActionEnum {
    UPDATE_FAQS = 'UPDATE_FAQS'
}

export interface Faq {
    locale: string;
    content: string;
}

export interface FaqsAction {
    type: FaqsActionEnum;
    data: Faq[];
}

export const updateFaqs = (faqs: Faq[]): FaqsAction => ({
    type: FaqsActionEnum.UPDATE_FAQS,
    data: faqs
});
