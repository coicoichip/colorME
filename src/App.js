import React, { Component } from 'react';
import RegisterContainer from './modules/register/RegisterContainer';
import {RootStack} from './navigation/Router';
import { Root } from "native-base";
export default class App extends Component {
  render() {
    return (
      <Root>
      <RootStack/>
      </Root>
    );
  }
};