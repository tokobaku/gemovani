/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import Asset from 'Helper/Asset';
import __ from 'Helper/__';

import 'Component/Footer/Footer.style';

export interface HeaderProps {
    title: string;
    gemovaniLogo: string;
}

export default class Footer extends React.PureComponent<HeaderProps> {
    renderDevelopedBy(): React.ReactNode {
        return (
            <div block="Footer" elem="Detail">
                <dl block="Footer" elem="DevelopedBy">
                    <dt block="Footer" elem="InfoLabel">Developed by</dt>
                    <dd>
                        <a
                            href="https://www.linkedin.com/in/tornike-bakuradze-060504188"
                            rel="noreferrer nofollow"
                        >
                            Tornike Bakuradze
                        </a>
                    </dd>
                </dl>
            </div>
        );
    }

    renderSupportedBy(): React.ReactNode {
        const { gemovaniLogo } = this.props;

        return (
            <div block="Footer" elem="Detail">
                <dl block="Footer" elem="SupportedBy">
                    <dt block="Footer" elem="InfoLabel">
                        {__('Supported by')}
                    </dt>
                    <dd>
                        <a
                            href="https://gemovani.ge"
                            rel="noopener noreferrer"
                            target="_blank"
                            block="Footer"
                            elem="Gemovani"
                        >
                            Gemovani
                            <img
                                block="Footer"
                                elem="GemovaniLogo"
                                src={Asset.getImageUrl(gemovaniLogo, { w: 40 })}
                                alt={__('Gemovani')}
                            />
                        </a>
                    </dd>
                </dl>
            </div>
        );
    }

    render(): React.ReactNode {
        const { title } = this.props;

        return (
            <footer block="Footer">
                <div block="Footer" elem="Wrapper">
                    <div block="Footer" elem="DetailsWrapper">
                        <div block="Footer" elem="Detail">{title}</div>
                        {this.renderSupportedBy()}
                        {this.renderDevelopedBy()}
                    </div>
                </div>
            </footer>
        );
    }
}
