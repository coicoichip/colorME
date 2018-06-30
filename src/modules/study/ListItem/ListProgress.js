import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity, StyleSheet,
    Alert
} from 'react-native';
import { STRINGS, COLORS, SIZES, FONTS } from '../../../constants';

import { formatImageLink, dotNumber } from "../../../helper/index";

class ListProgress extends Component {
    constructor(props) {
        super(props)
    }
   
    renderStatus = (status) => {
        let text = { status: "", button: "", backgroundColor: "" }
        switch (status) {
            case 0:
                text.status = "";
                text.button = "Chưa hoàn thành học phí";
                return text;
                break;
            case 1:
                text.status = "Đã hoàn thành học phí";
                text.button = "Bảo lưu";
                return text;
                break;

            case 2:
                text.status = "Đã hoàn thành học phí - Danh sách chờ";
                text.button = "Chọn lớp";
                return text;
                break;
            case 3:
                text.status = "Đang bảo lưu";
                text.button = "Học lại";
                return text;
                break;

            case 4:
                text.status = "Đang học lại";
                text.button = "Đang học lại";
                return text;
                break;

            case 5:
                text.status = "Đã hoàn thành khoá học";
                text.button = "Đã hoàn thành khóa học";
                return text;
                break;
            default:
                return text;
        }
    }
    renderViewStatus = (status) => {
        switch(status){
            case 0:
            return (
                <View style={{ alignItems: 'flex-start' }}>
                <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', height: 25,borderRadius : 10, backgroundColor: COLORS.GREEN }}>
                    <Text style={{
                        fontFamily: 'Roboto-Bold',
                        fontSize: SIZES.SUBTITLE_SIZE,
                        color: "#FFF",
                        paddingLeft: 10,
                        paddingRight: 10
                    }} >{this.renderStatus(0).button}</Text>
    
                </View>
            </View>
            )
            break;
            case 1:
            return(<TouchableOpacity activeOpacity = {0.8} style={{ alignItems: 'flex-start' }} onPress = {() => this.props.reserveStudy(this.props.item.class_id)}>
            <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', height: 25,borderRadius : 10, backgroundColor: COLORS.GREEN }}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: SIZES.SUBTITLE_SIZE,
                    color: "#FFF",
                    paddingLeft: 10,
                    paddingRight: 10
                }} >{this.renderStatus(1).button}</Text>

            </View>
        </TouchableOpacity>)
                break;
            default:
            return null;

        }
    }
    render() {
        const { item , index} = this.props;
        const duration_studied = item.attendances.filter(e => e.status == 1);
        return (
            <View>
                <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 15 }}
                    onPress={() => { }}>
                    <View>
                        <Image source={{ uri: formatImageLink(item.image_url) }} style={styles.imageAvatarModuleEmails} />
                        <View style={{ height: 8, backgroundColor: "rgb(240, 240, 240)" }}>
                            <View style={{ height: 8, backgroundColor: COLORS.GREEN, width: SIZES.DEVICE_WIDTH_SIZE * duration_studied.length / item.attendances.length }}></View>
                        </View>
                    </View>
                    <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                        <Text numberOfLines={1} style={styles.emailNameModuleEmail}>{item.name.trim()}</Text>
                        {/* <Text style={styles.textDescriptionDark}>{duration_studied.length + "/" + item.attendances.length} buổi</Text> */}
                        <View style={{ marginTop: 5 }}>
                            <Text numberOfLines={2} style={styles.textDescriptionDark}>{this.renderStatus(this.props.status).status}</Text>
                        </View>
                        {this.renderViewStatus(this.props.status)}


                    </View>
                </TouchableOpacity>
                <View style={styles.footerCard}>
                </View>
            </View>
        )
    }

}
export default ListProgress
const wrapperCenter = {
    alignItems: 'center',
    justifyContent: 'center',
};
const buttonTab = {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 13,
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
    fontFamily: FONTS.FONT_MAIN,
    color: "#FFF",
};

const styles = StyleSheet.create({
    imageAvatarModuleEmails: {
        width: SIZES.DEVICE_WIDTH_SIZE,
        height: SIZES.DEVICE_HEIGHT_SIZE / 3.3,
    },
    categoryInImages: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgb(0, 241, 53)',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 13,
        overflow: "hidden"
    },
    textDescriptionLightBold: {
        color: '#FFF',
        fontFamily: FONTS.FONT_MAIN_BOLD,
        fontSize: 14,
    },
    contentCardImageInformation: {
        flex: 2,
        position: 'relative',
        paddingRight: 10,
        paddingTop: 5,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    emailNameModuleEmail: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 5,
    },
    textDescriptionDark: {
        fontFamily: FONTS.MAIN_FONT,
        color: '#000',
        fontSize: SIZES.DESCRIPTION_SIZE,

    },
    footerCard: {
        height: 25,
        backgroundColor: 'rgb(240, 240, 240)'
    },
});