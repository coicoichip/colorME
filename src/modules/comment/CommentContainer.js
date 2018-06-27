import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Image, Platform, Text, View, TouchableOpacity, FlatList, Alert, Modal, PanResponder } from 'react-native';
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
    componentWillMount() {
        commentStore.getComment(this.props.id, getProfileStore.updateUser.name);
        commentStore.getInfoPost(this.props.id, getProfileStore.updateUser.name);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
    }
    _onPanResponderGrant(event, gestureState) {
        if (event.nativeEvent.locationX === event.nativeEvent.pageX) {
            commentStore.modalDelete = false;
        }
    }
    convertComment(comments) {
        let parrent = comments.filter(item => item.parent_id == 0);
        let children = comments.filter(item => item.parent_id !== 0);
        return parrent.map((item) => {
            return {
                id: item.id,
                comments_related: [item].concat(children.filter(post => post.parent_id == item.id))
            }
        })
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
        const { navigate } = this.props;
        return (
            commentStore.isLoading == true ? null :
                <View style={{ flex: 1, marginTop: -10 }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 17, marginBottom: 10 }}>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', flex: 1 }}>
                            <Button
                                transparent style={{ paddingRight: 10 }}
                                onPress = {() => commentStore.likePost(this.props.id)}
                            >
                                <IconDefault name={(commentStore.liked) ? 'FontAwesome|heart' : 'FontAwesome|heart-o'} size={20}
                                    color={(commentStore.liked) ? COLORS.MAIN_COLOR : COLORS.ICON} />
                                <Text
                                    style={[part.describeLight, part.paddingLeft]}>{commentStore.dataInfoPost.likes_count ? commentStore.dataInfoPost.likes_count : '0'}</Text>
                            </Button>
                            <Button transparent style={{ paddingRight: 10 }}
                            >
                                <IconDefault name="FontAwesome|comment-o"
                                    size={20}
                                    color={COLORS.ICON} />
                                <Text
                                    style={[part.describeLight, part.paddingLeft]}>{commentStore.dataInfoPost.comments_count ? commentStore.dataInfoPost.comments_count : '0'}</Text>
                            </Button>
                            <Button transparent style={{ paddingRight: 10 }}>
                                <IconDefault name="FontAwesome|circle-thin"
                                    size={23}
                                    color={COLORS.ICON} />
                                <Text
                                    style={[part.describeLight, part.paddingLeft]}>{commentStore.dataInfoPost.views_count ? commentStore.dataInfoPost.views_count : '0'}</Text>
                            </Button>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Button transparent>
                                <IconDefault name="FontAwesome|star" size={23}
                                    color={'#ffd800'} />
                            </Button>
                        </View>
                    </View>

                    <FlatList
                        keyExtractor={item => item.id + ''}
                        showsVerticalScrollIndicator={false}
                        data={this.convertComment(commentStore.comments)}
                        renderItem={({ item, index }) => {
                            commentStore.commentsChild[index] = item.comments_related;
                            return (
                                item.comments_related.map((post, i) => {
                                    return (
                                        <View
                                            style={[post.parent_id === 0 ? part.cardCmt : part.cardCmtChild]}>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={part.paddingTRB}
                                                // onPress={() => navigate('UserInNewFeed', { username: post.commenter.username })}
                                            >
                                                <Image
                                                    style={post.parent_id === 0 ? part.avatarUserNormal : part.avatarUserSmall}
                                                    source={post.commenter.avatar_url ? { uri: formatImageLink(post.commenter.avatar_url) } : require('../../../assets/image/colorMe.jpg')} />
                                            </TouchableOpacity>
                                            <View style={{ paddingRight: 20, flex: 1 }}>
                                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                                    <Text
                                                        style={[part.titleSmallDark, part.paddingTLB]}
                                                    >
                                                        {post.commenter.name}
                                                    </Text>
                                                </View>
                                                <Text
                                                    style={[part.textDescriptionDark, { paddingLeft: 5 }]}
                                                >
                                                    {post.content}
                                                </Text>
                                                {
                                                    post.isLoading == true
                                                        ?
                                                        <View>
                                                        <Text
                                                            style={[part.textDescriptionDark, part.paddingTLB]}
                                                        >
                                                            {"Đang đăng..."}
                                                        </Text>
                                                        </View>
                                                        :
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text
                                                                style={[part.textDescriptionDark, part.paddingTLB]}
                                                            >
                                                                {post.likes + " " + "lượt thích"}
                                                            </Text>
                                                            {getProfileStore.updateUser.id == post.commenter.id ?
                                                                <TouchableOpacity onPress={() => this.deleteComment(post.id)}>

                                                                    <Text style={[part.textDescriptionDark, part.paddingTLB]}>Xoá</Text>
                                                                </TouchableOpacity>
                                                                : null
                                                            }
                                                            {
                                                                post.parent_id === 0 ?
                                                                    <TouchableOpacity onPress={() => { commentStore.value.parent_id = post.id; navigate('ReplyComment', { index: index, id: this.props.id }) }} >
                                                                        <Text style={[part.textDescriptionDark, part.paddingTLB]}>Trả lời</Text>
                                                                    </TouchableOpacity>
                                                                    : null
                                                            }
                                                        </View>
                                                }
                                            </View>
                                            <View style={[part.itemLike]}>
                                                <TouchableOpacity transparent onPress={() => {
                                                    commentStore.likeComment(post)
                                                }}>
                                                    <IconDefault name={(post.liked) ? 'FontAwesome|heart' : 'FontAwesome|heart-o'}
                                                        color={(post.liked) ? COLORS.MAIN_COLOR : COLORS.ICON}
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
                    />
                    <Modal
                    onRequestClose={() => commentStore.modalDelete = false}
                    animationType="fade"
                    transparent={true}
                    visible={commentStore.modalDelete}
                    position={'center'}
                >
                    <View style={part.wrapperModalUpdate}
                          {...this.panResponder.panHandlers}>
                        <View style={part.modalUpdate}>
                            {
                               commentStore.isLoadingDelete
                                    ?
                                    <Loading/>
                                    :
                                    <View/>
                            }
                            <Text style={[part.textUpdate, {paddingBottom: 10}]}>{"Đang xoá bình luận ..."}</Text>
                        </View>
                    </View>
                </Modal>
                </View>
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
    wrapperModalUpdate : {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalUpdate : {
        borderRadius: 10,
        width: SIZES.DEVICE_WIDTH_SIZE * 0.75,
        height: SIZES.DEVICE_HEIGHT_SIZE / 4,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textUpdate: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Roboto-Regular',
    }
});