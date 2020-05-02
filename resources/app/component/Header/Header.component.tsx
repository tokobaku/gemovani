/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import __ from 'Helper/__';
import Asset from 'Helper/Asset';

import 'Component/Header/Header.style';

export interface HeaderProps {
    title: string;
    gemovani_logo: string;
}

export default class Header extends React.PureComponent<HeaderProps> {
    renderGemovaniLogo(): React.ReactNode {
        // eslint-disable-next-line @typescript-eslint/camelcase
        const { gemovani_logo } = this.props;

        return (
            <a href="https://gemovani.ge">
                <img src={Asset.getImageUrl(gemovani_logo, { w: 64 })} alt={__('Gemovani')} />
            </a>
        );
    }

    renderTitle(): React.ReactNode {
        const { title } = this.props;

        return (
            <h1 block="Header" elem="Title">{title}</h1>
        );
    }

    renderMenu(): React.ReactNode {
        return <div />;
    }

    render(): React.ReactNode {
        return (
            <header block="Header">
                {this.renderGemovaniLogo()}
                {this.renderTitle()}
                {this.renderMenu()}
            </header>
        );
    }
}
