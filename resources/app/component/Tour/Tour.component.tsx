/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { Tour as TourInterface } from 'Store/Tours/Tours.action';
import Image from 'Component/Image';
import Asset from 'Helper/Asset';
import { getTranslation } from 'Helper/Translation';
import __ from 'Helper/__';

import 'Component/Tour/Tour.style';

export interface TourProps {
    tour: TourInterface;
}

export default class Tour extends React.PureComponent<TourProps> {
    renderTourDetails(): React.ReactNode {
        const { tour } = this.props;

        return (
            <div block="Tour" elem="TourDetails">
                <h2 block="Tour" elem="Title">{getTranslation(tour, 'en')?.title}</h2>
                <dl>
                    <dt block="Tour" elem="Term">Dates</dt>
                    <dd>{__('%s - %s', tour.start_date.toDateString(), tour.end_date.toDateString())}</dd>
                </dl>
            </div>
        );
    }

    render(): React.ReactNode {
        const { tour } = this.props;

        return (
            <section block="Tour" id={tour.url_key}>
                <figure block="Tour" elem="ImageWrapper">
                    <Image
                        mix={{ block: 'Tour', elem: 'Image' }}
                        src={tour.cover_image}
                        initialImage={Asset.getImageUrl(tour.cover_image, { w: 40 })}
                    />
                    {this.renderTourDetails()}
                </figure>
            </section>
        );
    }
}
