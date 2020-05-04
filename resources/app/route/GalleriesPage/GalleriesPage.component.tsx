/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import __ from 'Helper/__';
import GalleryHelper from 'Helper/GalleryHelper';
import { getTranslation } from 'Helper/Translation';
import { Gallery } from 'Store/Galleries/Galleries.action';
import Link from 'Component/Link';
import Image from 'Component/Image';

import 'Route/GalleriesPage/GalleriesPage.style';

export interface GalleriesPageProps {
    galleries: Gallery[];
    numberOfPlaceholders: number;
}

const DEFAULT_IMAGE_WIDTH = 64;
const NUMBER_OF_PLACEHOLDERS = 5;

export default class GalleriesPage extends React.PureComponent<GalleriesPageProps> {
    static defaultProps = {
        numberOfPlaceholders: NUMBER_OF_PLACEHOLDERS
    };

    renderGalleryItemImage(gallery: Gallery): React.ReactNode {
        if (!gallery.items.length) {
            return null;
        }

        const firstItem = gallery.items[0];

        if (firstItem.type === 'video') {
            return (
                <Image
                    mix={{ block: 'GalleriesPage', elem: 'GalleryImage' }}
                    src={GalleryHelper.getGalleryCoverImage(gallery) as string}
                />
            );
        }

        return (
            <Image
                mix={{ block: 'GalleriesPage', elem: 'GalleryImage' }}
                initialImage={GalleryHelper.getGalleryCoverImage(gallery, DEFAULT_IMAGE_WIDTH) as string}
                src={GalleryHelper.getGalleryCoverImage(gallery) as string}
            />
        );
    }

    renderGallery(gallery: Gallery): React.ReactNode {
        const { url_key: urlKey } = gallery;

        return (
            <article block="GalleriesPage" elem="Gallery" key={urlKey}>
                <Link block="GalleriesPage" elem="GalleryLink" to={GalleryHelper.getGalleryLink(gallery)}>
                    {this.renderGalleryItemImage(gallery)}
                    <h2 block="GalleriesPage" elem="GalleryTitle">{getTranslation(gallery, 'en')?.title}</h2>
                </Link>
            </article>
        );
    }

    renderPlaceholder(): React.ReactNode {
        // eslint-disable-next-line array-func/from-map
        return Array.from(new Array(NUMBER_OF_PLACEHOLDERS).keys()).map((key) => (
            <div key={key}>
                <div block="GalleriesPage" elem="Placeholder" mods={{ type: 'image' }} />
                <div block="GalleriesPage" elem="Placeholder" mods={{ type: 'title' }} />
            </div>
        ));
    }

    renderGalleries(): React.ReactNode {
        const { galleries } = this.props;

        if (!galleries.length) {
            return this.renderPlaceholder();
        }

        return galleries.map((gallery) => this.renderGallery(gallery));
    }

    render(): React.ReactNode {
        return (
            <div block="GalleriesPage">
                <h1 block="GalleriesPage" elem="PageTitle">{__('Galleries')}</h1>
                <div block="GalleriesPage" elem="Wrapper">
                    {this.renderGalleries()}
                </div>
            </div>
        );
    }
}
