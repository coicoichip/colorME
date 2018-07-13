import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity, StyleSheet, Platform,
} from 'react-native';
import { STRINGS, COLORS, SIZES, FONTS } from '../../../constants';
import { Container, Item, Input } from 'native-base';

import Icon from "../../../commons/Icon"

import { formatImageLink, dotNumber } from "../../../helper/index"

export default class ListProducts extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { item, navigate } = this.props;
        return (

            item.index != 3 ?
            <TouchableOpacity activeOpacity={0.8} style={[{ borderWidth: 0.2, borderRadius: 10, marginBottom: 15, width: SIZES.DEVICE_WIDTH_SIZE * 2 / 3, marginLeft: 15, backgroundColor: COLORS.LIGHT_COLOR }]}
                onPress={() => navigate("DetailBlog", { id: item.id })}
            >
                <View style={{ overflow: "hidden", borderTopLeftRadius: 10, borderTopRightRadius: 10, }} >
                    <Image source={{ uri: item.thumb_url ? formatImageLink(item.thumb_url) : "" }} style={[styles.imageAvatarModuleEmails]} />
                </View>
                <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                    <View style={{ marginTop: 5,marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            style={{ height: 30, width: 30, borderRadius: 15 }}
                            source={{ uri: item.author ? formatImageLink(item.author.avatar_url) : "" }}
                        />
                        <View>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginLeft: 5 }}>{item.author ? item.author.name.trim() : ""}</Text>
                            <Text numberOfLines={1} style={{ marginTop: 3, marginLeft: 5, fontFamily: 'Roboto-Regular', fontSize: 12, color: 'gray' }}>{item.description ? item.description.trim() : "Không có mô tả "}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity activeOpacity={0.8} style={[{ borderWidth: 0.2, borderRadius: 10, marginBottom: 15, width: SIZES.DEVICE_WIDTH_SIZE * 2 / 3, marginLeft: 15, backgroundColor: COLORS.LIGHT_COLOR }]}
                    onPress={() => navigate("DetailBlog", { id: item.id })}
                >
                    <View style={{  overflow: "hidden", borderRadius: 5 }} >
                        <View style={[styles.imageAvatarModuleEmails, {backgroundColor: 'gray'}]} />
                    </View>
                </TouchableOpacity>

        )
    }
}
const isIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
    wrapperCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperContainer: {
        flex: 1,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 10,
        paddingRight: 20,
    },
    // coppy blog
    imageAvatarModuleEmails: {

        width: SIZES.DEVICE_WIDTH_SIZE * 2 / 3,
        height: SIZES.DEVICE_HEIGHT_SIZE / 4,
    },

    contentCardImageInformation: {
        flex: 2,
        position: 'relative',
        paddingRight: 10,
        paddingTop: 5,
    },
    emailNameModuleEmail: {
        fontSize: 15,
        paddingTop: 10,
    },
    footerCard: {
        height: 25,
        backgroundColor: 'rgb(240, 240, 240)'
    },
})
