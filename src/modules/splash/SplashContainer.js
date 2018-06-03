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


@observer
export default class SplashContainer extends Component {
    
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
        this.checkNetwork().then(async function(res) {
            try {
                 const token = await AsyncStorage.getItem('@UserToken')
                 const id = await AsyncStorage.getItem("@ID")
                if(token && id){
                    
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
