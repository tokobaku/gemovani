/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { getTranslation } from 'Helper/Translation';
import CustomMath from 'Helper/Math';
import { StateProps } from 'Route/FaqPage/FaqPage.container';
import { Faq } from 'Store/Faqs/Faqs.action';

import 'Route/FaqPage/FaqPage.style';

export const PLACEHOLDER_MAX_WIDTH = 90;
export const PLACEHOLDER_MIN_WIDTH = 20;
export const DEFAULT_NUMBER_OF_PLACEHOLDERS = 20;

export interface FaqPageProps extends StateProps {
    numberOfPlaceholders: number;
}

export default class FaqPage extends React.PureComponent<FaqPageProps> {
    static defaultProps = {
        numberOfPlaceholders: DEFAULT_NUMBER_OF_PLACEHOLDERS
    };

    getFaq(): Faq | null {
        const { faqs } = this.props;

        return getTranslation({ translations: faqs }, 'en');
    }

    renderPlaceholder(): React.ReactNode {
        const { numberOfPlaceholders } = this.props;

        return (
            <div block="FaqPage">
                <div block="FaqPage" elem="Content">
                    {/* eslint-disable-next-line array-func/from-map */}
                    {Array.from(Array(numberOfPlaceholders).keys()).map((key: number) => (
                        <div
                            key={key}
                            block="FaqPage"
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
        const faq = this.getFaq();

        if (!faq) {
            return this.renderPlaceholder();
        }

        return (
            <div block="FaqPage">
                {/* eslint-disable-next-line react/no-danger */}
                <div block="FaqPage" elem="Content" dangerouslySetInnerHTML={{ __html: faq.content }} />
            </div>
        );
    }
}
