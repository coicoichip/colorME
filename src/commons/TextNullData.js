
import React, { Component } from 'react';
import {
    View, Text
} from 'react-native';
import { SIZES } from '../constants';

export default class TextNullData extends Component {
    render() {
        return (
            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: SIZES.TITLE_SIZE}}>{this.props.text}</Text>
            </View >
        );
    }
}

