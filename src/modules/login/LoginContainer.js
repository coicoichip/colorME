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
    TextInput
} from 'react-native';
import { STRINGS, COLORS, SIZES } from '../../constants';
import { Container, Button, Text } from 'native-base';
import {InputCommon} from "../../commons/Input"
import {loginStore} from './loginStore';
import { NavigationActions } from 'react-navigation';

import { observer } from "mobx-react";

@observer
class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'colorme.vn',
        }
    }
    componentWillMount() {
        loginStore.getDataLogin(this.props.navigation);
        
    }

    signInWithAccount() {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (loginStore.login.email == '' || loginStore.login.password == '') {
            Alert.alert("Có lỗi xảy ra", "Bạn cần nhập đầy đủ thông tin ");
            return ;
        }if (reg.test(loginStore.login.email) == false) {
            Alert.alert("Có lỗi xảy ra", "Địa chỉ email không hợp lệ");
            return ;
        }
            loginStore.loginUser(this.props.navigation);
            loginStore.setDataLogin();
        }

    signIn() {
        AsyncStorage.setItem('url', this.state.url).then(
            () => this.signInWithAccount()
        )
    }

    updateData(name, value) {
        loginStore.login[name] = value;
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <Text style = {{height : 100}}></Text>
                <TextInput
                    value={loginStore.login.email}
                    label={'email'}
                    onChangeText={(email) => this.updateData('email', email)}
                />
               
                <TextInput
                    value={loginStore.login.password}
                    label={'password'}
                    onChangeText={(password) => this.updateData('password', password)}
                />


                <Button
                    style={{ marginTop: 20 }}
                    onPress={() => this.signIn()}
                    full
                >
                    {
                        loginStore.isLoading
                            ?
                            <ActivityIndicator
                                animated={true}
                                color={"#FFF"}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                size='small'
                            />
                            :
                            <Text>{"Đăng nhập"}</Text>

                    }
                </Button>

            </Container>
        )
    }
}
// const styles = StyleSheet.create({
//     textLogoColor: {
//         fontFamily: 'Segoe UI Bold',
//         backgroundColor: 'transparent',
//         color: COLORS.LIGHT_COLOR,
//         fontSize: SIZES.LOGO_COLOR_SIZE,
//     },
//     textLogoMe: {
//         fontFamily: 'Segoe UI Bold',
//         backgroundColor: 'transparent',
//         color: COLORS.LIGHT_COLOR,
//         fontSize: SIZES.LOGO_ME_SIZE,
//         marginTop: -40,
//     },
//     wrapperLogo: {
//         flex: 1,
//         backgroundColor: COLORS.MAIN_COLOR,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     contentForm: {
//         backgroundColor: COLORS.LIGHT_COLOR,
//         width: SIZES.DEVICE_WIDTH_SIZE * 0.8,
//         borderRadius: SIZES.BORDER_RADIUS_CARD_SIZE,
//         elevation: 5,
//         bottom: 20,
//         marginHorizontal: SIZES.DEVICE_WIDTH_SIZE * 0.1,
//         padding: SIZES.PADDING_ELEMENT_IN_CARD,
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//     },
//     input: {
//         width: SIZES.DEVICE_WIDTH_SIZE * 0.7,
//     }
// });






export default LoginContainer
