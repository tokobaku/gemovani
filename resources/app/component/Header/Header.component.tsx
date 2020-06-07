/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import Link from 'Component/Link';
import Menu from 'Component/Menu';
import Audio from 'Component/Audio';

import 'Component/Header/Header.style';

export interface HeaderProps {
    title: string;
    gemovani_logo: string;
    gemovani_sound: string;
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

        window.addEventListener('scroll', () => {
            this.setState({ scrolledDown: window.scrollY > scrollOffsetToBlur });
        });
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

    renderContact(): React.ReactNode {
        return (
            <Audio />
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
        return <Menu />;
    }

    render(): React.ReactNode {
        const { scrolledDown } = this.state;

        return (
            <header block="Header" mods={{ scrolledDown }}>
                {this.renderContact()}
                {this.renderTitle()}
                {this.renderMenu()}
            </header>
        );
    }
}
