/* eslint-disable no-magic-numbers */
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { BEMEntity } from 'rebem-classname';
import Asset from 'Helper/Asset';

import 'Component/Image/Image.style.scss';

export interface ImageProps extends BEMEntity {
    imgProps?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
    src: string;
    alt: string;
    loading: 'lazy' | 'eager' | undefined;
    manualDeffer: boolean;
    initialImage?: string;
    maxImageSize: number;
    blurPlaceholderImage: boolean;
}

export interface ImageState {
    imageSrc: string;
}

export const MAX_IMAGE_SIZE = 1024;

export const IMAGE_SIZES = [
    0,
    16,
    32,
    64,
    128,
    256,
    300,
    400,
    512,
    600,
    700,
    800,
    900,
    1024
];

export default class Image extends React.PureComponent<ImageProps, ImageState> {
    private observer: IntersectionObserver | null = null;

    ref = React.createRef<HTMLImageElement>();

    static defaultProps = {
        alt: '',
        manualDeffer: false,
        loading: 'lazy',
        maxImageSize: MAX_IMAGE_SIZE,
        mix: {},
        blurPlaceholderImage: true
    };

    constructor(props: ImageProps) {
        super(props);

        this.state = {
            imageSrc: ''
        };
    }

    componentDidMount(): void {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.onVisible();
                    }
                });
            },
            {
                rootMargin: '0px',
                threshold: 0.2
            }
        );

        if (this.ref.current && this.observer) {
            this.observer.observe(this.ref.current);
        }
    }

    onVisible(): void {
        const { src } = this.props;

        this.setState({ imageSrc: src });

        if (this.ref.current && this.observer) {
            this.observer.unobserve(this.ref.current);
        }
    }

    getSource(): string|undefined {
        const { imageSrc } = this.state;
        const { initialImage, maxImageSize, src } = this.props;
        const width = this.getImageWidth() === 0 ? maxImageSize : Math.min(this.getImageWidth(), maxImageSize);
        const desiredWidth = IMAGE_SIZES.find((imageSize) => imageSize >= width);

        if (!imageSrc) {
            return initialImage || src;
        }

        try {
            new URL(imageSrc);
        } catch (e) {
            return Asset.getImageUrl(imageSrc, { w: desiredWidth });
        }

        return imageSrc;
    }

    getImageWidth(): number {
        if (this.ref.current) {
            return this.ref.current.clientWidth;
        }

        return Number.MAX_VALUE;
    }

    render(): React.ReactNode {
        const {
            alt,
            loading,
            mix,
            initialImage,
            imgProps,
            blurPlaceholderImage
        } = this.props;
        const { imageSrc } = this.state;

        const isBlurred = Boolean(blurPlaceholderImage && initialImage && !imageSrc);

        return (
            <img
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...imgProps}
                ref={this.ref}
                block="Image"
                mods={{ isBlurred }}
                mix={mix}
                src={this.getSource()}
                alt={alt}
                loading={initialImage ? 'eager' : loading}
            />
        );
    }
}
