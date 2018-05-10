import React, { Component } from 'react';
import {
    View, StyleSheet, Text, AsyncStorage, StatusBar, NetInfo, Alert, Linking, NativeModules
} from 'react-native';
import { Container } from 'native-base';
import { COLORS, SIZES, STRINGS } from '../../constants';
import Spinner from 'react-native-spinkit';
import splashStore from './splashStore';
import { observer } from 'mobx-react';

@observer
export default class SplashContainer extends Component {

    componentDidMount() {
        const { navigation } = this.props;

        if (this.checkNetwork()) {
            setTimeout(() => {
                AsyncStorage.getItem('@UserToken').then(res => {
                    splashStore.refreshToken(navigation, res);
                })
            }, 0);
        }


    }

    openSettings = () => {
        NativeModules.OpenSettings.openNetworkSettings(data => {
            console.log('call back data', data);
        });
    }

    checkNetwork = () => {
        NetInfo.getConnectionInfo().then((connectionInfo) => {
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

    }

    render() {
        return (
            <Container style={[styles.wrapperCenter, { backgroundColor: COLORS.MAIN_COLOR }]}>
                <StatusBar
                    barStyle={COLORS.BAR_STYLE_LOGIN}
                    backgroundColor={COLORS.MAIN_COLOR}
                />
                <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
                    <Text style={styles.textLogoColor}>color</Text>
                    <Text style={styles.textLogoMe}>ME</Text>
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
    fontFamily: 'seguibl',
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
