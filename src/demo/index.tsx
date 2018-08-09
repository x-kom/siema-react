import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Siema from '../lib/siema-react';
import styled from 'styled-components';
import { WithBlur, SliderWithActiveSlide } from './components';

const BigSlider = styled(Siema) `
    width: 400px;

    img {
        width: 100%;
    }
`;

const SmallSlider = styled(Siema) `
    width: 100px;
    margin: 0 150px;

    div {

        img {
            width: 100%;
        }
    }
`;

const TripleSlider = styled(Siema) `
    width: 300px;

    img {
        width: 100px;
    }
`;

const SmallSliderWrapper = styled.div`
    width: 400px;
    overflow: hidden;
    position: relative;

    &:before, &:after {
        content: '';
        position: absolute;
        width: 50px;
        height: 43px;
        pointer-events: none
    }
    &:before {
        background: linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
        left: 0;
        top: 0;
        z-index: 10;
    }
    &:after {
        background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
        right: 0;
        top: 0;
        z-index: 10;
    }
`;

const FullWidthSlider = styled(Siema) `
    width: 100%;
`;

const SingleSlide = styled.div`
    border: 2px solid #666;
    border-radius: 16px;
    overflow: hidden;
    line-height: 0;
    width: ${({ fullWidth = false }: { fullWidth?: boolean }) => fullWidth ? '100%' : '400px'};
    box-sizing: border-box;
`;

class App extends React.Component<{}, { slides: number; images: string[]; mounted: boolean }> {

    state = {
        slides: 5,
        images: [
            'http://via.placeholder.com/350x150/FFC0CB?text=1',
            'http://via.placeholder.com/350x150/ADD8E6?text=2',
            'http://via.placeholder.com/350x150/FFC0CB?text=3',
            'http://via.placeholder.com/350x150/ADD8E6?text=4',
            'http://via.placeholder.com/350x150/FFC0CB?text=5',
            'http://via.placeholder.com/350x150/ADD8E6?text=6',
            'http://via.placeholder.com/350x150/FFC0CB?text=7',
            'http://via.placeholder.com/350x150/ADD8E6?text=8',
            'http://via.placeholder.com/350x150/FFC0CB?text=9',
        ],
        mounted: true,
    };

    staticSlides = [
        'http://via.placeholder.com/350x150/FFC0CB?text=1',
        'http://via.placeholder.com/350x150/ADD8E6?text=2',
        'http://via.placeholder.com/350x150/FFC0CB?text=3',
        'http://via.placeholder.com/350x150/ADD8E6?text=4',
        'http://via.placeholder.com/350x150/FFC0CB?text=5',
        'http://via.placeholder.com/350x150/ADD8E6?text=6',
        'http://via.placeholder.com/350x150/FFC0CB?text=7',
        'http://via.placeholder.com/350x150/ADD8E6?text=8',
        'http://via.placeholder.com/350x150/FFC0CB?text=9',
    ];

    private getSmallSliderRef = (element) => { this.smallSlider = element; };
    private getBigSliderRef = (element) => { this.bigSlider = element; };
    private getTripleSliderRef = (element) => { this.tripleSlider = element; };
    private getAutoSliderRef = (element) => { this.autoSlider = element; };

    private smallSlider;
    private bigSlider;
    private tripleSlider;
    private autoSlider;

    toggleMounted = () => {
        this.setState((state) => ({ mounted: !state.mounted }));
    }

    moreSlides = () => {
        this.changeNumberOfSlides(1);
    }

    lessSlides = () => {
        this.changeNumberOfSlides(-1);
    }

    changeNumberOfSlides = (diff) => {
        this.setState((state) => ({ slides: Math.max(Math.min(state.slides + diff, state.images.length), 1) }));
    }

    shuffleSlides = () => {
        const newImages = [];
        const oldImages = this.state.images.slice();
        while (oldImages.length) {
            const index = Math.round(Math.random() * (oldImages.length - 1));
            newImages.push(oldImages[index]);
            oldImages.splice(index, 1);
        }
        this.setState((state) => ({ images: newImages }));
    }

