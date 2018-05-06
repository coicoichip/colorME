import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View, ActivityIndicator, Alert, StatusBar, TouchableWithoutFeedback, Keyboard, SafeAreaView
} from 'react-native';
import { Container, Button, Text } from 'native-base';
import { STRINGS, COLORS, SIZES } from '../../constants';
import { InputCommon, ButtonCommon } from '../../commons';
import { observer } from 'mobx-react';
import registerStore from './registerStore';
import { observable } from 'mobx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

@observer
export default class RegisterContainer extends Component {
    @observable register = {
        username: '',
        email: '',
        name: '',
        password: '',
    }
    constructor(props) {
        super(props);
    }

    onChangeData = field => value => { this.register[field] = value };

    onRegister = () => {
        const { register } = this;
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (register.name == 0) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMPTY_NAME);
            return;
        }
        if (register.email == 0) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMPTY_EMAIL);
            return;
        } else if (!reg.test(register.email)) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.WRONG_EMAIL);
            return;
        } else {
            register.username = register.email.slice(0, register.email.indexOf("@"));
        }
        if (register.password == 0) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMPTY_PASSWORD);
            return;
        }
        registerStore.register(register);
    }

    render() {
        const { register } = this;
        return (
            <KeyboardAwareScrollView 
                style={{ flex: 1 }}
                enableOnAndroid={true}
                extraHeight={200}
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
                                <Text style={styles.textLogoMe}>ME</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, backgroundColor: COLORS.LIGHT_COLOR }} />

                        {/* form input */}
                        <View style={styles.contentForm}>
                            <InputCommon
                                returnKeyType={'next'}
                                size={styles.input}
                                value={register.name}
                                label={STRINGS.NAME.toUpperCase()}
                                onChangeText={this.onChangeData('name')}
                            />
                            <InputCommon
                                returnKeyType={'next'}
                                size={styles.input}
                                value={register.email}
                                label={STRINGS.EMAIL.toUpperCase()}
                                onChangeText={this.onChangeData('email')}
                            />
                            <InputCommon
                                returnKeyType={'send'}
                                secureTextEntry={true}
                                size={styles.input}
                                value={register.password}
                                label={STRINGS.PASSWORD.toUpperCase()}
                                onChangeText={this.onChangeData('password')}
                            />
                            <View height={30}/>
                        </View>
                        <View style={styles.wrapperButton}>
                            <ButtonCommon
                                isLoading={registerStore.isLoading}
                                onPress={this.onRegister}
                                label={STRINGS.REGISTER_ACCOUNT}
                                style={{ elevation: 6 }}

                            />
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
    fontFamily: 'seguibl',
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
    wrapperButton : {
        ...wrapperCenter,
        width: SIZES.DEVICE_WIDTH_SIZE,
        position: 'absolute',
        bottom: 60,
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
        bottom: 80,
        marginHorizontal: SIZES.DEVICE_WIDTH_SIZE * 0.1,
        padding: SIZES.PADDING_ELEMENT_IN_CARD,
        position: 'absolute',
    },
    input: {
        width: SIZES.DEVICE_WIDTH_SIZE * 0.7,
        marginBottom: 10,
    }

});