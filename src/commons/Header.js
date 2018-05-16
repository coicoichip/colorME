import React, { Component } from 'react';
import {
    StyleSheet, View, Text, Platform
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import HamburgerButton from './HamburgerButton';

export default class Header extends Component {
    render() {
        const { title, navigate } = this.props;
        return (
            <View style={styles.wrapperHeader}>
                <Text style={styles.textHeaderScreen} numberOfLines={1} onPress= {() => this.props.onPress()}>{title}</Text>
                <HamburgerButton navigate={navigate} />
            </View>
        );
    }
}

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
    wrapperHeader: {
        height: isIOS ? 80 : 60,
        paddingTop: isIOS ? 20 : 0,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.LIGHT_COLOR,
        zIndex: 100
    },
    textHeaderScreen: {
        color: COLORS.TITLE_HEADER_COLOR,
        fontFamily: FONTS.MAIN_FONT_BOLD,
        fontSize: SIZES.TITLE_HEADER_SIZE,
    },
})

