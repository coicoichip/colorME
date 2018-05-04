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
import * as loginAction from './loginActions';
import { NavigationActions } from 'react-navigation';
import styles from '../../styles/styles';
import stylesLogin from '../../styles/loginRegisterStyle'

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'colorme.vn',
        }
    }
    componentWillMount() {
        console.log(this.props.login);
        this.props.loginAction.getDataLogin(this.props.status);
    }

    saveData() {
        console.log(this.props.login);
        this.props.loginAction.setDataLogin(this.props.login)
    }

    signInWithAccount() {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (this.props.login.email == '' || this.props.login.password == '') {
            Alert.alert("Có lỗi xảy ra", "Bạn cần nhập đầy đủ thông tin ");
        } else if (reg.test(this.props.login.email) == false) {
            Alert.alert("Có lỗi xảy ra", "Địa chỉ email không hợp lệ")
        } else {
            this.props.loginAction.loginUser(this.props.login);
            this.saveData();
        }
    }

    signIn() {
        AsyncStorage.setItem('url', this.state.url).then(
            () => this.signInWithAccount()
        )
    }

    updateData(name, value) {
        let login = this.props.login;
        login[name] = value;
        this.props.loginAction.updateDataLogin(login);
    }

    // skipLogin() {
    //     this.props.loginAction.skipLogin();
    //     this.props.navigation.navigate('DrawerMain');
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status == 200) {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Drawer' })
                ]
            })
            this.props.navigation.dispatch(resetAction)
        }
    }
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
                                <Text style ={{height: 5}}></Text>
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
                                            value={this.props.login.email}
                                        />
                                    </Item>
                                </View>
                                <Text style={{height: 5}}></Text>
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
                                            value={this.props.login.password}
                                        />
                                    </Item>
                                </View>
                                <Text style={{height: 10}}></Text>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.buttonLogin, styles.shadow]}
                                    onPress={() => {
                                        this.signIn()
                                    }}
                                >
                                    {(this.props.isLoading) ? (
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
                                <Text style={{height: 5}}></Text>
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

function mapStateToProps(state) {
    return {
        login: state.login.login,
        isLoading: state.login.isLoading,
        status: state.login.status,
        error: state.login.error,
        isGetLocalData: state.login.isGetLocalData,
        isAutoLogin: state.login.isAutoLogin,
        save: state.login.save
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginAction: bindActionCreators(loginAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
