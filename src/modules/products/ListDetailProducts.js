import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import * as color from '../../styles/colors';
import * as size from '../../styles/sizes';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import { Container, Item, Input } from 'native-base';
import Header from '../../commons/Header';
import IconDefault from '../../commons/IconDefault';
import { formatImageLink } from "../../helper/index";
import Analytics from 'appcenter-analytics';
import { observer } from "mobx-react";
import {productsStore} from './productsStore';
import commentStore from '../comment/commentStore'; 
import _ from "lodash";
@observer
class ListDetailProducts extends Component {
    goDetailBlog = () => {
        const { item, navigation } = this.props;
        Analytics.trackEvent(`${STRINGS.ACTION_GO_DETAIL_BLOG} ->  ${item.title.trim()}`, {})
        navigation.navigate('DetailBlog', { id: item.id })
    }
    render() {
        const { item } = this.props;
        return (
            <View>
                <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 15 }}
                    onPress={this.goDetailBlog}>
                    <View >
                        <Image source={{ uri: item.thumb_url ? formatImageLink(item.thumb_url) : "" }} style={styles.imageAvatarModuleEmails} />
                    </View>
                </TouchableOpacity>
                <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                    <Text numberOfLines={2} style={styles.emailNameModuleEmail}>{item.title.trim()}</Text>
                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            style={{ height: 20, width: 20, borderRadius: 10 }}
                            source={{ uri: item.author.avatar_url ? formatImageLink(item.author.avatar_url) : "" }}
                        />
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginLeft: 5 }}>{item.author.name.trim()}</Text>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginLeft: 5, color: 'gray' }}>{item.created_at}</Text>
                    </View>
                    <View style={{ flexDirection: 'row',flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginLeft: 5 }}>
                            {item.likes_count} Thích</Text>
                            <IconDefault name={'FontAwesome|circle'} size={6}/>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12}}> {item.views_count} Lượt xem </Text>
                        </View>
                        <Text> </Text>
                        {/* <View>
                                <IconDefault name={(commentStore.liked) ? 'FontAwesome|heart' : 'FontAwesome|heart-o'} size={20}
                                    color={(commentStore.liked) ? COLORS.MAIN_COLOR : COLORS.ICON} /> </View> */}
                        <TouchableOpacity onPress = {() => {productsStore.likePost(item)}}>
                            <IconDefault name={(item.liked) ? 'FontAwesome|heart' : 'FontAwesome|heart-o'} size={30}
                                color={(item.liked) ? COLORS.MAIN_COLOR : COLORS.ICON} /> </TouchableOpacity>
                    </View>
                    <Text style={{ marginTop: 5, fontFamily: 'Roboto-Regular', fontSize: 15 }}>{item.description ? item.description : "Không có mô tả"}</Text>




                </View>
                <View style={styles.footerCard}>
                </View>
            </View>
        )
    }
}
export default ListDetailProducts
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
        backgroundColor: COLORS.MAIN_COLOR,
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
