import * as React from 'react';
import styled from 'styled-components';

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
