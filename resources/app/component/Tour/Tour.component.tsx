/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { Tour as TourInterface } from 'Store/Tours/Tours.action';
import Image from 'Component/Image';
import Asset from 'Helper/Asset';
import { getTranslation } from 'Helper/Translation';
import __ from 'Helper/__';
import Link from 'Component/Link';

import 'Component/Tour/Tour.style';

export interface TourProps {
    tour: TourInterface;
    nextTourUrlKey: string | null;
}

export default class Tour extends React.PureComponent<TourProps> {
    renderTourDetails(): React.ReactNode {
        // eslint-disable-next-line @typescript-eslint/camelcase
        const { tour, tour: { url_key } } = this.props;
        const translation = getTranslation(tour, 'en');
        // eslint-disable-next-line @typescript-eslint/camelcase
        const tourUrl = `/tour/${url_key}`;

        return (
            <div block="Tour" elem="TourDetailsWrapper">
                <div block="Tour" elem="TourDetails">
                    <h2 block="Tour" elem="Title">{translation?.title}</h2>
                    <dl>
                        <dt block="Tour" elem="Term">Dates</dt>
                        <dd>
                            {__(
                                '%s - %s',
                                tour.start_date.toLocaleDateString(),
                                tour.end_date.toLocaleDateString()
                            )}
                        </dd>
                    </dl>
                </div>
                <Link
                    to={tourUrl}
                    mix={{ block: 'Tour', elem: 'Link' }}
                >
                    {__('More')}
                </Link>
            </div>
        );
    }

    renderNextTourArrow(): React.ReactNode {
        const { nextTourUrlKey } = this.props;

        if (!nextTourUrlKey) {
            return null;
        }

        return (
            <Link to={`#${nextTourUrlKey}`} mix={{ block: 'Tour', elem: 'NextArrow' }} />
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
                {this.renderNextTourArrow()}
            </section>
        );
    }
}
