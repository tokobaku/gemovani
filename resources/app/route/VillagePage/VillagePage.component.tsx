/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { debounce } from 'ts-debounce';
import { Helmet } from 'react-helmet';
import Asset from 'Helper/Asset';
import { getTranslation } from 'Helper/Translation';
import { Village } from 'Store/Villages/Villages.action';
import Image from 'Component/Image';
import Map from 'Component/Map';

import 'Route/VillagePage/VillagePage.style';

export interface VillagePageProps {
    urlKey: string;
    village: Village | null;
    offsetToSticky: number;
}

export interface VillagePageState {
    isSticky: boolean;
}

const DEFAULT_OFFSET_TO_STICKY = 100;

export default class VillagePage extends React.PureComponent<VillagePageProps, VillagePageState> {
    static defaultProps = {
        offsetToSticky: DEFAULT_OFFSET_TO_STICKY
    };

    constructor(props: VillagePageProps) {
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
                <div block="VillagePage" elem="Placeholder" mods={{ type: 'image' }} />
                <div block="VillagePage" elem="Placeholder" mods={{ type: 'title' }} />
                <div>
                    <div block="VillagePage" elem="Placeholder" mods={{ type: 'content' }} />
                    <div block="VillagePage" elem="Placeholder" mods={{ type: 'content' }} />
                    <div block="VillagePage" elem="Placeholder" mods={{ type: 'content' }} />
                    <div block="VillagePage" elem="Placeholder" mods={{ type: 'content' }} />
                </div>
            </div>
        );
    }

    renderMap(): React.ReactNode {
        const { village } = this.props;

        if (!village) {
            return null;
        }

        const { longitude, latitude } = village;

        return <Map longitude={longitude} latitude={latitude} />;
    }

    getDescriptionIntro(): string {
        const { village } = this.props;
        const villageDiv = document.createElement('div');

        villageDiv.innerHTML = village ? getTranslation(village, 'en')?.description || '' : '';

        return `${villageDiv.innerText.substr(0, 100)}...`;
    }

    renderOgTag(): React.ReactNode {
        const { village } = this.props;
        const title = village ? getTranslation(village, 'en')?.title : '';
        const image = Asset.getFullImageUrl(village?.cover_image || '');
        const description = this.getDescriptionIntro();

        return (
            <Helmet>
                <meta property="og:title" content={title} />
                <meta property="og:image" content={image} />
                <meta property="og:description" content={description} />
            </Helmet>
        );
    }

    render(): React.ReactNode {
        const { village } = this.props;
        const { isSticky } = this.state;

        if (!village) {
            return this.renderPlaceholder();
        }

        return (
            <main block="VillagePage">
                {this.renderOgTag()}
                <article>
                    <Image
                        mix={{ block: 'VillagePage', elem: 'CoverImage' }}
                        initialImage={Asset.getImageUrl(village.cover_image, { w: 64 })}
                        src={village.cover_image}
                    />
                    <div block="VillagePage" elem="TitleWrapper">
                        <h1 block="VillagePage" elem="Title" mods={{ isSticky }}>
                            {getTranslation(village, 'en')?.title}
                        </h1>
                    </div>
                    <div
                        block="VillagePage"
                        elem="Content"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: getTranslation(village, 'en')?.description || '' }}
                    />
                    {this.renderMap()}
                </article>
            </main>
        );
    }
}
