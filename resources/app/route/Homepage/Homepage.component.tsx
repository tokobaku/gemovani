import * as React from 'react';
import Slider from 'Component/Slider';

export default class Homepage extends React.Component<{}, {}> {
    render(): React.ComponentElement<{}, Homepage> {
        return (
            <>
                <Slider />
            </>
        );
    }
}
