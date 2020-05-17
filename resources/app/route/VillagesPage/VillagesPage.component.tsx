/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { getTranslation } from 'Helper/Translation';
import __ from 'Helper/__';
import Asset from 'Helper/Asset';
import { StateProps } from 'Route/VillagesPage/VillagesPage.container';
import { Village } from 'Store/Villages/Villages.action';
import Image from 'Component/Image';
import Link from 'Component/Link';

import 'Route/VillagesPage/VillagesPage.style';

export default class VillagesPage extends React.PureComponent<StateProps> {
    renderVillage(village: Village, index: number): React.ReactNode {
        return (
            <div block="VillagesPage" elem="Village" key={index}>
                <figure>
                    <Link mix={{ block: 'VillagesPage', elem: 'ImageLink' }} to={`/village/${village.url_key}`}>
                        <Image
                            mix={{ block: 'VillagesPage', elem: 'Image' }}
                            src={village.cover_image}
                            initialImage={Asset.getImageUrl(village.cover_image, { w: 64 })}
                            maxImageSize={720}
                        />
                    </Link>
                    <figcaption>
                        <Link
                            to={`/village/${village.url_key}`}
                            mix={{ block: 'VillagesPage', elem: 'Link' }}
                        >
                            { getTranslation(village, 'en')?.title }
                        </Link>
                    </figcaption>
                </figure>
            </div>
        );
    }

    renderVillages(): React.ReactNode {
        const { villages } = this.props;

        return (
            <div block="VillagesPage" elem="VillagesWrapper">
                {villages.map((village, index) => this.renderVillage(village, index))}
            </div>
        );
    }

    renderHeader(): React.ReactNode {
        return (
            <div block="VillagesPage" elem="HeaderWrapper">
                <h1>{__('Villages')}</h1>
            </div>
        );
    }

    renderPlaceholder(): React.ReactNode {
        return (
            <div block="VillagesPage">
                {this.renderHeader()}
                <div block="VillagesPage" elem="VillagesWrapper">
                    <div block="VillagesPage" elem="VillagePlaceholder" />
                    <div block="VillagesPage" elem="VillagePlaceholder" />
                    <div block="VillagesPage" elem="VillagePlaceholder" />
                    <div block="VillagesPage" elem="VillagePlaceholder" />
                    <div block="VillagesPage" elem="VillagePlaceholder" />
                </div>
            </div>
        );
    }

    render(): React.ReactNode {
        const { villages } = this.props;

        if (!villages.length) {
            return this.renderPlaceholder();
        }

        return (
            <div block="VillagesPage">
                {this.renderHeader()}
                {this.renderVillages()}
            </div>
        );
    }
}
