/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { BEMEntity } from 'rebem-classname';
import __ from 'Helper/__';

import 'Component/Input/Input.style';

export interface InputProps {
    mix: BEMEntity;
    type: 'email' | 'textarea';
    label: string | undefined;
    id: string;
    name: string;
    value: string;
    placeholder: string;
    required: boolean;
    onChange: React.ChangeEventHandler;
    errorMessage: string | null;
}

export interface InputState {
    isFocused: boolean;
}

export default class Input extends React.PureComponent<InputProps, InputState> {
    static defaultProps = {
        mix: {},
        required: false,
        value: '',
        placeholder: ''
    };

    constructor(props: InputProps) {
        super(props);

        this.state = {
            isFocused: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onFocus(): void {
        this.setState({ isFocused: true });
    }

    onBlur(): void {
        this.setState({ isFocused: false });
    }

    renderErrorMessage(): React.ReactNode {
        const { errorMessage } = this.props;
        const { isFocused } = this.state;

        if (isFocused) {
            return null;
        }

        return (
            <div block="Input" elem="Error">{errorMessage}</div>
        );
    }

    renderEmail(): React.ReactNode {
        const {
            id,
            name,
            type,
            value,
            required,
            onChange,
            placeholder
        } = this.props;

        return (
            <>
                <input
                    block="Input"
                    elem="Input"
                    mods={{ type }}
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
                {this.renderErrorMessage()}
            </>
        );
    }

    renderTextarea(): React.ReactNode {
        const {
            id,
            name,
            value,
            required,
            onChange,
            placeholder,
            type
        } = this.props;

        return (
            <>
                <textarea
                    block="Input"
                    elem="Input"
                    mods={{ type }}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
                {this.renderErrorMessage()}
            </>
        );
    }

    renderInput(): React.ReactNode {
        const { type } = this.props;

        if (type === 'email') {
            return this.renderEmail();
        }

        return this.renderTextarea();
    }

    renderLabel(): React.ReactNode {
        const { label, id, required } = this.props;

        return label && (
            <label block="Input" elem="Label" htmlFor={id}>
                {__('%s %s', label, required ? '*' : '')}
            </label>
        );
    }

    render(): React.ReactNode {
        const { mix } = this.props;

        return (
            <div block="Input" mix={mix}>
                {this.renderLabel()}
                {this.renderInput()}
            </div>
        );
    }
}
