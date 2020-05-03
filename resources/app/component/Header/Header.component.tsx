/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { debounce } from 'ts-debounce';
import __ from 'Helper/__';
import Asset from 'Helper/Asset';
import Link from 'Component/Link';

import 'Component/Header/Header.style';

export interface HeaderProps {
    title: string;
    gemovani_logo: string;
    scrollOffsetToBlur: number;
}

export interface HeaderState {
    scrolledDown: boolean;
}

export default class Header extends React.PureComponent<HeaderProps, HeaderState> {
    static defaultProps = {
        scrollOffsetToBlur: 20
    };

    constructor(props: HeaderProps) {
        super(props);

        this.state = {
            scrolledDown: false
        };

        this.onTitleClick = this.onTitleClick.bind(this);
    }

    componentDidMount(): void {
        const { scrollOffsetToBlur } = this.props;

        window.addEventListener('scroll', debounce(() => {
            this.setState({ scrolledDown: window.scrollY > scrollOffsetToBlur });
        }));
    }

    onTitleClick(event: React.MouseEvent): void {
        if (location.hash) {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            location.replace(location.pathname);
        }
    }

    renderGemovaniLogo(): React.ReactNode {
        // eslint-disable-next-line @typescript-eslint/camelcase
        const { gemovani_logo } = this.props;

        return (
            <a href="https://gemovani.ge" rel="noopener noreferrer" target="_blank" block="Header" elem="GemovaniLogo">
                <img src={Asset.getImageUrl(gemovani_logo, { w: 40 })} alt={__('Gemovani')} />
            </a>
        );
    }

    renderTitle(): React.ReactNode {
        const { title } = this.props;

        return (
            <h1 block="Header" elem="Title">
                <Link mix={{ block: 'Header', elem: 'TitleLink' }} to="/" onClick={this.onTitleClick}>
                    {title}
                </Link>
            </h1>
        );
    }

    renderMenu(): React.ReactNode {
        return <div />;
    }

    render(): React.ReactNode {
        const { scrolledDown } = this.state;

        return (
            <header block="Header" mods={{ scrolledDown }}>
                {this.renderGemovaniLogo()}
                {this.renderTitle()}
                {this.renderMenu()}
            </header>
        );
    }
}
