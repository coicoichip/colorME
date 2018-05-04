
import React, { Component } from 'react';
import {
    View, Text
} from 'react-native';
import styles from '../styles/styles';

export default class TextNullData extends Component {
    render() {
        return (
            <View style={[styles.wrapperCenter, { marginTop: 20 }]}>
                <Text style={styles.textDescriptionDark}>{this.props.text}</Text>
            </View>
        );
    }
}

