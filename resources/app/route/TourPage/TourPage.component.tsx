/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { debounce } from 'ts-debounce';
import { Helmet } from 'react-helmet';
import Asset from 'Helper/Asset';
import { getTranslation } from 'Helper/Translation';
import { Tour } from 'Store/Tours/Tours.action';
import Image from 'Component/Image';

import 'Route/TourPage/TourPage.style';

export interface TourPageProps {
    urlKey: string;
    tour: Tour | null;
    offsetToSticky: number;
}

export interface TourPageState {
    isSticky: boolean;
}

const DEFAULT_OFFSET_TO_STICKY = 100;

export default class TourPage extends React.PureComponent<TourPageProps, TourPageState> {
    static defaultProps = {
        offsetToSticky: DEFAULT_OFFSET_TO_STICKY
    };

    constructor(props: TourPageProps) {
        super(props);

        this.state = {
            isSticky: false
        };
    }

    componentDidMount(): void {
        window.scrollTo(0, 0);

        window.addEventListener('scroll', debounce(() => {
            const { offsetToSticky } = this.props;
            this.setState({ isSticky: window.scrollY > offsetToSticky });
        }));
    }

    renderPlaceholder(): React.ReactNode {
        return (
            <div>
                <div block="TourPage" elem="Placeholder" mods={{ type: 'image' }} />
                <div block="TourPage" elem="Placeholder" mods={{ type: 'title' }} />
                <div>
                    <div block="TourPage" elem="Placeholder" mods={{ type: 'content' }} />
                    <div block="TourPage" elem="Placeholder" mods={{ type: 'content' }} />
                    <div block="TourPage" elem="Placeholder" mods={{ type: 'content' }} />
                    <div block="TourPage" elem="Placeholder" mods={{ type: 'content' }} />
                </div>
            </div>
        );
    }

    getTourDescriptionIntro(): string {
        const { tour } = this.props;
        const description = tour ? getTranslation(tour, 'en')?.description : '';
        const descriptionDiv = document.createElement('div');
        descriptionDiv.innerHTML = description || '';

        return `${descriptionDiv.innerText.substr(0, 100)}...`;
    }

    renderOgTags(): React.ReactNode {
        const { tour } = this.props;
        const title = tour ? getTranslation(tour, 'en')?.title : '';
        const image = Asset.getFullImageUrl(tour?.cover_image || '');

        return (
            <Helmet>
                <meta property="og:title" content={title} />
                <meta property="og:image" content={image} />
                <meta property="og:description" content={this.getTourDescriptionIntro()} />
            </Helmet>
        );
    }

    render(): React.ReactNode {
        const { tour } = this.props;
        const { isSticky } = this.state;

        if (!tour) {
            return this.renderPlaceholder();
        }

        return (
            <main block="TourPage">
                {this.renderOgTags()}
                <article>
                    <Image
                        mix={{ block: 'TourPage', elem: 'CoverImage' }}
                        initialImage={Asset.getImageUrl(tour.cover_image, { w: 64 })}
                        src={tour.cover_image}
                    />
                    <div block="TourPage" elem="TitleWrapper">
                        <h1 block="TourPage" elem="Title" mods={{ isSticky }}>
                            {getTranslation(tour, 'en')?.title}
                        </h1>
                    </div>
                    <div
                        block="TourPage"
                        elem="Content"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: getTranslation(tour, 'en')?.description || '' }}
                    />
                </article>
            </main>
        );
    }
}
