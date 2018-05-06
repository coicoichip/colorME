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
    TextInput
} from 'react-native';

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
                <Text style = {{height : 100}}/>
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



export default LoginContainer
