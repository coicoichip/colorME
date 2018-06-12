import React, { Component } from 'react';
import {
    View, StyleSheet, Text, AsyncStorage, StatusBar, NetInfo, Alert, Linking, NativeModules
} from 'react-native';
import { Container } from 'native-base';
import { COLORS, SIZES, STRINGS , FONTS} from '../../constants';
import Spinner from 'react-native-spinkit';
// import loginStore from '../login/loginStore';
import splashStore from "./splashStore"
import { observer } from 'mobx-react';
import { resetScreen } from '../../helper';
import deviceStore from "../check-device/deviceStore"
import DeviceInfo from 'react-native-device-info';
import OneSignal from "react-native-onesignal";
@observer
export default class SplashContainer extends Component {
    componentWillMount(){
        OneSignal.configure();
        OneSignal.init("a136d5c1-400f-456a-9c64-75c43f206f4d")
        OneSignal.addEventListener('ids', this.onIds);
        console.log("aaa")
    }
    componentWillUnmount() {
        OneSignal.removeEventListener('ids', this.onIds);
    }
    onIds = (device) => {
		console.log('Device info: ', device);
    }
    checkNetwork = async () => {
        const result = await NetInfo.getConnectionInfo().then((connectionInfo) => {
            //check network connect success
            if (connectionInfo.type == 'none') {
                Alert.alert(
                    STRINGS.HAVE_ERROR,
                    STRINGS.NOT_CONNTECT_NETWORK,
                    [
                        {
                            text: STRINGS.SETTING, onPress: () => {
                                this.openSettings()
                            }
                        },
                        { text: STRINGS.TRY_AGAIN, onPress: () => this.componentDidMount() },
                    ],
                    { cancelable: false }
                )
                return false;
            }
            return true;
        });
        return result;
    }

    componentDidMount() {
        const { navigation } = this.props;  
        // let device = {
        //     device_id : DeviceInfo.getUniqueID(),
        //     device_name : DeviceInfo.getModel(),
        //     device_os : DeviceInfo.getSystemName(),
        // }
        // console.log(device)
        this.checkNetwork().then(async function(res) {
            try {
                 const token = await AsyncStorage.getItem('@UserToken')
                 const id = await AsyncStorage.getItem("@ID")
                if(token && id){
                    console.log(token, id, navigation)
                    splashStore.refreshToken(navigation, token)
                }else{
                    
                    resetScreen(navigation, 'Login')
                }
            }
            catch(err){
                resetScreen(navigation, 'Login')
            }
            
                
        })
        .catch(res => {})
    }

    openSettings = () => {
        NativeModules.OpenSettings.openNetworkSettings(data => {
            console.log('call back data', data);
        });
    }



    render() {
        return (
            <Container style={[styles.wrapperCenter, { backgroundColor: COLORS.MAIN_COLOR }]}>
                <StatusBar
                    barStyle={COLORS.BAR_STYLE_LOGIN}
                    backgroundColor={COLORS.MAIN_COLOR}
                />
                <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
                    <Text style={styles.textLogoColor}>{STRINGS.LOGO_COLOR}</Text>
                    <Text style={styles.textLogoMe}>{STRINGS.LOGO_ME}</Text>
                </View>
                <Spinner
                    size={SIZES.LOADING_SIZE}
                    type={'ThreeBounce'}
                    color={COLORS.LIGHT_COLOR} />
            </Container>
        );
    }
}

const textLogo = {
    fontFamily: FONTS.LOGO_FONT,
    backgroundColor: 'transparent',
    color: COLORS.LIGHT_COLOR,
}

const styles = StyleSheet.create({
    wrapperCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLogoColor: {
        ...textLogo,
        fontSize: SIZES.LOGO_COLOR_SIZE,
    },
    textLogoMe: {
        ...textLogo,
        fontSize: SIZES.LOGO_ME_SIZE,
        marginTop: -40,
    },
})
