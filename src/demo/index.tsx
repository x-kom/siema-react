import React from 'react';
import * as ReactDOM from 'react-dom';

const renderApp = () => {
    ReactDOM.render(
        <div>
            No siema ;)
        </div>
        ,
        document.getElementById('app'),
    );
};

if (module.hot) {
    module.hot.accept('./*', () => {
        renderApp();
    });
}
