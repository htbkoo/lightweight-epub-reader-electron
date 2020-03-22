import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import {ThemeProvider} from '@material-ui/core/styles';

import Application from './components/Application';
import store from './store';
import "./app.css";
import {createEpubReaderTheme} from "./helpers/helpers";

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <ThemeProvider theme={createEpubReaderTheme()}>
                <Provider store={store}>
                    <Component/>
                </Provider>
            </ThemeProvider>
        </AppContainer>,
        mainElement
    );
};

render(Application);
