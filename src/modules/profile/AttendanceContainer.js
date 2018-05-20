import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView, Text } from "react-native";
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
class AttendanceContainer extends Component {
    constructor() {
        super();
        this.state = {
            arr :[1],
        }
    }
    render() {
        return (
            <View style={styles.wrapperCenter}>
                <Text>
                    Day la trang diem danh
                </Text>
            </View>
        )
    }
}
export default AttendanceContainer
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