/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

/**
 * Translation object's interface
 */
export interface TranslationInterface {
    locale: string;
}

/**
 * Generic translatable object's interface
 */
export interface TranslatableInterface<Translation> {
    translations: Translation[];
}

/**
 * Returns translation by locale from translatable object if such exists
 * returns null otherwise
 * @param translatable
 * @param locale
 * @param defaultValue
 */
export const getTranslation = <Translation extends TranslationInterface>(
    translatable: TranslatableInterface<Translation>,
    locale: string,
    defaultValue: Translation|null = null
): Translation|null => {
    const result = translatable.translations.find(
        (translation) => translation.locale === locale
    );

    return result === undefined ? defaultValue : result;
};
