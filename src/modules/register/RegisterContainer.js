import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View, ActivityIndicator, Alert, StatusBar
} from 'react-native';
import { Container, Button, Text } from 'native-base';
import { STRINGS, COLORS, SIZES } from '../../constants';
import { InputCommon, ButtonCommon } from '../../commons';
import { observer } from 'mobx-react';
import registerStore from './registerStore';
import { observable } from 'mobx';

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

        if (register.username == 0) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMPTY_USERNAME);
            return;
        }
        if (register.name == 0) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMPTY_NAME);
            return;
        }
        if (register.email == 0) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMPTY_EMAIL);
            return;
        }
        if (!reg.test(register.email)) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.WRONG_EMAIL);
            return;
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

                <View style={{ flex: 1 }} />

                {/* form input */}
                <View style={styles.contentForm}>
                    <InputCommon
                        style={styles.input}
                        value={register.username}
                        label={STRINGS.USERNAME}
                        onChangeText={this.onChangeData('username')}
                    />
                    <InputCommon
                        style={styles.input}
                        value={register.name}
                        label={STRINGS.NAME}
                        onChangeText={this.onChangeData('name')}
                    />
                    <InputCommon
                        style={styles.input}
                        value={register.email}
                        label={STRINGS.EMAIL}
                        onChangeText={this.onChangeData('email')}
                    />
                    <InputCommon
                        secureTextEntry={true}
                        style={styles.input}
                        value={register.password}
                        label={STRINGS.PASSWORD}
                        onChangeText={this.onChangeData('password')}
                    />
                    <ButtonCommon isLoading={registerStore.isLoading} onPress={this.onRegister} label={STRINGS.REGISTER_ACCOUNT}/>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textLogoColor: {
        fontFamily: 'Segoe UI Bold',
        backgroundColor: 'transparent',
        color: COLORS.LIGHT_COLOR,
        fontSize: SIZES.LOGO_COLOR_SIZE,
    },
    textLogoMe: {
        fontFamily: 'Segoe UI Bold',
        backgroundColor: 'transparent',
        color: COLORS.LIGHT_COLOR,
        fontSize: SIZES.LOGO_ME_SIZE,
        marginTop: -40,
    },
    wrapperLogo: {
        flex: 1,
        backgroundColor: COLORS.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentForm: {
        backgroundColor: COLORS.LIGHT_COLOR,
        width: SIZES.DEVICE_WIDTH_SIZE * 0.8,
        borderRadius: SIZES.BORDER_RADIUS_CARD_SIZE,
        elevation: 5,
        bottom: 20,
        marginHorizontal: SIZES.DEVICE_WIDTH_SIZE * 0.1,
        padding: SIZES.PADDING_ELEMENT_IN_CARD,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    input: {
        width: SIZES.DEVICE_WIDTH_SIZE * 0.7,
    }

});