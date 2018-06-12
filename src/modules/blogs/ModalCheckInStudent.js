import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { SIZES, COLORS, STRINGS, FONTS } from '../../constants';
import { NetworkInfo } from 'react-native-network-info';
import { observer } from "mobx-react";
import blogStore from './blogStore';
import IconDefault from '../../commons/IconDefault';

import getProfileStore  from "../profile/profileStore";
import { ButtonCommon } from '../../commons';
import {formatImageLink} from "../../helper/index"
@observer
export default class ModalCheckInStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mac_id: ''
        }
    }
    componentWillMount() {
        getProfileStore.getProfile();
    }
    componentDidMount() {
        // console.log(blogStore.attendanceData)
        NetworkInfo.getBSSID(bssid => {
            if (bssid && bssid != 'error' && bssid.indexOf("bssid") == -1) {
                this.state.mac_id = bssid
                
            } else {

            }
        });
    }

    attendance = () => {
        const { mac_id } = this.state;
        blogStore.attendance(
            blogStore.attendanceData.id,
            blogStore.attendanceData.lesson[0].class_lesson_id,
            // (Array.isArray(blogStore.attendanceData) && blogStore.attendanceData.length > 0) ? blogStore.attendanceData.length - 1 : null,
            mac_id,
        )
        if (blogStore.isLoadingAttendent == false) {
            blogStore.modalVisible1 = true;
            blogStore.modalVisible = false;
        }
    }

    render() {
        return (
            blogStore.attendanceData.id ?
                <View style={[{
                    height: SIZES.DEVICE_HEIGHT_SIZE * 0.8,
                    width: SIZES.DEVICE_WIDTH_SIZE * 0.9,
                    backgroundColor: COLORS.LIGHT_COLOR,
                    borderRadius: 20,
                    justifyContent: 'center',
                }, styles.paddingLeftRight]}>
                    <View style={{ flex: 1 }}>
                        <View style={[styles.wrapperCenter, { flexDirection: 'row', marginTop: 30 }]}>

                            <Image
                                style={[styles.avatarUserNormals, { marginRight: -15}]}
                                source={{ uri: blogStore.attendanceData.avatar_url }} />
                            <Image
                                style={[styles.avatarUserNormals]}
                                source={getProfileStore.updateUser.avatar_url ? { uri: formatImageLink(getProfileStore.updateUser.avatar_url) } : require('../../../assets/image/colorMe.jpg')} />

                        </View>
                        <Text style={[styles.textDescriptionDark, { fontWeight: 'bold', marginTop: 40, fontSize: 20 }]}>Điểm danh</Text>
                        <Text style={[styles.textDescriptionDark, { marginTop: 20 }]}>Chào {getProfileStore.updateUser.name} , hiện tại bạn đang học buổi {blogStore.attendanceData.lesson[0].order} của lớp {blogStore.attendanceData.name}, bạn muốn thực hiện việc điểm danh không?</Text>
                    </View>
                    <View style={{ flex: 1, borderTopColor: 'gray', borderTopWidth: 1 }}>
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={[styles.textDescriptionDark, { fontFamily: FONTS.MAIN_FONT_BOLD }]}>Họ và tên : </Text>
                            <Text style={[styles.textDescriptionDark]}>{getProfileStore.updateUser.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <Text style={[styles.textDescriptionDark, { fontWeight: 'bold' }]}>Lớp : </Text>
                            <Text style={[styles.textDescriptionDark]}>{blogStore.attendanceData.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <Text style={[styles.textDescriptionDark, { fontWeight: 'bold' }]}>Buổi : </Text>
                            <Text style={[styles.textDescriptionDark]}>{blogStore.attendanceData.lesson[0].order}</Text>
                        </View>

                    </View>
                    <View style={styles.wrapperButton}>
                        <ButtonCommon
                            isLoading={blogStore.isLoadingAttendent}
                            onPress={this.attendance}
                            label={'ĐIỂM DANH'}
                            text={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: SIZES.SUBTITLE_SIZE
                            }}
                        />
                    </View>
                </View>
                : null
        );
    }
}
const wrapperCenter = {
    justifyContent: 'center',
    alignItems: 'center',
}
const styles = StyleSheet.create({
    wrapperCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarUserNormals: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Platform.OS == "ios" ? '#fff' : null,
    },
    wrapperModalComment: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paddingLeftRight: {
        paddingLeft: 25,
        paddingRight: 25,
    },
    textDescriptionDark: {
        color: '#000',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,

    },
    wrapperButton: {
        ...wrapperCenter,
        width: SIZES.DEVICE_WIDTH_SIZE * 0.9,
        position: 'absolute',
        bottom: 30,
        paddingHorizontal: 60,
    },
})

