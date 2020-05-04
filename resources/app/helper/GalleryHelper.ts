/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import Asset from 'Helper/Asset';
import { Gallery } from 'Store/Galleries/Galleries.action';

export default class GalleryHelper {
    static getGalleryLink(gallery: Gallery): string {
        return `/galley/${gallery.url_key}`;
    }

    static getGalleryCoverImage(gallery: Gallery, initialWidth: null | number = null): string | null {
        const { items } = gallery;

        if (items.length) {
            const firstItem = items[0];

            if (firstItem.type === 'video') {
                return GalleryHelper.getYoutubeThumbnailFromVideoId(firstItem.value);
            }

            if (initialWidth) {
                return Asset.getImageUrl(firstItem.value, { w: initialWidth });
            }

            return firstItem.value;
        }

        return null;
    }

    static getYoutubeThumbnailFromVideoId(videoId: string): string {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
}
