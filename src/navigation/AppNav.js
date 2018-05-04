import React, {PropTypes} from 'react';
import {AsyncStorage, BackHandler, Linking, Platform} from 'react-native';
import {Main} from './appRouter';
// import OneSignal from "react-native-onesignal";
import {connect} from 'react-redux';
class AppNav extends React.Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        // this.handleUrl = this.handleUrl.bind(this);
        // this.onOpened = this.onOpened.bind(this);
        // this.onReceived = this.onReceived.bind(this);
        // this.handleUrl = this.handleUrl.bind(this);
    }

    // componentWillMount() {
    //     OneSignal.addEventListener('received', this.onReceived);
    //     OneSignal.addEventListener('registered', this.onRegistered);
    //     OneSignal.addEventListener('ids', this.onIds);
    // }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
        // OneSignal.removeEventListener('received', this.onReceived);
        // OneSignal.removeEventListener('opened', this.onOpened);
        // OneSignal.removeEventListener('registered', this.onRegistered);
        // OneSignal.removeEventListener('ids', this.onIds);
    }

    // onOpened(openResult) {
    //     Linking.addEventListener('url', () => {
    //         this.handleUrl(openResult.notification.payload.launchURL);
    //     });

    //     Linking.getInitialURL().then(
    //         () =>  this.handleUrl(openResult.notification.payload.launchURL)
    //     );
    // }

    // onReceived(notification) {
    //     console.log("Notification received: ", notification);
    // }

    // onRegistered(notifData) {
    //     console.log("Device had been registered for push notifications!", notifData);
    // }

    // onIds(device) {
    //     console.log('Device info: ', device);
    // }

    shouldCloseApp(nav) {
        return nav.index === 0;
    }

    handleBack() {
        const {dispatch, nav} = this.props;
        console.log(nav);
        if (this.shouldCloseApp(nav)) return false;
        dispatch({
            type: 'Navigation/BACK'
        });
        return true;
    }
    // componentWillReceiveProps(nextProps){
    //     if ( nextProps.status !== this.props.status && nextProps.status === 200){
    //         OneSignal.addEventListener('opened', this.onOpened);
    //     }
    // }

    //  handleUrl(url) {
    //     const
    //         {navigation} = this.props,
    //         {dispatch} = navigation,
    //         params = {};
    //     const  uriPrefix =  'colorme://';
    //             let
    //                 path = url.split(uriPrefix)[1];
    //             if (!path) {
    //                 path = url;
    //             }
    //             const action = Start.router.getActionForPathAndParams(path, params);
    //             if (action) {
    //                 console.log(action);
    //                 dispatch(action);
    //             }
    //     }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        // if (this.props.status === 200) {
        //        OneSignal.addEventListener('opened', this.onOpened)
        // }
    }

    render() {
        return (
            <Main navigation={this.props.navigation}/>

        );
    }

}

function mapStateToProps(state) {
    return {
        status: state.login.status,
        login: state.login.login,
    }

}


export default connect(mapStateToProps)(AppNav);