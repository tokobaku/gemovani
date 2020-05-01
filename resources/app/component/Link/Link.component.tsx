/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { BEMEntity, stringify } from 'rebem-classname';

export interface LinkProps extends BEMEntity, RouterLinkProps {
    scrollBehaviour: ScrollBehavior;
}

export default class Link extends React.PureComponent<LinkProps> {
    static defaultProps = {
        scrollBehaviour: 'smooth'
    };

    scrollToElem(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        event.preventDefault();

        const { to, onClick, scrollBehaviour } = this.props;
        const scrollTo = document.querySelector(to.toString());

        if (scrollTo) {
            window.scrollTo({
                top: scrollTo.getBoundingClientRect().top,
                left: scrollTo.getBoundingClientRect().left,
                behavior: scrollBehaviour
            });
        }

        if (onClick) {
            onClick(event);
        }
    }

    render(): React.ReactNode {
        const { to, children } = this.props;
        const { pathname } = location;

        if (/^#/g.test(to.toString())) {
            return (
                <a
                    // eslint-disable-next-line react/forbid-dom-props
                    className={stringify(this.props)}
                    href={`${pathname}${to.toString()}`}
                    onClick={this.scrollToElem.bind(this)}
                >
                    {children}
                </a>
            );
        }

        // eslint-disable-next-line react/jsx-props-no-spreading
        return <RouterLink {...this.props} />;
    }
}
