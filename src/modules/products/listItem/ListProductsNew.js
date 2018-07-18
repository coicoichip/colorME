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
import {productsStore} from "../productsStore";
import { formatImageLink, dotNumber } from "../../../helper/index"

export default class ListProductsNew extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { item, navigate } = this.props;
        return (

            item.index != 3 ?
                <TouchableOpacity activeOpacity={0.8} style={[{ borderColor: "rgb(240, 240, 240)", borderWidth: 1, borderRadius: 10, marginBottom: 15, width: SIZES.DEVICE_WIDTH_SIZE * 1 / 3, marginLeft: 15, backgroundColor: COLORS.LIGHT_COLOR }]}
                    onPress={() => navigate("DetailBlog", { id: item.id })}
                >
                    <View style={{ overflow: "hidden", borderRadius: 5 }}>
                        <Image source={{ uri: item.thumb_url ? formatImageLink(item.thumb_url) : "" }} style={[styles.imageAvatarModuleEmails]} />
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={0.8} style={[{ borderColor: "rgb(240, 240, 240)", borderWidth: 1, borderRadius: 10, marginBottom: 15, width: SIZES.DEVICE_WIDTH_SIZE * 1 / 3, marginHorizontal: 15, backgroundColor: COLORS.LIGHT_COLOR }]}
                    onPress={() => {productsStore.products =[] ; navigate("DetailProducts", { filter: this.props.filter })}}
                >
                    <View style={{ overflow: "hidden", borderRadius: 5 }} >
                        <View style={[styles.imageAvatarModuleEmails, { backgroundColor: COLORS.GRAY_COLOR_CARD, alignItems: 'center', justifyContent: 'center' }]}>
                            <Text style={[{ fontSize: 70, color: '#fff' }, styles.wrapperCenter]}>+
                            </Text>
                        </View>
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
        paddingLeft: 20,
        paddingRight: 20,
    },
    // coppy blog
    imageAvatarModuleEmails: {

        width: SIZES.DEVICE_WIDTH_SIZE * 1 / 3,
        height: SIZES.DEVICE_HEIGHT_SIZE / 6,
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
