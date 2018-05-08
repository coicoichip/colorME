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
export default class Hometest extends Component {
    @observable register = {
        username: '',
        email: '',
        name: '',
        password: '',
    }
    constructor(props) {
        super(props);
    }

    render() {
        const { register } = this;
        return (
            <Container>
            </Container>
        );
    }
}

const wrapperCenter = {
    justifyContent: 'center',
    alignItems: 'center',
}


const styles = StyleSheet.create({
   

});