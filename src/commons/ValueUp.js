import React, { Component } from 'react';
import {
    TouchableOpacity, View, Text
} from 'react-native';
import Icon from './Icon';
import styles from '../styles/styles';
import {GREEN_COLOR} from '../styles/colors';

class ValueUp extends Component {
    render() {
        return (
            <View style={[styles.wrapperRowCenterVertical, this.props.style, {marginLeft: -5}]}>
                <Icon name={"Entypo|triangle-up"} size={20} color={GREEN_COLOR} style={{marginBottom: -2}} />
                <Text style={[styles.textDescriptionGray, { color: GREEN_COLOR }]}>{this.props.value} %</Text>
            </View>
        );
    }
}

export default ValueUp;