/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { Slide } from 'Store/Slides/Slides.action';
import { getTranslation } from 'Helper/Translation';
import CustomMath from 'Helper/Math';
import 'Component/Slider/Slider.styles';

export interface SliderProps {
    slides: Slide[];

    /**
     * difference of clientX from drag start to drag end in pixels
     */
    dragDiffThreshold: number;
    initialActiveSlide: number;
    transitionSpeed: number;
}

export interface SliderState {
    activeSlideIndex: number;
}

export enum DragDirection {
    LEFT,
    RIGHT,
    NONE
}

/**
 * @interface AbstractSwipeEvent
 * abstract React.DragEvent and React,TouchEvent to make slider work both on mobile and desktop devices
 */
export interface AbstractSwipeEvent {
    clientX: number;
    clientY: number;
}

export default class Slider extends React.Component<SliderProps, SliderState> {
    dragEndClientX = 0;

    offsetX = 0;

    onDragStartClientX = 0;

    draggableRef = React.createRef<HTMLDivElement>();

    static defaultProps = {
        dragDiffThreshold: 50,
        initialActiveSlide: 0,
        transitionSpeed: 300
    };

    constructor(props: SliderProps) {
        super(props);
        const { initialActiveSlide } = this.props;

        this.state = {
            activeSlideIndex: initialActiveSlide
        };
    }

    componentDidMount(): void {
        const { initialActiveSlide } = this.props;

        this.state = {
            activeSlideIndex: initialActiveSlide
        };
    }

    componentDidUpdate(): void {
        this.setOffsetX();
    }

    onSwipeStart(event: AbstractSwipeEvent): void {
        this.onDragStartClientX = event.clientX;
    }

    onSwipe(event: AbstractSwipeEvent): void {
        this.setRefTransitionSpeed(0);
        if (this.draggableRef.current) {
            const newOffsetX = this.getClampedOffsetX(this.offsetX + this.onDragStartClientX - event.clientX);
            this.setRefOffsetX(newOffsetX);
        }
    }

    onSwipeEnd(event: AbstractSwipeEvent): void {
        this.dragEndClientX = event.clientX;
        const { transitionSpeed } = this.props;
        const { activeSlideIndex } = this.state;

        // eslint-disable-next-line default-case
        switch (this.getDragDirection()) {
        case DragDirection.LEFT:
            this.setActiveSlide(activeSlideIndex + 1);
            break;
        case DragDirection.RIGHT:
            this.setActiveSlide(activeSlideIndex - 1);
            break;
        }

        this.setRefTransitionSpeed(transitionSpeed);
        this.setOffsetX();
    }

    onDragStart(event: React.DragEvent): void {
        this.onSwipeStart(event);
    }

    onDrag(event: React.DragEvent): void {
        this.onSwipe(event);
    }

    onDragEnd(event: React.DragEvent): void {
        this.onSwipeEnd(event);
    }

    onTouchStart(event: React.TouchEvent): void {
        this.onSwipeStart(this.touchToAbstractSwipeEvent(event));
    }

    onTouchMove(event: React.TouchEvent): void {
        this.onSwipe(this.touchToAbstractSwipeEvent(event));
    }

    onTouchEnd(event: React.TouchEvent): void {
        this.onSwipeEnd(event.changedTouches.item(0));
    }

    getDragDirection(): DragDirection {
        const { dragDiffThreshold } = this.props;

        if (this.dragEndClientX - this.onDragStartClientX > dragDiffThreshold) {
            return DragDirection.RIGHT;
        }

        if (this.dragEndClientX - this.onDragStartClientX < -dragDiffThreshold) {
            return DragDirection.LEFT;
        }

        return DragDirection.NONE;
    }

    setActiveSlide(activeSlideIndex: number): void {
        const { slides } = this.props;

        if (activeSlideIndex > -1 && activeSlideIndex < slides.length) {
            this.setState({ activeSlideIndex });
            this.setOffsetX();
        }
    }

    setOffsetX(): void {
        const { activeSlideIndex } = this.state;

        this.offsetX = this.getClampedOffsetX(this.getSlideWidth() * activeSlideIndex);
        this.setRefOffsetX(this.offsetX);
    }

    setRefOffsetX(newOffsetX: number): void {
        if (this.draggableRef.current) {
            this.draggableRef.current.style.setProperty(
                '--offset-x',
                `${-newOffsetX}px`
            );
        }
    }

    setRefTransitionSpeed(transitionSpeed: number, unit = 'ms'): void {
        if (this.draggableRef.current) {
            this.draggableRef.current.style.setProperty(
                '--transition-speed',
                `${transitionSpeed}${unit}`
            );
        }
    }

    getClampedOffsetX(newOffsetX: number): number {
        return CustomMath.clamp(newOffsetX, 0, this.getMaxOffsetX());
    }

    getMaxOffsetX(): number {
        const { slides } = this.props;

        return Math.max(this.getSlideWidth() * (slides.length - 1));
    }

    getSlideWidth(): number {
        return this.draggableRef.current ? this.draggableRef.current.clientWidth : 0;
    }

    touchToAbstractSwipeEvent(event: React.TouchEvent): AbstractSwipeEvent {
        return event.touches.item(0);
    }

    renderSlide(index: number, slide: Slide): React.ReactNode {
        return (
            <div key={index} block="Slider" elem="SlideWrapper">
                <figure block="Slider" elem="SlideFigure">
                    <img block="Slider" elem="SlideImage" src={`/image/${slide.image}?w=1000`} alt="slide" />
                    <span
                        block="Slider"
                        elem="SlideText"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: getTranslation(slide, 'en')?.content || '' }}
                    />
                </figure>
            </div>
        );
    }

    render(): React.ReactNode {
        const { slides } = this.props;

        return (
            <div block="Slider">
                <div
                    block="Slider"
                    elem="DraggableWrapper"
                    onDragStart={this.onDragStart.bind(this)}
                    onDrag={this.onDrag.bind(this)}
                    onDragEnd={this.onDragEnd.bind(this)}
                    onTouchStart={this.onTouchStart.bind(this)}
                    onTouchMove={this.onTouchMove.bind(this)}
                    onTouchEnd={this.onTouchEnd.bind(this)}
                    onTouchCancel={this.onTouchEnd.bind(this)}
                    ref={this.draggableRef}
                >
                    {slides.map((slide, index) => this.renderSlide(index, slide))}
                </div>
            </div>
        );
    }
}
