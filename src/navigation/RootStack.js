import React, { Component } from 'react';
import { RootStack } from './Router';
import { Root } from "native-base";
import { Platform } from "react-native";

import {observable} from "mobx";
import {observer} from "mobx-react"
import OneSignal from "react-native-onesignal";
@observer
export default class RootStackContainer extends Component {
    constructor() {
        super()
    }
    componentWillMount(){
        OneSignal.configure();
        OneSignal.init("a136d5c1-400f-456a-9c64-75c43f206f4d")
    }
    handleUrl(url) {
        const
            { navigation } = this.props,
            { dispatch } = navigation,
            params = {};
        const uriPrefix = 'colorme://';
        let
            path = url.split(uriPrefix)[1];
        if (!path) {
            path = url;
        }
        const action = RootStack.router.getActionForPathAndParams(path, params);
        if (action) {
            dispatch(action);
        }
    }


    render() {
        const prefix = Platform.OS == 'android' ? 'colorme://colorme/' : 'colorme://';
        return (
            <Root>
                <RootStack navigation = {this.props.navigation}/>
            </Root>
        )
    }
}


