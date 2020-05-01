/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export default class QueryString {
    public static convertObjectToQueryString(object: object): string {
        const filtered = Object.entries(object).filter(([value]) => value !== null && value !== undefined);

        const keyValuePairs = Object.entries(filtered).map(
            (entry) => {
                const [key, value] = entry[1];

                return `${key}=${value}`;
            }
        );

        return keyValuePairs.join('&');
    }
}
