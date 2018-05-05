import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Container, Button } from 'native-base';
import { STRINGS } from '../../constants';
import {InputCommon} from '../../commons';

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
        console.log('onChangeData', this.state);
    };

    render() {
        const { register } = this.state;
        return (
            <Container style={styles.container}>
                <InputCommon
                    value={register.username}
                    label={STRINGS.Username}
                    onChangeText={this.onChangeData('username')} />
                <InputCommon
                    value={register.name}
                    label={STRINGS.Name}
                    onChangeText={this.onChangeData('name')} />
                <InputCommon
                    value={register.email}
                    label={STRINGS.Email}
                    onChangeText={this.onChangeData('email')} />
                <InputCommon
                    value={register.password}
                    label={STRINGS.Password}
                    onChangeText={this.onChangeData('password')} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});