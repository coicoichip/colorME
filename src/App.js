import React, { Component } from 'react';
import RootStackContainer from "./navigation/RootStack"
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose, applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers/index';
import {Root} from "native-base"
export default class App extends Component {
  constructor(){
    super()
  } 
  render() {
    const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
    return (
      <Provider store={store}>
        <Root>
          <RootStackContainer/>
        </Root>
      </Provider>
    )
  }
}