import React, { Component } from 'react';
import { RootStack } from './Router';
import { Root } from "native-base";
import { Platform } from "react-native";
import OneSignal from "react-native-onesignal";
import {observable} from "mobx";
import {observer} from "mobx-react";
import navStore from "./navStore";
import RootStackContainer from "./RootStack"
import {addNavigationHelpers} from "react-navigation"
@observer
export default class AppNavigator extends Component {
    constructor(){
        super()
    }
    render(){
        return (
            <RootStackContainer navigation={addNavigationHelpers({
                dispatch: navStore.dispatch,
                state: navStore.navigationState,
              })} />
        )

    }
}
