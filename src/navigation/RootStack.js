import React, { Component } from 'react';
import { RootStack } from './Router';
import { Root } from "native-base";
import { Platform , Linking} from "react-native";

import {observable} from "mobx";
import {observer} from "mobx-react"
import OneSignal from "react-native-onesignal";
import splashStore from "../modules/splash/splashStore";
@observer
export default class RootStackContainer extends Component {
    constructor() {
        super();
        this.onReceived = this.onReceived.bind(this);
        this.onOpened = this.onOpened.bind(this);
    }
    componentWillMount(){
        OneSignal.configure();
        OneSignal.init("a136d5c1-400f-456a-9c64-75c43f206f4d");
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
    }
    componentWillUnMount(){
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
    }
     onOpened(openResult) {
        Linking.addEventListener('url', () => {
            this.handleUrl(openResult.notification.payload.launchURL)
        });

        Linking.getInitialURL().then(
            () =>  this.handleUrl(openResult.notification.payload.launchURL)
        );
    }
    onReceived(notification) {
        console.log("Notification received: ", notification);
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
                <RootStack navigation = {this.props.navigation} />
            </Root>
        )
    }
    componentDidMount() {
        if (splashStore.status === 200) {
            OneSignal.addEventListener('opened', this.onOpened);
        }
    }

    
}


