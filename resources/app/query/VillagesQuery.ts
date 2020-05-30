/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { Village } from 'Store/Villages/Villages.action';
import FetchGraphql from 'Helper/FetchGraphql';

export class VillagesQuery {
    getVillagesQuery(): string {
        return `
        query {
            villages {
                url_key
                longitude
                latitude
                cover_image
                audio
                translations {
                    locale
                    title
                    description
                }
            }
        }`;
    }

    getVillages(updateVillages: (villages: Village[]) => void): void {
        FetchGraphql.get(
            this.getVillagesQuery(),
            (response) => {
                response.json().then(({ data }) => {
                    const villages = data?.villages;

                    if (villages) {
                        updateVillages(villages);
                    }
                });
            }
        );
    }
}

export default new VillagesQuery();
