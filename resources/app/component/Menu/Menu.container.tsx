/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { openPopup, PopupActionInterface } from 'Store/Popup/Popup.action';
import Menu from 'Component/Menu/Menu.component';

export const mapDispatchToProps = (dispatch: React.Dispatch<PopupActionInterface>): DispatchProps => ({
    openPopup: (): void => dispatch(openPopup())
});

export interface DispatchProps {
    openPopup: () => void;
}

export class MenuContainer extends React.PureComponent<DispatchProps> {
    render(): React.ReactNode {
        const { openPopup } = this.props;

        return <Menu openPopup={openPopup} />;
    }
}

export default connect(null, mapDispatchToProps)(MenuContainer);
