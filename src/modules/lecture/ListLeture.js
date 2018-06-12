import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity, StyleSheet
} from 'react-native';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import * as color from '../../styles/colors';
import * as size from '../../styles/sizes';
import { Container, Item, Input } from 'native-base';
import Header from '../../commons/Header';
import Icon from "../../commons/Icon"
import IconDefault from "../../commons/IconDefault"
import { formatImageLink, dotNumber } from "../../helper/index"
class ListLeture extends Component {
    constructor() {
        super()
    }
    render() {
        const { item } = this.props;
        const { navigate } = this.props;
        return (
            <View>
                <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 15 }}
                    onPress={
                        () => this.props.navigation.navigate('DetailLecture', { lessons: item.lessons })}
                >
                    <View >
                        <Image source={{ uri: formatImageLink(item.image_url) }} style={styles.imageAvatarModuleEmails} />

                    </View>
                    <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                        <Text numberOfLines={1} style={styles.emailNameModuleEmail}>{item.name.trim()}</Text>
                        <Text style={styles.textDescriptionDark}>{item.duration} buổi</Text>

                    </View>
                </TouchableOpacity>
                <View style={styles.footerCard}>
                </View>
            </View>
        )
    }
}
export default ListLeture

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
    color: color.BACKGROUND_COLOR,
};

const styles = StyleSheet.create({
    imageAvatarModuleEmails: {
        width: size.deviceWidth,
        height: size.deviceHeight / 3.3,
    },
    categoryInImages: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: COLORS.GREEN,
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

