import React, { Component } from 'react'
import {
    ActivityIndicator,
    Alert, AsyncStorage,
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity, Keyboard,
    View, TouchableWithoutFeedback
} from 'react-native';
import * as size from '../../styles/sizes';
import { CheckBox, Container, Content, Form, Header, Input, Item, Label } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import TextNullData from '../../commons/TextNullData'
import * as color from '../../styles/colors';
import { WELCOME_TITLE, PR_TITLE } from '../../constants/text';
import {loginStore} from './loginStore';
import { NavigationActions } from 'react-navigation';
import styles from '../../styles/styles';
import stylesLogin from '../../styles/loginRegisterStyle'
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
        } else if (reg.test(loginStore.login.email) == false) {
            Alert.alert("Có lỗi xảy ra", "Địa chỉ email không hợp lệ")
        } else {
            loginStore.loginUser(this.props.navigation);
            loginStore.setDataLogin()
        }
    }

    signIn() {
        AsyncStorage.setItem('url', this.state.url).then(
            () => this.signInWithAccount()
        )
    }

    updateData(name, value) {
        loginStore.login[name] = value;
      
    }

    // skipLogin() {
    //     this.props.loginAction.skipLogin();
    //     this.props.navigation.navigate('DrawerMain');
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.status == 200) {
    //         const resetAction = NavigationActions.reset({
    //             index: 0,
    //             actions: [
    //                 NavigationActions.navigate({ routeName: 'Drawer' })
    //             ]
    //         })
    //         this.props.navigation.dispatch(resetAction)
    //     }
    // }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View
                style={styles.wrapperContainer}
            >
                <TouchableWithoutFeedback style={styles.wrapperContainer} onPress={Keyboard.dismiss}>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <View style={stylesLogin.wrapperColorME}>
                            <Text style={stylesLogin.textCOLOR}>color</Text>
                            <Text style={stylesLogin.textME}>ME</Text>
                        </View>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "position" : ""}
                            style={styles.wrapperLogin}>
                            <View style={[styles.wrapperFormLogin, styles.shadow]}>
                                <Text style={[styles.textDescriptionDarkBold, { textAlign: 'center' }]}>{WELCOME_TITLE}</Text>

                                <View style={[styles.wrapperInput, { marginTop: 20 }]}>
                                    <Text style={[styles.textDescriptionGray, { marginLeft: 30 }]}>Email</Text>
                                    <Item style={styles.itemInputInBox}>
                                        <Input
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                            style={[styles.inputTheme02]}
                                            keyboardType={'email-address'}
                                            autoCapitalize={'none'}
                                            returnKeyType={'next'}
                                            autoCorrect={false}
                                            onChangeText={(email) => {
                                                this.updateData('email', email);
                                            }}
                                            value={loginStore.login.email}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.wrapperInput, { marginTop: 20 }]}>
                                    <Text style={[styles.textDescriptionGray, { marginLeft: 30 }]}>Password</Text>
                                    <Item style={styles.itemInputInBox}>
                                        <Input
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                            style={styles.inputTheme02}
                                            returnKeyType={'go'}
                                            secureTextEntry={true}
                                            onSubmitEditing={() => {
                                                this.signIn()
                                            }}
                                            autoCorrect={false}
                                            onChangeText={(password) => {
                                                this.updateData('password', password);
                                            }}
                                            value={loginStore.login.password}
                                        />
                                    </Item>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.buttonLogin, styles.shadow]}
                                    onPress={() => {
                                        this.signIn()
                                    }}
                                >
                                    {(loginStore.isLoading) ? (
                                        <ActivityIndicator
                                            animated={true}
                                            color={"#FFF"}
                                            size='small'
                                        />
                                    ) : (
                                            <Text style={styles.textDescriptionLightBold}>ĐĂNG NHẬP</Text>
                                        )
                                    }
                                </TouchableOpacity>
                                <View style={[styles.wrapperRowCenterHorizontal, { marginTop: 20 }]}>
                                    <Text style={styles.textDescriptionGray}>Bạn chưa có tài khoản? </Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                                        <Text style={[styles.textDescriptionGray, { color: 'black' }]}>Đăng kí tại đây </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        )
    }
}



export default LoginContainer
