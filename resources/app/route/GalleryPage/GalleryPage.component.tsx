/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { Gallery, GalleryItem } from 'Store/Galleries/Galleries.action';
import { getTranslation } from 'Helper/Translation';
import GalleryHelper from 'Helper/GalleryHelper';
import __ from 'Helper/__';
import CustomMath from 'Helper/Math';
import Image from 'Component/Image';

import 'Route/GalleryPage/GalleryPage.style';

export interface GalleryPageProps {
    gallery?: Gallery;
}

export interface GalleryPageState {
    carouselIsOpen: boolean;
    currentIndex: number;
}

export const GALLERY_IMAGE_DEFAULT_WIDTH = 64;

export default class GalleryPage extends React.PureComponent<GalleryPageProps, GalleryPageState> {
    carouselRef = React.createRef<HTMLDivElement>();

    carouselItemRef = React.createRef<HTMLDivElement>();

    constructor(props: GalleryPageProps) {
        super(props);

        this.state = {
            carouselIsOpen: false,
            currentIndex: 0
        };
    }

    onCarouselClick(event: React.MouseEvent): void {
        const target = event.target as Node;
        if (target.nodeName === 'IMG') {
            return;
        }
        this.setState({ carouselIsOpen: false });
    }

    getOnGalleryItemClick(index: number): React.MouseEventHandler {
        return (event): void => {
            event.preventDefault();
            this.setState({ carouselIsOpen: true, currentIndex: index });
        };
    }

    getOnArrowClick(direction: 'left' | 'right'): React.MouseEventHandler {
        return (event): void => {
            event.stopPropagation();

            const { currentIndex } = this.state;
            const { gallery } = this.props;
            const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;

            if (gallery) {
                const { items } = gallery;
                this.setState({ currentIndex: CustomMath.clamp(newIndex, 0, items.length - 1) });
            }
        };
    }

    renderPlaceholder(): React.ReactNode {
        return (
            <div block="GalleryPage">
                <div block="GalleryPage" elem="PlaceholderWrapper">
                    <div block="GalleryPage" elem="Placeholder" mods={{ type: 'title' }} />
                    <div>
                        <div block="GalleryPage" elem="Placeholder" mods={{ type: 'description' }} />
                        <div block="GalleryPage" elem="Placeholder" mods={{ type: 'description' }} />
                        <div block="GalleryPage" elem="Placeholder" mods={{ type: 'description' }} />
                        <div block="GalleryPage" elem="Placeholder" mods={{ type: 'description' }} />
                    </div>
                    <div block="GalleryPage" elem="ItemsWrapper">
                        <div block="GalleryPage" elem="Placeholder" mods={{ type: 'item' }} />
                        <div block="GalleryPage" elem="Placeholder" mods={{ type: 'item' }} />
                        <div block="GalleryPage" elem="Placeholder" mods={{ type: 'item' }} />
                        <div block="GalleryPage" elem="Placeholder" mods={{ type: 'item' }} />
                        <div block="GalleryPage" elem="Placeholder" mods={{ type: 'item' }} />
                    </div>
                </div>
            </div>
        );
    }

    renderDescription(): React.ReactNode {
        const { gallery } = this.props;
        if (gallery === undefined) return null;

        const { description } = getTranslation(gallery, 'en') || {};
        if (!description) return null;

        return (
            <div
                block="GalleryPage"
                elem="Description"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: description }}
            />
        );
    }

    renderPhoto(galleryItem: GalleryItem, isCarousel = false): React.ReactNode {
        if (isCarousel) {
            const maxHeight = this.carouselItemRef.current ? this.carouselItemRef.current.clientHeight : '100%';
            const width = this.carouselItemRef.current
                ? this.carouselItemRef.current.clientWidth
                // eslint-disable-next-line no-magic-numbers
                : window.innerWidth * 0.9 - 100;
            const image = GalleryHelper.getGalleryItemImageSource(galleryItem, width);

            return (
                <img
                    mix={{ block: 'GalleryPage', elem: 'Image' }}
                    src={image}
                    alt={image}
                    style={{ maxHeight, maxWidth: '100%' }}
                />
            );
        }

        return (
            <Image
                mix={{ block: 'GalleryPage', elem: 'Image' }}
                src={GalleryHelper.getGalleryItemImageSource(galleryItem)}
                initialImage={GalleryHelper.getGalleryItemImageSource(galleryItem, GALLERY_IMAGE_DEFAULT_WIDTH)}
            />
        );
    }

    renderVideo(galleryItem: GalleryItem): React.ReactNode {
        return (
            <iframe
                src={GalleryHelper.getGalleryItemVideoSource(galleryItem)}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video"
                width="100%"
                height="100%"
            />
        );
    }

    renderGalleryItem(galleryItem: GalleryItem, index: number, isCarousel = false): React.ReactNode {
        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
                ref={isCarousel ? this.carouselItemRef : undefined}
                key={index}
                block="GalleryPage"
                elem="GalleryItem"
                mods={{ type: galleryItem.type }}
                onClick={this.getOnGalleryItemClick(index)}
                onKeyDown={undefined}
                aria-label={__('Open gallery item no %s', index.toString())}
            >
                {galleryItem.type === 'video'
                    ? this.renderVideo(galleryItem)
                    : this.renderPhoto(galleryItem, isCarousel)}
            </div>
        );
    }

    renderGalleryItems(): React.ReactNode {
        const { gallery } = this.props;

        if (gallery === undefined) {
            return null;
        }

        return (
            <div block="GalleryPage" elem="ItemsWrapper">
                {gallery.items.map((galleryItem, index) => this.renderGalleryItem(galleryItem, index))}
            </div>
        );
    }

    renderCurrentItem(): React.ReactNode {
        const { currentIndex } = this.state;
        const { gallery } = this.props;

        if (!gallery) {
            return null;
        }

        const { items } = gallery;

        return (
            <div block="GalleryPage" elem="CarouselItemWrapper">
                {this.renderGalleryItem(items[currentIndex], currentIndex, true)}
            </div>
        );
    }

    renderArrow(direction: 'left' | 'right'): React.ReactNode {
        return (
            <button
                block="GalleryPage"
                elem="Arrow"
                mods={{ type: direction }}
                onClick={this.getOnArrowClick(direction)}
            >
                {direction === 'left' ? '<' : '>'}
            </button>
        );
    }

    renderItemsCarousel(): React.ReactNode {
        const { carouselIsOpen } = this.state;

        if (!carouselIsOpen) return null;

        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
                block="GalleryPage"
                elem="Carousel"
                ref={this.carouselRef}
                onClick={this.onCarouselClick.bind(this)}
                onKeyDown={undefined}
            >
                {this.renderArrow('left')}
                {this.renderCurrentItem()}
                {this.renderArrow('right')}
            </div>
        );
    }

    render(): React.ReactNode {
        const { gallery } = this.props;

        if (gallery === undefined) {
            return this.renderPlaceholder();
        }

        return (
            <div block="GalleryPage">
                <h1 block="GalleryPage" elem="Title">{getTranslation(gallery, 'en')?.title}</h1>
                {this.renderDescription()}
                {this.renderGalleryItems()}
                {this.renderItemsCarousel()}
            </div>
        );
    }
}
