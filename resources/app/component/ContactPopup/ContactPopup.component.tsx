/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import __ from 'Helper/__';
import Validator from 'Helper/Validator';
import SendContactMutation from 'Query/SendContactMutation';
import { StateProps, DispatchProps } from 'Component/ContactPopup/ContactPopup.container';
import Input from 'Component/Input';

import 'Component/ContactPopup/ContactPopup.style';

export interface ContactPopupProps extends StateProps, DispatchProps {}

export interface ContactPopupState {
    email: string;
    message: string;
    invalidEmail: boolean;
    invalidMessage: boolean;
    messageIsSending: boolean;
}

export default class ContactPopup extends React.PureComponent<ContactPopupProps, ContactPopupState> {
    contactFormRef = React.createRef<HTMLDivElement>();

    constructor(props: ContactPopupProps) {
        super(props);

        this.state = {
            email: '',
            message: '',
            invalidEmail: false,
            invalidMessage: false,
            messageIsSending: false
        };

        this.onOutsideClick = this.onOutsideClick.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onSendButtonClick = this.onSendButtonClick.bind(this);
    }

    onEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ email: (event.target as HTMLInputElement).value });
        this.validateEmail(event.target.value);
    }

    onMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({ message: (event.target as HTMLTextAreaElement).value });
        this.validateMessage(event.target.value);
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

    onMailSuccess(): void {
        const { closePopup, showNotification } = this.props;

        showNotification({
            message: __('Message was sent successfully'),
            type: 'success'
        });
        this.setState({
            messageIsSending: false,
            email: '',
            message: ''
        });
        closePopup();
    }

    onMailFail(): void {
        const { showNotification } = this.props;

        showNotification({
            message: __('Coudl not send email'),
            type: 'error'
        });
        this.setState({ messageIsSending: false });
    }

    onSendButtonClick(): void {
        const { email, message } = this.state;
        const validEmail = new Validator(email).isEmail();
        const validMessage = new Validator(message).isNotEmpty();

        if (validMessage && validEmail) {
            this.setState({ messageIsSending: true });
            SendContactMutation.sendEmailQuery(email, message, (response) => {
                response.json()
                    .then((data) => {
                        if (data.errors) {
                            this.onMailFail();
                        } else {
                            this.onMailSuccess();
                        }
                    })
                    .catch(() => {
                        this.onMailFail();
                    });
            });
        } else {
            this.validateEmail(email);
            this.validateMessage(message);
        }
    }

    validateEmail(email: string): void {
        const validEmail = new Validator(email).isEmail();

        if (!validEmail) {
            this.setState({ invalidEmail: true });
        } else {
            this.setState({ invalidEmail: false });
        }
    }

    validateMessage(message: string): void {
        const validMessage = new Validator(message).isNotEmpty();

        if (!validMessage) {
            this.setState({ invalidMessage: true });
        } else {
            this.setState({ invalidMessage: false });
        }
    }

    renderSendingEmail(): React.ReactNode {
        const { messageIsSending } = this.state;

        if (!messageIsSending) {
            return null;
        }

        return (
            <div block="Popup" elem="SendingEmailCover">
                <div block="Popup" elem="WaitCircle" />
                <div block="Popup" elem="WaitCircle" />
                <div block="Popup" elem="WaitCircle" />
            </div>
        );
    }

    renderPopup(): React.ReactNode {
        const {
            email,
            message,
            invalidEmail,
            invalidMessage
        } = this.state;

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div block="Popup" onClick={this.onOutsideClick}>
                <div block="Popup" elem="Wrapper" ref={this.contactFormRef}>
                    <h2 block="Popup" elem="Title">{__('Contact Us')}</h2>
                    <Input
                        label={__('Email')}
                        onChange={this.onEmailChange}
                        id="email"
                        name="email"
                        type="email"
                        placeholder={__('mail@example.com')}
                        value={email}
                        required
                        errorMessage={invalidEmail ? __('Please fill in correct email') : null}
                    />
                    <Input
                        type="textarea"
                        id="message"
                        name="message"
                        placeholder={__('Type your message...')}
                        onChange={this.onMessageChange}
                        label={__('Message')}
                        value={message}
                        required
                        errorMessage={invalidMessage ? __('Type in you message please') : null}
                    />
                    <button
                        block="Popup"
                        elem="SendButton"
                        onClick={this.onSendButtonClick}
                    >
                        {__('Send')}
                    </button>
                    {this.renderSendingEmail()}
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
