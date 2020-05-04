/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { Gallery, GalleryItem } from 'Store/Galleries/Galleries.action';
import FetchGraphql from 'Helper/FetchGraphql';

export class GalleriesQuery {
    getGalleriesQuery(): string {
        return `
        query {
            galleries {
                url_key
                items
                translations {
                    locale
                    title
                    description
                }
            }
        }`;
    }

    getGalleries(updateGalleries: (galleries: Gallery[]) => void): void {
        FetchGraphql.get(
            this.getGalleriesQuery(),
            (response) => {
                response.json().then(({ data }) => {
                    const galleries = data?.galleries;

                    if (galleries) {
                        updateGalleries(
                            galleries.map((gallery: Gallery) => ({
                                ...gallery,
                                items: JSON.parse(gallery.items.toString())
                            }))
                        );
                    }
                });
            }
        );
    }
}

export default new GalleriesQuery();
