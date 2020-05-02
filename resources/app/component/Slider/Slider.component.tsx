/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { Slide } from 'Store/Slides/Slides.action';
import { getTranslation } from 'Helper/Translation';
import CustomMath from 'Helper/Math';
import Asset from 'Helper/Asset';
import Device from 'Helper/Device';
import Image from 'Component/Image';

import 'Component/Slider/Slider.styles';

export interface SliderProps {
    slides: Slide[];

    /**
     * difference of clientX from drag start to drag end in pixels
     */
    dragDiffThreshold: number;
    initialActiveSlide: number;
    transitionSpeed: number;
    showCrumbs: boolean;
    showArrows: boolean;
}

export interface SliderState {
    activeSlideIndex: number;
}

export enum DragDirection {
    LEFT,
    RIGHT,
    NONE
}

export interface MouseEventCallback {
    (event: React.MouseEvent): void;
}

export interface DragEventCallback {
    (event: React.DragEvent): void;
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
        transitionSpeed: 300,
        showCrumbs: true,
        showArrows: true
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
        event.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
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

    getOnCrumbClick(slideIndex: number): MouseEventCallback {
        return (): void => {
            this.setActiveSlide(slideIndex);
        };
    }

    getOnArrowClick(type: 'left' | 'right'): MouseEventCallback {
        return (): void => {
            const { activeSlideIndex } = this.state;
            const nextSlide = type === 'left' ? -1 : 1;

            this.setActiveSlide(activeSlideIndex + nextSlide);
        };
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
                '--slider-transition-speed',
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
                    <Image
                        mix={{ block: 'Slider', elem: 'SlideImage' }}
                        src={`${slide.image}`}
                        initialImage={Asset.getImageUrl(slide.image, { w: 20 })}
                        alt="slide"
                        loading="lazy"
                        blurPlaceholderImage={false}
                    />
                    <div
                        block="Slider"
                        elem="SlideText"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: getTranslation(slide, 'en')?.content || '' }}
                    />
                    <div block="Slider" elem="SlideCover" draggable />
                </figure>
            </div>
        );
    }

    renderCrumb(index: number): React.ReactNode {
        const { activeSlideIndex } = this.state;
        const isActive = index === activeSlideIndex;

        return (
            <li key={index} block="Slider" elem="Crumb" mods={{ isActive }}>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                    block="Slider"
                    elem="CrumbButton"
                    onClick={this.getOnCrumbClick(index)}
                />
            </li>
        );
    }

    renderCrumbs(): React.ReactNode {
        const { showCrumbs, slides } = this.props;

        if (!showCrumbs) return null;

        return (
            <ul block="Slider" elem="CrumbsWrapper">
                {slides.map((slide, index) => this.renderCrumb(index))}
            </ul>
        );
    }

    renderArrow(type: 'left' | 'right'): React.ReactNode {
        const { showArrows } = this.props;

        return showArrows && (
            <button block="Slider" elem="Arrow" mods={{ type }} onClick={this.getOnArrowClick(type)}>
                {type === 'left' ? '<' : '>'}
            </button>
        );
    }

    render(): React.ReactNode {
        const { slides } = this.props;
        const isAndroid = Device.isAndroid();

        return (
            <div block="Slider" mods={{ isAndroid }}>
                {this.renderArrow('left')}
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
                {this.renderCrumbs()}
                {this.renderArrow('right')}
            </div>
        );
    }
}
