/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { Tour } from 'Store/Tours/Tours.action';
import FetchGraphql from 'Helper/FetchGraphql';

export class ToursQuery {
    getToursQuery(): string {
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

    getTours(updateTours: (tours: Tour[]) => void): void {
        FetchGraphql.get(
            this.getToursQuery(),
            (response) => {
                response.json().then(({ data }) => {
                    const tours = data?.tours;

                    if (tours) {
                        updateTours(
                            tours.map((tour: Tour) => ({
                                ...tour,
                                // eslint-disable-next-line @typescript-eslint/camelcase
                                start_date: new Date(tour.start_date),
                                // eslint-disable-next-line @typescript-eslint/camelcase
                                end_date: new Date(tour.end_date)
                            }))
                        );
                    }
                });
            }
        );
    }
}

export default new ToursQuery();
