/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import __ from 'Helper/__';
import Link from 'Component/Link';

import 'Component/Menu/Menu.style';

export interface MenuState {
    menuOpened: boolean;
}

export interface MenuProps {
    openPopup: () => void;
}

export default class Menu extends React.PureComponent<MenuProps, MenuState> {
    menuRef = React.createRef<HTMLDivElement>();

    constructor(props: MenuProps) {
        super(props);

        this.state = {
            menuOpened: false
        };

        this.onLinkClick = this.onLinkClick.bind(this);
        this.onContactClick = this.onContactClick.bind(this);
    }

    componentDidMount(): void {
        document.addEventListener('click', (event): void => {
            if (
                this.menuRef.current
                && (this.menuRef.current !== event.target && !this.menuRef.current.contains(event.target as Node))
            ) {
                this.setState({ menuOpened: false });
            }
        });
    }

    onBurgerButtonClick(): void {
        const { menuOpened } = this.state;
        this.setState({ menuOpened: !menuOpened });
    }

    onLinkClick(): void {
        this.setState({ menuOpened: false });
    }

    onContactClick(): void {
        const { openPopup } = this.props;

        this.setState({ menuOpened: false });
        openPopup();
    }

    renderMenuOverlay(): React.ReactNode {
        const { menuOpened } = this.state;

        return (
            <div block="Menu" elem="OverlayWrapper" mods={{ menuOpened }}>
                <ul>
                    <li>
                        <Link block="Menu" elem="Item" to="/about-us" onClick={this.onLinkClick}>{__('About Us')}</Link>
                    </li>
                    <li>
                        <Link block="Menu" elem="Item" to="/villages" onClick={this.onLinkClick}>{__('Villages')}</Link>
                    </li>
                    <li>
                        <Link block="Menu" elem="Item" to="/galleries" onClick={this.onLinkClick}>{__('Gallery')}</Link>
                    </li>
                    <li>
                        <button block="Menu" elem="Item" onClick={this.onContactClick}>{__('Contact')}</button>
                    </li>
                    <li>
                        <Link block="Menu" elem="Item" to="/faq" onClick={this.onLinkClick}>{__('FAQ')}</Link>
                    </li>
                </ul>
            </div>
        );
    }

    render(): React.ReactNode {
        const { menuOpened } = this.state;

        return (
            <div ref={this.menuRef}>
                <button
                    block="Menu"
                    elem="BurgerButton"
                    mods={{ menuOpened }}
                    aria-label={__('Open Menu')}
                    onClick={this.onBurgerButtonClick.bind(this)}
                />
                {this.renderMenuOverlay()}
            </div>
        );
    }
}
