import React, { Component } from 'react';
import AppNavigator from "./navigation/AppNavigator"

import {addNavigationHelpers} from "react-navigation";
import {Root} from "native-base"
export default class App extends Component {
  constructor(){
    super()
  } 
 
  render() {
    return (
      <Root>
        <AppNavigator/>
      </Root>
    )}}
    
  
