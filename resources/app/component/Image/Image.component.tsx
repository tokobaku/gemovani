/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { Mix } from 'Type/BEM';

import 'Component/Image/Image.style.scss';

export interface ImageProps {
    imgProps?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
    src: string;
    alt: string;
    loading: 'lazy' | 'eager' | undefined;
    manualDeffer: boolean;
    initialImage?: string;
    mix: Mix;
    maxImageSize: number;
}

export interface ImageState {
    imageSrc: string;
}

export const MAX_IMAGE_SIZE = 1024;

export default class Image extends React.PureComponent<ImageProps, ImageState> {
    private observer: IntersectionObserver | null = null;

    ref = React.createRef<HTMLImageElement>();

    static defaultProps = {
        alt: '',
        manualDeffer: false,
        loading: 'lazy',
        maxImageSize: MAX_IMAGE_SIZE
    };

    constructor(props: ImageProps) {
        super(props);

        this.state = {
            imageSrc: ''
        };
    }

    componentDidMount(): void {
        this.observer = new IntersectionObserver(
            () => {
                this.onVisible();
            },
            {
                rootMargin: '0px',
                threshold: 0.1
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
        const { initialImage, maxImageSize } = this.props;
        const width = Math.min(this.getImageWidth(), maxImageSize);

        if (!imageSrc) {
            return initialImage;
        }

        try {
            new URL(imageSrc);
        } catch (e) {
            return `/image/${imageSrc}?w=${width}`;
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
            imgProps
        } = this.props;
        const { imageSrc } = this.state;

        const isBlurred = initialImage && !imageSrc;

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
