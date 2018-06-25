import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Siema from '../lib/siema-react';
import styled from 'styled-components';

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
    width:300px;

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

const SingleSlide = styled.div`
    border: 1px solid red;
    border-radius: 8px;
    overflow: hidden;
    line-height: 0;
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

    private getSmallSliderRef = (element) => { this.smallSlider = element; };
    private getBigSliderRef = (element) => { this.bigSlider = element; };

    private smallSlider;
    private bigSlider;

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

    render() {

        return (
            <div>
                <button onClick={this.moreSlides}>more slides</button>
                <button onClick={this.lessSlides}>less slides</button>
                <button onClick={this.shuffleSlides}>shuffle slides</button>
                <BigSlider onChange={(index) => { console.log('onchange', index); }}>
                    {this.state.images.slice(0, this.state.slides).map((src) => <SingleSlide key={src}><img src={src} alt="Siema image" /></SingleSlide>)}
                </BigSlider>
                <hr />
                Multiple visible slides
                <SmallSliderWrapper>
                    <SmallSlider overflowHidden={false}>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=1" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=2" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=3" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=4" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=5" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=6" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=7" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=8" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=9" alt="Siema image" /></div>
                    </SmallSlider>
                </SmallSliderWrapper>
                <TripleSlider perPage={3} clickable={true} preventClickOnDrag={true}>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=1" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=2" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=3" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=4" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=5" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=6" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=7" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=8" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=9" alt="Siema image" /></div>
                </TripleSlider>
                <hr style={{ clear: 'both' }} />
                <button onClick={() => { this.bigSlider.prev(); }}>prev</button>
                <button onClick={() => { this.bigSlider.next(); }}>next</button>
                <BigSlider duration={100} innerRef={this.getBigSliderRef} onChange={(index: number) => { this.smallSlider.goTo(index); }}>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=1" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=2" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=3" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=4" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=5" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=6" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=7" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=8" alt="Siema image" /></div>
                    <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=9" alt="Siema image" /></div>
                </BigSlider>
                <SmallSliderWrapper>
                    <SmallSlider duration={100} innerRef={this.getSmallSliderRef} onChange={(index: number) => { this.bigSlider.goTo(index); }} overflowHidden={false} clickable={true}>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=1" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=2" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=3" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=4" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=5" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=6" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=7" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/ADD8E6?text=8" alt="Siema image" /></div>
                        <div><img src="http://via.placeholder.com/350x150/FFC0CB?text=9" alt="Siema image" /></div>
                    </SmallSlider>
                </SmallSliderWrapper>
                <hr />
                Unmounting example <button onClick={this.toggleMounted}>mount/unmount</button>
                {this.state.mounted && <BigSlider>
                    {this.state.images.map((src) => <div key={src}><img src={src} alt="Siema image" /></div>)}
                </BigSlider>}
            </div>
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
