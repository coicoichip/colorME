import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView, Text } from "react-native";
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
class ProgressContainer extends Component {
    render() {
        return (
            <View style={styles.wrapperCenter}>
                <Text>
                    Day la trang tiến độ
                </Text>
            </View>
        )
    }
}
export default ProgressContainer
const wrapperCenter = {
    justifyContent: 'center',
    alignItems: 'center',
}
const text = {
    fontFamily: 'Roboto-Regular',
    backgroundColor: 'transparent',
    color: COLORS.DARK_COLOR,
    fontSize: SIZES.TEXT_BUTTON_SIZE,
}
const styles = StyleSheet.create({
    wrapperCenter: {
        ...wrapperCenter
    }
})