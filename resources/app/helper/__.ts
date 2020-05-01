/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export const LOCALSTORAGE_TRANSLATIONS = 'translations';

const __ = (format: string, ...replace: string[]): string => {
    try {
        const translations = JSON.parse(localStorage.getItem(LOCALSTORAGE_TRANSLATIONS) || '{}');

        if (process.env.NODE_ENV === 'development') {
            if (!translations || !translations[format]) {
                // eslint-disable-next-line no-console
                console.warn(`Warning %s No translation found for ${format.toString()}`);
            }
        }

        // eslint-disable-next-line fp/no-let
        let i = 0;

        return (translations[format] || format).replace(/%s/g, () => replace[i++]);
    } catch (e) {
        // eslint-disable-next-line fp/no-let
        let i = 0;

        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn('Warning: translations object not set in localStorage %s');
        }

        return format.replace(/%s/g, () => replace[i++]);
    }
};

export default __;
