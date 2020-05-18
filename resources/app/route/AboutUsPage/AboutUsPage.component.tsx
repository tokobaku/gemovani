/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { AboutUs } from 'Store/Config/Config.action';
import { getTranslation } from 'Helper/Translation';
import CustomMath from 'Helper/Math';
import { PLACEHOLDER_MAX_WIDTH, PLACEHOLDER_MIN_WIDTH } from 'Route/FaqPage/FaqPage.component';

import 'Route/AboutUsPage/AboutUsPage.style';

export interface AboutUsPageProps {
    aboutUs: AboutUs[];
}

export const PLACEHOLDER_COUNT = 20;

export default class AboutUsPage extends React.PureComponent<AboutUsPageProps> {
    getAboutUs(): AboutUs | null {
        const { aboutUs } = this.props;

        return getTranslation({ translations: aboutUs }, 'en');
    }

    renderPlaceholder(): React.ReactNode {
        return (
            <div block="AboutUsPage">
                <div block="AboutUsPage" elem="Wrapper">
                    {/* eslint-disable-next-line array-func/from-map */}
                    {Array.from(Array(PLACEHOLDER_COUNT).keys()).map((key: number) => (
                        <div
                            key={key}
                            block="AboutUsPage"
                            elem="Placeholder"
                            style={{
                                width: `${CustomMath.clamp(
                                    Math.random() * PLACEHOLDER_MAX_WIDTH,
                                    PLACEHOLDER_MIN_WIDTH,
                                    PLACEHOLDER_MAX_WIDTH
                                )}%`
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    render(): React.ReactNode {
        const aboutUs = this.getAboutUs();

        if (!aboutUs) {
            return this.renderPlaceholder();
        }

        return (
            <div block="AboutUsPage">
                {/* eslint-disable-next-line react/no-danger */}
                <div block="AboutUsPage" elem="Wrapper" dangerouslySetInnerHTML={{ __html: aboutUs.content }} />
            </div>
        );
    }
}
