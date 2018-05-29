import React, { Component } from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import { coursesStore } from './coursesStore';
import { observer } from "mobx-react";
import _ from "lodash"
import * as size from '../../styles/sizes';
import * as color from '../../styles/colors';
import store from "../base/baseStore";

@observer
export default class ListRegisterCourses extends Component {
    constructor() {
        super()
    }
    render() {
        const { item, buttonRegister } = this.props;
        return (
            <View style={{ marginTop: 20 }}>
                <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 15, marginRight: 20, justifyContent: 'center' }}>
                    <View style={[{ flexDirection: 'row', alignItems: 'center'}, styles.paddingLeftRight]}>
                        <Image
                            style={[styles.avatarUserNormal, styles.marginRightFar ]}
                            source={{ uri: item.icon_url }} />
                            <Text style={[styles.emailNameModuleEmail, {marginRight: 20}]}>Lớp {item.name}</Text>
                    </View>
                    <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                        <Text style={{ height: 7 }}></Text>
                        <Text style={styles.textDescriptionDark}>{item.study_time}</Text>
                        <Text style={{ height: 3 }}></Text>
                        <Text numberOfLines={2} style={styles.textDescriptionDark}>{item.base.address}</Text>
                        <Text style={{ height: 3 }}></Text>
                        <Text style={styles.textDescriptionDark}>Khai giảng ngày : {item.date_start}</Text>
                        <Text style={{ height: 15 }}></Text>
                        {this.props.buttonRegister(item, item.status)}
                    </View>
                </TouchableOpacity>
                <View style={styles.footerCard}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContainer: {
        flex: 1,
        backgroundColor: color.BACKGROUND_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    avatarUserNormal: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    marginRightFar: {
        marginRight: 10,
    },
    emailNameModuleEmail: {
        fontSize: 20,
    },
    contentCardImageInformation: {
        paddingRight: 10,
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    textDescriptionDark: {
        color: '#000',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,

    },
    footerCard: {
        height: 25,
        backgroundColor: 'rgb(240, 240, 240)'
    },
});

