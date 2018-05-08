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
import { STRINGS, COLORS, SIZES } from '../../constants';
import { Container, Item, Button, Text, Input, Form, Label } from 'native-base';
import { InputCommon, ButtonCommon } from '../../commons';
import loginStore  from './loginStore';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { observer } from "mobx-react";
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
    componentWillMount() {
        loginStore.getDataLogin(this.props.navigation);

    }

    signInWithAccount() {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (loginStore.login.email == '' || loginStore.login.password == '') {
            Alert.alert("Có lỗi xảy ra", "Bạn cần nhập đầy đủ thông tin ");
            return;
        } if (reg.test(loginStore.login.email) == false) {
            Alert.alert("Có lỗi xảy ra", "Địa chỉ email không hợp lệ");
            return;
        }
        loginStore.loginUser(this.props.navigation);
        loginStore.setDataLogin();
    }

    signIn() {
        AsyncStorage.setItem('url', this.state.url).then(
            () => this.signInWithAccount()
            
        )
        console.log(loginStore.login)
    }


    onChangeData = field => value => { loginStore.login[field] = value };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                enableOnAndroid={true}
                extraHeight={50}
            >
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    <Container>
                        <StatusBar
                            barStyle="light-content"
                            backgroundColor={COLORS.MAIN_COLOR}
                        />

                        {/* logo */}
                        <View style={styles.wrapperLogo}>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.textLogoColor}>color</Text>
                                <Text style={{ height: 15 }} />
                                <Text style={styles.textLogoMe}>ME</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, backgroundColor: COLORS.LIGHT_COLOR }} />

                        {/* form input */}
                        <View style={styles.contentForm}>
                            <Item stackedLabel style={styles.input}>

                                <Label style={{
                                    color: COLORS.MAIN_COLOR,
                                    fontFamily: 'Montserrat-SemiBold',
                                    fontSize: SIZES.SUBTITLE_SIZE
                                }}>{'Email'}</Label>
                                <Input
                                    autoCorrect={false}
                                    value={loginStore.login.email}
                                    onChangeText={this.onChangeData('email')}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    style={{
                                        fontFamily: 'Montserrat-Medium',
                                        fontSize : 12,
                                        color : 'rgba(195, 195, 195)'
                                    }}
                                />
                            </Item> */}

                            <Item stackedLabel style={styles.input}>
                                <Label style={{
                                    color: COLORS.MAIN_COLOR,
                                    fontFamily: 'Montserrat-SemiBold',
                                    fontSize: SIZES.SUBTITLE_SIZE
                                }}>{'Password'}</Label>

                             <Input
                                    autoCorrect={false}
                                    secureTextEntry = {true}
                                    value={loginStore.login.password}
                                    onChangeText={this.onChangeData('password')}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    style={{
                                        fontFamily: 'Montserrat-Medium',
                                        fontSize : 12,
                                        color : 'rgba(195, 195, 195)'
                                    }}
                                />
                            </Item>
                            <View height={30} />
                        </View>
                        <View style={styles.wrapperButton}>
                            <ButtonCommon
                                isLoading={loginStore.isLoading}
                                onPress={() => this.signIn()}
                                label={'Đăng nhập'}
                                style={{
                                    elevation: 6, shadowColor: COLORS.SHADOW_COLOR,
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.4,
                                }}

                            />
                        </View>


                        <View style = {[wrapperCenter, {flexDirection : 'row',  bottom : 50, backgroundColor: 'white'}]}>
                        <Text style={{color : 'rgb(109, 109, 109)', fontSize : 13}}>Bạn chưa có tài khoản? </Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                                        <Text style={[ { color: 'black', fontSize : 13 }]}>Đăng kí tại đây </Text>
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
    fontFamily: 'Montserrat-ExtraBold',
    backgroundColor: 'transparent',
    color: COLORS.LIGHT_COLOR,
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
    wrapperButton: {
        ...wrapperCenter,
        width: SIZES.DEVICE_WIDTH_SIZE,
        position: 'absolute',
        bottom:  SIZES.DEVICE_HEIGHT_SIZE / 4 - 20,
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
        width: SIZES.DEVICE_WIDTH_SIZE * 0.8,
        borderRadius: SIZES.BORDER_RADIUS_CARD_SIZE,
        elevation: 5,
        shadowColor: COLORS.SHADOW_COLOR,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        bottom: SIZES.DEVICE_HEIGHT_SIZE / 4,
        marginHorizontal: SIZES.DEVICE_WIDTH_SIZE * 0.1,
        padding: SIZES.PADDING_ELEMENT_IN_CARD,
        position: 'absolute',
    },
    input: {
        width: SIZES.DEVICE_WIDTH_SIZE * 0.7,
    }

});
export default LoginContainer
