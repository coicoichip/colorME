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
import Header from '../../commons/Header';
import { formatImageLink } from "../../helper/index"
import commentStore from "./commentStore";
import IconDefault from '../../commons/IconDefault';
import { observer } from "mobx-react";
import getProfileStore from "../profile/profileStore";
import TextInputContainer from "./TextInputContainer";
@observer
export default class ReplyCommentContainer extends Component {
    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <Container style={part.wrapperContainer}>
                <View style={[part.wrapperHeader, part.paddingLeftRight, { flexDirection: 'row' }]}>
                    <TouchableOpacity style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={[part.textHeaderScreen, { fontSize: 20 }]} >Phản hồi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.goBack(); commentStore.value.parent_id = 0; }}
                    >
                        <View style={{ alignItems: 'flex-end' }}>
                            <IconDefault
                                name={'Ionicons|md-close'}
                                style={{ padding: 0 }}
                                color={this.props.color ? this.props.color : null}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    ref={(ref) => this.flatList = ref}
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={params.items.comments_related}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={[item.parent_id === 0 ? part.cardCmt : part.cardCmtChild]}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={part.paddingTRB}
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
                                                <TouchableOpacity>
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
                    }
                    }
                />
                <TextInputContainer id={params.id} flatList={this.flatList} />
            </Container>
        )
    }
}
const isIOS = Platform.OS === 'ios';
const part = StyleSheet.create({
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
    wrapperHeader: {
        height: isIOS ? 80 : 60,
        paddingTop: isIOS ? 20 : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    textHeaderScreen: {
        color: COLORS.DARK_COLOR,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 25,
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
})
