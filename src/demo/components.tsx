import * as React from 'react';
import styled, { css } from 'styled-components';
import { SiemaOptions } from 'siema';
import Siema from '../lib/siema-react';

const Tile = styled.div`
    width: 100%;
    height: 100px;
    position: relative;
    background: pink;
    box-shadow: inset 0 0 10px red;
`;

const Focusable = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    height: 30px;
    width: 30px;
    background: grey;
`;

export class WithBlur extends React.Component<{}, { isFocused: boolean }> {
    state = {
        isFocused: false,
    };

    blurHandler = () => {
        console.log('blurred');
        this.setState({ isFocused: false });
    }

    clickHandler = () => {
        this.setState((state) => ({ isFocused: !state.isFocused }));
    }

    render() {
        return (
            <Tile>
                <Focusable tabIndex={0} onBlur={this.blurHandler} onClick={this.clickHandler}>{this.state.isFocused ? 'x' : 'o'}</Focusable>
                {this.props.children}
            </Tile>
        );
    }
}

const SliderForModes = styled(Siema) `
    width: 450px;

    & > div {
        width: 100px;

        img {
            width: 100%;
        }
    }
`;

const SlideHighlightable = styled.div`
    position: relative;

    ${({ active }: { active?: boolean }) => active
        ? css`
            &:after {
                content: ' ';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                border: 1px solid red;
            }
        `
        : ''
    }
`;

export class SliderWithActiveSlide extends React.Component<{ mode?: SiemaOptions['mode']; slides: string[]; freeDrag?: boolean }, { activeSlide: number }> {
    state = {
        activeSlide: 0,
    };

    slider;

    getRef = (slider) => {
        this.slider = slider;
    }

    onChange = (params) => {
        console.log(params);
        this.setState({ activeSlide: params.currentSlide });
    }

    prev = () => {
        this.slider.prev();
    }
    next = () => {
        this.slider.next();
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <button onClick={this.prev}>prev</button><button onClick={this.next}>next</button> {this.props.freeDrag ? 'free drag' : <span style={{ textDecoration: 'line-through' }}>free drag</span>} | {this.props.mode}
                </div>
                <SliderForModes perPage={0} mode={this.props.mode} freeDrag={this.props.freeDrag} clickable={true} innerRef={this.getRef} onChange={this.onChange}>
                    {this.props.slides.map((src, i) => <SlideHighlightable key={src} active={i === this.state.activeSlide}><img src={src} alt="Siema image" /></SlideHighlightable>)}
                </SliderForModes>
            </React.Fragment >
        );
    }
}
