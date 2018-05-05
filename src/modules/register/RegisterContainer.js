import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View, ActivityIndicator
} from 'react-native';
import { Container, Button, Text } from 'native-base';
import { STRINGS } from '../../constants';
import { InputCommon } from '../../commons';
import { observer } from 'mobx-react';
import { store } from './registerStore';

@observer
export default class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: {
                username: '',
                email: '',
                name: '',
                password: '',
            },
        }
    }

    onChangeData = field => value => {
        this.state.register[field] = value;
        console.log('Register Data: ', this.state);
    };

    onRegister = () => {
        const { register } = this.state;
        store.register(register);
    }

    render() {
        const { register } = this.state;
        return (
            <Container>
                <InputCommon
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
                        store.isLoading
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