import React, { Component } from 'react';
import {
    TouchableOpacity, View, Text
} from 'react-native';
import Icon from './Icon';
import styles from '../styles/styles';

class ValueDown extends Component {
    render() {
        return (
            <View style={[styles.wrapperRowCenterVertical, this.props.style, {marginLeft: -5}]}>
                <Icon name={"Entypo|triangle-down"} size={20} color={"red"} style={{marginBottom: 0}} />
                <Text style={[styles.textDescriptionGray, { color: "red" }]}>{this.props.value} %</Text>
            </View>
        );
    }
}

export default ValueDown;