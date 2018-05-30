import React, { Component } from 'react';
import RootStackContainer from "./navigation/RootStack"
import navStore from "./navigation/navStore";
import {addNavigationHelpers} from "react-navigation";
import {Root} from "native-base"
export default class App extends Component {
  constructor(){
    super()
  } 
 
  render() {
    return (
      <Root>
        <RootStackContainer/>
      </Root>
    )}}
    
  
