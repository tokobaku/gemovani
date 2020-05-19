/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import __ from 'Helper/__';
import { StateProps, DispatchProps } from 'Component/ContactPopup/ContactPopup.container';

import 'Component/ContactPopup/ContactPopup.style';

export interface ContactPopupProps extends StateProps, DispatchProps {}

export default class ContactPopup extends React.PureComponent<ContactPopupProps> {
    contactFormRef = React.createRef<HTMLDivElement>();

    constructor(props: ContactPopupProps) {
        super(props);

        this.onOutsideClick = this.onOutsideClick.bind(this);
    }

    onOutsideClick(event: React.MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();

        const { closePopup } = this.props;

        if (
            this.contactFormRef.current
            && (this.contactFormRef.current !== event.target
            && !this.contactFormRef.current.contains(event.target as Node))
        ) {
            closePopup();
        }
    }

    renderPopup(): React.ReactNode {
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div block="Popup" onClick={this.onOutsideClick}>
                <div block="Popup" elem="Wrapper" ref={this.contactFormRef}>
                    <h2 block="Popup" elem="Title">{__('Contact Us')}</h2>
                    <label block="Popup" elem="Label" htmlFor="email">{__('Email')}</label>
                    <input block="Popup" elem="Input" id="email" type="Email" required aria-required />
                    <label block="Popup" elem="Label" htmlFor="message">{__('Drop us a message')}</label>
                    <textarea
                        block="Popup"
                        elem="Input"
                        mods={{ type: 'textarea' }}
                        id="message"
                        placeholder={__('Type your message...')}
                    />
                </div>
            </div>
        );
    }

    render(): React.ReactNode {
        const { popupIsOpen } = this.props;

        if (!popupIsOpen) {
            return null;
        }

        return this.renderPopup();
    }
}
