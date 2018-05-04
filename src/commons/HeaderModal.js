import React, { Component } from 'react';
import {
    TouchableOpacity, StyleSheet, View, Text, Image
} from 'react-native';
import styles from '../styles/styles';
import * as size from '../styles/sizes';
import CloseButton from './CloseButton';

export default class HeaderModal extends Component {
    render() {
        return (
            <View style={[styles.wrapperHeader, styles.paddingLeftRight, {zIndex: 10000}]}>
                <View style={[styles.wrapperRowCenterVertical, {width: size.deviceWidth - 100}]}>
                    {
                        this.props.avatar
                            ?
                            <Image
                                style={[styles.avatarSubjectImage, {marginRight: 5}]}
                                source={{ uri: this.props.avatar }}
                            />
                            :
                            null
                    }
                    <Text style={styles.textHeaderScreen} numberOfLines={1}>{this.props.title}</Text>
                </View>

                <CloseButton goBack={this.props.goBack} />
            </View>
        );
    }
}
