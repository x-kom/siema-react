import React from 'react';
import * as ReactDOM from 'react-dom';
import Siema from '~/lib/react-siema';
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
        width: 100px;

        img {
            width: 100px;
        }
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

const renderApp = () => {
    ReactDOM.render(
        <div>
            No siema ;)
            <BigSlider>
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
                <SmallSlider onChange={(index) => console.log(index)} overflowHidden={false}>
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
        </div >
        ,
        document.getElementById('app'),
    );
};

renderApp();