    // tslint:disable-next-line:max-func-body-length
    render() {

        return (
            <React.Fragment>
                Slider with focusable element in slides (div with tabIndex)
                <BigSlider>
                    {this.state.images.slice(0, this.state.slides).map((src) => <WithBlur key={src}>{src}</WithBlur>)}
                </BigSlider>
                <hr />
                Multiple visible slides (center mode made with an old method)
                <SmallSliderWrapper>
                    <SmallSlider overflowHidden={false}>
                        {this.staticSlides.map((src) => <div key={src}><img src={src} alt="Siema image" /></div>)}
                    </SmallSlider>
                </SmallSliderWrapper>
                <hr />
                Standard slider with multiple slides, controlled with buttons
                <div>
                    <button onClick={() => { this.tripleSlider.prev(); }}>prev</button>
                    <button onClick={() => { this.tripleSlider.next(); }}>next</button>
                </div>
                <TripleSlider perPage={3} innerRef={this.getTripleSliderRef} clickable={true} preventClickOnDrag={true}>
                    {this.staticSlides.map((src) => <div key={src}><img src={src} alt="Siema image" /></div>)}
                </TripleSlider>
                <hr />
                Slider with different modes (without freeDrag)
                <SliderWithActiveSlide slides={this.staticSlides.slice(0, this.state.slides)} />
                <SliderWithActiveSlide slides={this.staticSlides.slice(0, this.state.slides)} mode={'right'} />
                <SliderWithActiveSlide slides={this.staticSlides.slice(0, this.state.slides)} mode={'center'} />
                <SliderWithActiveSlide slides={this.staticSlides.slice(0, this.state.slides)} mode={'centerFit'} />
                Slider with different modes (with freeDrag)
                <SliderWithActiveSlide slides={this.staticSlides.slice(0, this.state.slides)} freeDrag={true} />
                <SliderWithActiveSlide slides={this.staticSlides.slice(0, this.state.slides)} freeDrag={true} mode={'right'} />
                <SliderWithActiveSlide slides={this.staticSlides.slice(0, this.state.slides)} freeDrag={true} mode={'center'} />
                <SliderWithActiveSlide slides={this.staticSlides.slice(0, this.state.slides)} freeDrag={true} mode={'centerFit'} />
                <hr style={{ clear: 'both' }} />
                Responsive slider with changing number of visible slides (breakpoints: 1100px, 640px, 320px)
                <div>
                    <button onClick={() => { this.autoSlider.prev(); }}>prev</button>
                    <button onClick={() => { this.autoSlider.next(); }}>next</button>
                </div>
                <div style={{ maxWidth: '1522px', border: '2px solid red' }}>
                    <FullWidthSlider perPage={{ 320: 1.5, 640: 2.5, 1100: 4 }} innerRef={this.getAutoSliderRef} mode={'left'} clickable={false} preventClickOnDrag={true}>
                        <SingleSlide fullWidth={true}><img src="http://via.placeholder.com/350x150/FFC0CB?text=1" alt="Siema image" /></SingleSlide>
                        <SingleSlide fullWidth={true}><img src="http://via.placeholder.com/350x150/ADD8E6?text=2" alt="Siema image" /></SingleSlide>
                        <SingleSlide fullWidth={true}><img src="http://via.placeholder.com/350x150/FFC0CB?text=3" alt="Siema image" /></SingleSlide>
                        <SingleSlide fullWidth={true}><img src="http://via.placeholder.com/350x150/ADD8E6?text=4" alt="Siema image" /></SingleSlide>
                        <SingleSlide fullWidth={true}><img src="http://via.placeholder.com/350x150/FFC0CB?text=5" alt="Siema image" /></SingleSlide>
                        <SingleSlide fullWidth={true}><img src="http://via.placeholder.com/350x150/ADD8E6?text=6" alt="Siema image" /></SingleSlide>
                        <SingleSlide fullWidth={true}><img src="http://via.placeholder.com/350x150/FFC0CB?text=7" alt="Siema image" /></SingleSlide>
                        <SingleSlide fullWidth={true}><img src="http://via.placeholder.com/350x150/ADD8E6?text=8" alt="Siema image" /></SingleSlide>
                        <SingleSlide fullWidth={true}><img src="http://via.placeholder.com/350x150/FFC0CB?text=9" alt="Siema image" /></SingleSlide>
                    </FullWidthSlider>
                </div>
                <hr style={{ clear: 'both' }} />
                Two sliders joined
                <button onClick={() => { this.bigSlider.prev(); }}>prev</button>
                <button onClick={() => { this.bigSlider.next(); }}>next</button>
                <BigSlider duration={100} innerRef={this.getBigSliderRef} onChange={(index: number) => { this.smallSlider.goTo(index); }}>
                    {this.staticSlides.map((src) => <div key={src}><img src={src} alt="Siema image" /></div>)}
                </BigSlider>
                <SmallSliderWrapper>
                    <SmallSlider duration={100} innerRef={this.getSmallSliderRef} onChange={(index: number) => { this.bigSlider.goTo(index); }} overflowHidden={false} clickable={true}>
                        {this.staticSlides.map((src) => <div key={src}><img src={src} alt="Siema image" /></div>)}
                    </SmallSlider>
                </SmallSliderWrapper>
                <hr />
                Modifying set of slides
                <div>
                    <button onClick={this.moreSlides}>more slides</button>
                    <button onClick={this.lessSlides}>less slides</button>
                    <button onClick={this.shuffleSlides}>shuffle slides</button>
                </div>
                <BigSlider onChange={(index) => { console.log('onchange', index); }}>
                    {this.state.images.slice(0, this.state.slides).map((src) => <SingleSlide key={src}><img src={src} alt="Siema image" /></SingleSlide>)}
                </BigSlider>
                <hr />
                Unmounting example <button onClick={this.toggleMounted}>mount/unmount</button>
                {this.state.mounted && <BigSlider>
                    {this.state.images.map((src) => <div key={src}><img src={src} alt="Siema image" /></div>)}
                </BigSlider>}
            </React.Fragment>
        );
    }
}

const renderApp = () => {
    ReactDOM.render(
        <App />
        ,
        document.getElementById('app'),
    );
};

renderApp();
