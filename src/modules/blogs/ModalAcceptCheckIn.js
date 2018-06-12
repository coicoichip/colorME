import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SIZES, COLORS, STRINGS, FONTS } from '../../constants';
import { NetworkInfo } from 'react-native-network-info';
import { observer } from "mobx-react";
import blogStore from './blogStore';
import IconDefault from '../../commons/IconDefault';

import getProfileStore from "../profile/profileStore";
import { ButtonCommon } from '../../commons';

@observer
export default class ModalAcceptCheckIn extends Component {
    constructor(){
    super();
    this.state = {mac_id : ""}
    }
    componentWillMount() {
        getProfileStore.getProfile();
    }
    componentDidMount() {
        NetworkInfo.getBSSID(bssid => {
            if (bssid && bssid != 'error' && bssid.indexOf("bssid") == -1) {
                this.state.mac_id = bssid
                console.log(bssid)
            } else {

            }
        });
    }

    attendance = () => {
        
        const { mac_id } = this.state;
        console.log(mac_id)
        blogStore.attendance(
            blogStore.attendanceData.id,
            blogStore.attendanceData.lesson[0].class_lesson_id,
            // (Array.isArray(blogStore.attendanceData) && blogStore.attendanceData.length > 0) ? blogStore.attendanceData.length - 1 : null,
            mac_id,
            
        )
    }

    render() {
        return (
            blogStore.check == 0 ?
                <View style={[{
                    height: SIZES.DEVICE_HEIGHT_SIZE * 0.8,
                    width: SIZES.DEVICE_WIDTH_SIZE * 0.9,
                    backgroundColor: COLORS.LIGHT_COLOR,
                    borderRadius: 20,
                    justifyContent: 'center',
                }, styles.paddingLeftRight]}>
                    <View style={{ flex: 1 }}>
                        <View style={[styles.wrapperCenter, { flexDirection: 'row', marginTop: 30 }]}>
                            <View>
                                <IconDefault
                                    name={'MaterialIcons|cancel'}
                                    size={80}
                                    color={COLORS.MAIN_COLOR}
                                />
                            </View>

                        </View>
                        <Text style={[styles.textDescriptionDark, { fontWeight: 'bold', marginTop: 30, fontSize: 20 }]}>Điểm danh thất bại</Text>
                        <Text style={[styles.textDescriptionDark, { marginTop: 20 }]}>Bạn không vào Wifi của colorcolorME, xin vui lòng kiểm tra lại kết nối</Text>
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
                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <Text style={[styles.textDescriptionDark, { fontWeight: 'bold' }]}>Wifi : </Text>
                            {/* <Text style={[styles.textDescriptionDark]}>COLORME</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <Text style={[styles.textDescriptionDark, { fontWeight: 'bold' }]}>MAC : </Text>
                            {/* <Text style={[styles.textDescriptionDark]}>12cfacfa4a</Text> */}
                        </View>

                    </View>
                    <View style={styles.wrapperButton}>
                        <ButtonCommon
                            isLoading={blogStore.isLoadingAttendent}
                            onPress={this.attendance}
                            label={'THỬ LẠI'}
                            text={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: SIZES.SUBTITLE_SIZE
                            }}
                        />
                    </View>
                </View>
                :
                <View style={[{
                    height: SIZES.DEVICE_HEIGHT_SIZE * 0.8,
                    width: SIZES.DEVICE_WIDTH_SIZE * 0.9,
                    backgroundColor: COLORS.LIGHT_COLOR,
                    borderRadius: 20,
                    justifyContent: 'center',
                }, styles.paddingLeftRight]}>
                    <View style={{ flex: 1 }}>
                        <View style={[styles.wrapperCenter, { flexDirection: 'row', marginTop: 30 }]}>
                            <View>
                                <IconDefault
                                    name={'MaterialIcons|check-circle'}
                                    size={80}
                                    color={COLORS.GREEN}
                                />
                            </View>

                        </View>
                        <Text style={[styles.textDescriptionDark, { fontWeight: 'bold', marginTop: 30, fontSize: 20 }]}>Điểm danh thành công</Text>
                        <Text style={[styles.textDescriptionDark, { marginTop: 20 }]}>chào {getProfileStore.updateUser.name}, ban đã điểm danh thành công.</Text>
                        <Text style={[styles.textDescriptionDark, { marginTop: 3 }]}>Chúc bạn có một buổi học vui vẻ.</Text>
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
                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <Text style={[styles.textDescriptionDark, { fontWeight: 'bold' }]}>Wifi : </Text>
                            <Text style={[styles.textDescriptionDark]}>COLORME</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <Text style={[styles.textDescriptionDark, { fontWeight: 'bold' }]}>MAC : </Text>
                            <Text style={[styles.textDescriptionDark]}>12cfacfa4a</Text>
                        </View>

                    </View>
                    <View style={styles.wrapperButton}>
                        <ButtonCommon
                            isLoading={false}
                            onPress={()=> {blogStore.modalVisible1 = false}}
                            label={'XONG'}
                            text={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: SIZES.SUBTITLE_SIZE
                            }}
                        />
                    </View>
                </View>
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
        backgroundColor: '#fff',
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

