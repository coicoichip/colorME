import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Image, Platform, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Input,
    Item,
    Left,
    List,
    ListItem,
    Right,
    Spinner,
    Thumbnail,
} from 'native-base';

import Loading from '../../commons/Loading';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';

import { formatImageLink } from "../../helper/index"
import commentStore from "./commentStore";
import IconDefault from '../../commons/IconDefault';
import { observer } from "mobx-react";
import getProfileStore from "../profile/profileStore";
import TextInputContainer from "./TextInputContainer";
@observer
export default class CommentContainer extends Component {
    constructor() {
        super();

    }
    deleteComment(id) {
        Alert.alert(
            'Thông báo',
            "Bạn chắc chắn muốn xoá bình luận này",
            [

                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                { text: 'OK', onPress: () => commentStore.deleteComment(id) },
            ],
            { cancelable: false }
        )
    }

    render() {
     const {items, index}= this.props;
        return (
            
            items.comments_related.map((item, index) => {
                return (
                    <View
                        style={[item.parent_id === 0 ? part.cardCmt : part.cardCmtChild]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={part.paddingTRB}
                            onPress={() => navigate('UserInNewFeed', { username: item.commenter.username })}
                        >
                            <Image
                                style={item.parent_id === 0 ? part.avatarUserNormal : part.avatarUserSmall}
                                source={item.commenter.avatar_url ? { uri: formatImageLink(item.commenter.avatar_url) } : require('../../../assets/image/colorMe.jpg')} />
                        </TouchableOpacity>
                        <View style={{ paddingRight: 20, flex: 1 }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Text
                                    style={[part.titleSmallDark, part.paddingTLB]}
                                >
                                    {item.commenter.name}
                                </Text>
                            </View>
                            <Text
                                style={[part.textDescriptionDark, { paddingLeft: 5 }]}
                            >
                                {item.content}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={[part.textDescriptionDark, part.paddingTLB]}
                                >
                                    {item.likes + " " + "lượt thích"}
                                </Text>
                                {getProfileStore.updateUser.id == item.commenter.id ?
                                    <TouchableOpacity onPress={() => this.deleteComment(item.id)}>

                                        <Text style={[part.textDescriptionDark, part.paddingTLB]}>Xoá</Text>
                                    </TouchableOpacity>
                                    : null
                                }
                                {
                                    item.parent_id === 0 ?
                                        <TouchableOpacity onPress={() => { commentStore.value.parent_id = item.id; }} >
                                            <Text style={[part.textDescriptionDark, part.paddingTLB]}>Trả lời</Text>
                                        </TouchableOpacity>
                                        : null
                                }
                            </View>
                        </View>
                        <View style={[part.itemLike]}>
                            <TouchableOpacity transparent onPress={() => {
                                commentStore.likeComment(item)
                            }}>
                                <IconDefault name={(item.liked) ? 'FontAwesome|heart' : 'FontAwesome|heart-o'}
                                    color={(item.liked) ? COLORS.MAIN_COLOR : COLORS.ICON}
                                    size={15}
                                    style={[part.paddingRight, part.marginTop]}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>)
                        
            })
        )
    }
}

const part = StyleSheet.create({
    wrapperContainer: {
        padding: 0,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    itemLike: {
        position: 'absolute',
        top: 3,
        right: 0,

    },
    cardBottomInModal: {
        width: SIZES.DEVICE_WIDTH_SIZE - 10,
        flexDirection: 'row',
        height: 50,
        backgroundColor: COLORS.LIGHT_COLOR,
        bottom: 0,
        borderRadius: 10,
    },
    avatarUserNormal: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    avatarUserSmall: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    describeLight: {
        fontSize: SIZES.DESCRIPTION_SIZE,
        color: COLORS.GRAY_COLOR,
        fontWeight: (Platform.OS === 'ios') ? '400' : 'normal',

    },
    inputTheme01: {
        fontFamily: (Platform.OS === 'ios') ? FONTS.MAIN_FONT : FONTS.MAIN_FONT,
        fontSize: 12,
        lineHeight: 10,
        height: (Platform.OS === 'ios') ? 30 : 40,
        fontWeight: (Platform.OS === 'ios') ? '400' : 'normal',
    },
    paddingTLB: {
        paddingLeft: 5,
        paddingRight: 15,
        paddingBottom: 5,
        paddingTop: 5,
    },
    cardCmt: {
        flexDirection: 'row',
        paddingLeft: 20,
        marginRight: 20,
        paddingRight: 20,
        flex: 1,
    },
    cardCmtChild: {
        flexDirection: 'row',
        paddingLeft: 50,
        marginRight: 20,
        paddingRight: 20,
        flex: 1,
    },
    paddingTRB: {
        paddingRight: 5,
        paddingBottom: 5,
        paddingTop: 5,
    },
    titleSmallDark: {
        fontWeight: '500',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 15,
    },
    textDescriptionDark: {
        color: '#000',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,

    },
    paddingLeft: {
        paddingLeft: 1,
    },
});
