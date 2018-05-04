import React, { Component } from 'react';
import {
    View, StyleSheet, Text
} from 'react-native';
import { Spinner } from 'native-base';
import {MAIN_COLOR_OPACITY, MAIN_COLOR} from '../styles/colors';
import PercentageCircle from 'react-native-percentage-circle';

export default class PercentageCircleCustom extends Component {
    render() {
        return (
            <PercentageCircle
                radius={this.props.size ? this.props.size : 20}
                percent={this.props.value ? this.props.value : 0}
                innerColor={'#FFF'}
                bgcolor={MAIN_COLOR_OPACITY}
                color={MAIN_COLOR}
                borderWidth={5}
                children={<Text/>}
            />
        );
    }
}
