import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { compose, applyMiddleware, createStore } from 'redux';
import { Root } from "native-base";
import rootReducer from './reducers/index';

import AppNavigationWithState from "./navigation/AppNavigationWithState"

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

class App extends React.Component {
    render() {
        return (
            <Root>
                <Provider store={store}>
                    <AppNavigationWithState/>
                </Provider>
            </Root>      
        );
    }
}
export default App;