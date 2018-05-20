import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView, Text, FlatList } from "react-native";
import { STRINGS, COLORS, SIZES, FONTS } from '../../../constants';
import { formatImageLink } from "../../../helper/index";

class ListAttendence extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    renderItem(item) {
        
        if (item.status == -1) return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.circleGray}>
                </View>
            </View>
        )
        if (item.status == 0) return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.circleRed}>
                </View>
            </View>
        )
        if (item.status == 1) return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.circleGreen}>
                </View>
            </View>
        )
    }
    render() {
        console.log(this.props.index)
        const { item } = this.props;
        return (
            <View>
                <View style={[styles.paddingLeftRight, { padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgb(242,242,242)' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: formatImageLink(item.icon_url) }} style={styles.imageIcon} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.emailNameModuleEmail}>{item.name.trim()}</Text>
                        </View>


                    </View>
                    <View style={{ marginLeft: 40, marginTop: 7 }}>
                        <FlatList
                            // keyExtractor={item => item.id + ''}
                            showsVerticalScrollIndicator={false}
                            horizontal={true}
                            data={item.attendances}
                            renderItem={({ item }) =>
                                <View style={{ flexDirection: 'row' }}>
                                    {this.renderItem(item)}
                                </View>
                            }

                        />
                        
                    </View>
                    <View style={{marginLeft: 40, marginTop: 10}}><Text style={styles.textName}>{this.props.how_know}</Text></View>
                </View>
            </View>
        )
    }
}
export default ListAttendence
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
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    imageIcon: {
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    emailNameModuleEmail: {
        fontSize: 18,
    },
    circleGreen: {
        marginRight: 15,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.GREEN_COLOR,
    },
    circleRed: {
        marginRight: 15,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.MAIN_COLOR,
    },
    circleGray: {
        marginRight: 15,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.GRAY_COLOR,
    }, textName: {
        color: 'rgb(182,182,182)',
        fontSize: 13
    }
})