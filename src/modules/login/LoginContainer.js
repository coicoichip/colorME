import React, { Component } from 'react'
import {
    ActivityIndicator,
    Alert, AsyncStorage,
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    TouchableOpacity, Keyboard,
    View, TouchableWithoutFeedback,
    StyleSheet,

} from 'react-native';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import { Container, Item, Button, Text, Input, Form, Label } from 'native-base';
import { InputCommon, ButtonCommon } from '../../commons';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { observer } from "mobx-react";
import loginStore from './loginStore';
import DeviceInfo from 'react-native-device-info';
import splashStore from "../splash/splashStore";
import Analytics from 'appcenter-analytics';
import OneSignal from 'react-native-onesignal'
let _this;

@observer
class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: 'colorme.vn',
        }
        _this = this;
    }
    componentWillMount(){
        OneSignal.configure();
        OneSignal.init("a136d5c1-400f-456a-9c64-75c43f206f4d")
    }
    componentDidMount() {
        loginStore.getData();
        Analytics.trackEvent(STRINGS.ACTION_LOGIN_LOADED, {});
    }

    signInWithAccount = () => {
        // let device = {
        //     device_id: DeviceInfo.getUniqueID()
        // };
        // const deviceId = DeviceInfo.getDeviceId()
        loginStore.loginUser(this.props.navigation);
        // console.log(deviceId + "........");
        // loginStore.checkDevice(DeviceInfo ,splashStore.token || loginStore.token)
        loginStore.saveData();
        
    }

    onChangeData = field => value => {
        loginStore.login[field] = value;
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView
                style={{ flex: 1, backgroundColor: COLORS.LIGHT_COLOR }}
                enableOnAndroid={true}
                scrollEnabled={false}
                extraHeight={100}
            >

                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    <Container>
                        <StatusBar
                            barStyle={COLORS.BAR_STYLE_LOGIN}
                            backgroundColor={COLORS.MAIN_COLOR}
                        />

                        {/* logo */}
                        <View style={styles.wrapperLogo}>
                        <Image style={{ width: '50%', height: '50%' }}
                                source={require('../../../assets/image/Image_2.png')}
                                resizeMode={'contain'}

                            />
                        </View>

                        <View style={{ flex: 1, backgroundColor: COLORS.LIGHT_COLOR }} />

                        {/* form input */}
                        <View style={styles.contentForm}>
                            <InputCommon
                                returnKeyType={'next'}
                                size={styles.input}
                                value={loginStore.login.email}
                                label={STRINGS.EMAIL.toUpperCase()}
                                onChangeText={this.onChangeData('email')}
                            />

                            <InputCommon
                                returnKeyType={'go'}
                                secureTextEntry={true}
                                size={styles.input}
                                value={loginStore.login.password}
                                label={STRINGS.PASSWORD.toUpperCase()}
                                onChangeText={this.onChangeData('password')}
                                onSubmitEditing={this.signInWithAccount}
                            />
                            <View height={30} />
                        </View>
                        <View style={styles.wrapperButton}>
                            <ButtonCommon
                                isLoading={loginStore.isLoading}
                                onPress={this.signInWithAccount}
                                label={STRINGS.LOGIN.toUpperCase()}
                                text={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: SIZES.SUBTITLE_SIZE
                                }}
                            />
                        </View>


                        <View style={[wrapperCenter, { flexDirection: 'row', bottom: 30, backgroundColor: COLORS.NONE_COLOR }]}>
                            <Text style={[styles.textButton, { color: COLORS.GRAY_COLOR }]}>
                                {STRINGS.YOU_HAVE_NOT_ACCOUNT}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={SIZES.ACTIVE_OPACITY}
                                onPress={() => navigate("Register")}>
                                <Text style={styles.textButton}>{STRINGS.REGISTER_HERE}</Text>
                            </TouchableOpacity>

                        </View>
                    </Container>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        );
    }
}

const wrapperCenter = {
    justifyContent: 'center',
    alignItems: 'center',
}

const textLogo = {
    fontFamily: FONTS.LOGO_FONT,
    backgroundColor: 'transparent',
    color: COLORS.LIGHT_COLOR,
}

const text = {
    fontFamily: 'Roboto-Regular',
    backgroundColor: 'transparent',
    color: COLORS.DARK_COLOR,
    fontSize: SIZES.TEXT_BUTTON_SIZE,
}

const styles = StyleSheet.create({
    textLogoColor: {
        ...textLogo,
        fontSize: SIZES.LOGO_COLOR_SIZE,
    },
    textLogoMe: {
        ...textLogo,
        fontSize: SIZES.LOGO_ME_SIZE,
        marginTop: -40,
    },
    textButton: {
        ...text
    },
    wrapperButton: {
        ...wrapperCenter,
        width: SIZES.DEVICE_WIDTH_SIZE,
        position: 'absolute',
        bottom: SIZES.DEVICE_HEIGHT_SIZE / 4 - 30,
        paddingHorizontal: 80,
    },
    wrapperLogo: {
        ...wrapperCenter,
        flex: 1,
        backgroundColor: COLORS.MAIN_COLOR,
    },
    contentForm: {
        ...wrapperCenter,
        backgroundColor: COLORS.LIGHT_COLOR,
        width: SIZES.FORM_LOGIN_WIDTH_SIZE,
        borderRadius: SIZES.BORDER_RADIUS_CARD_SIZE,
        elevation: 5,
        bottom: SIZES.DEVICE_HEIGHT_SIZE / 4 - 10,
        shadowColor: COLORS.SHADOW_COLOR,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        marginHorizontal: SIZES.DEVICE_WIDTH_SIZE * 0.1,
        padding: SIZES.PADDING_ELEMENT_IN_CARD,
        position: 'absolute',
    },
    input: {
        width: SIZES.DEVICE_WIDTH_SIZE * 0.7,
        marginBottom: 10,
    }

});
export default LoginContainer