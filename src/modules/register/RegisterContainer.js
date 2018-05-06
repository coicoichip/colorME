import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View, ActivityIndicator, Alert
} from 'react-native';
import { Container, Button, Text } from 'native-base';
import { STRINGS } from '../../constants';
import { InputCommon } from '../../commons';
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

    onChangeData = field => value => { this.register[field] = value; console.log(this) };

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
        if (reg.test(register.email)) {
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
                <InputCommon
                    keyboar
                    value={register.username}
                    label={STRINGS.USERNAME}
                    onChangeText={this.onChangeData('username')}
                />
                <InputCommon
                    value={register.name}
                    label={STRINGS.NAME}
                    onChangeText={this.onChangeData('name')}
                />
                <InputCommon
                    value={register.email}
                    label={STRINGS.EMAIL}
                    onChangeText={this.onChangeData('email')}
                />
                <InputCommon
                    value={register.password}
                    label={STRINGS.PASSWORD}
                    onChangeText={this.onChangeData('password')}
                />
                <Button
                    style={{ marginTop: 20 }}
                    onPress={this.onRegister}
                    full
                >
                    {
                        registerStore.isLoading
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
                            <Text>{STRINGS.REGISTER}</Text>

                    }
                </Button>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});