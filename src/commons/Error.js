import React, { Component } from 'react';
import {
    View, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import { Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

export default class Error extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.props.onPress()
                }}
                activeOpacity={0.9} style={[styles.wrapperCenter, this.props.style]}>
                <Icon name="wifi-off" size={60} color={'gray'} />
                <Text style={styles.textError}>Có lỗi xảy ra! Ấn để thử lại</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapperCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    textError: {
        marginTop: 20,
        color: 'gray',
        fontSize: 14,
        textAlign: 'center'
    }
})
