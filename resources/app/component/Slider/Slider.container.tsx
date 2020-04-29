/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from 'Store';
import FetchGraphql from 'Helper/FetchGraphql';
import SlidesQuery from 'Query/SlidesQuery';
import { updateSlides, Slide, SlidesAction } from 'Store/Slides/Slides.action';
import Slider from 'Component/Slider/Slider.component';

export const mapStateToProps = (state: ReduxState): StateProps => ({
    slides: state.SlidesReducer.slides
});

export const mapDispatchToProps = (dispatch: React.Dispatch<SlidesAction>): DispatchProps => ({
    updateSlides: (slides: Slide[]): void => dispatch(updateSlides(slides))
});

export interface DispatchProps {
    updateSlides: (slides: Slide[]) => void;
}

export interface StateProps {
    slides: Slide[];
}

export interface SliderContainerProps extends DispatchProps, StateProps {}

export class SliderContainer extends React.Component<SliderContainerProps> {
    componentDidMount(): void {
        this.requestSlides();
    }

    requestSlides(): void {
        const { updateSlides } = this.props;

        FetchGraphql.get(
            SlidesQuery.getAllSlides(),
            (response) => response.json().then(({ data }) => updateSlides(data?.slides))
        );
    }

    render(): React.ReactNode {
        const { slides } = this.props;

        return (
            <Slider slides={slides} dragDiffThreshold={100} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderContainer);
