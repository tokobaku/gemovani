/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export class ToursQuery {
    getTours() {
        return `
        query {
            tours {
                id
                cover_image
                start_date
                end_date
                url_key
                translations {
                    locale
                    title
                    description
                }
            }
        }`;
    }
}

export default new ToursQuery();
