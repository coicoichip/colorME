import React, { Component } from 'react';
import RegisterContainer from './modules/register/RegisterContainer';
import {RootStack} from './navigation/Router'
export default class App extends Component {
  render() {
    return (
      <RootStack/>
    );
  }
};