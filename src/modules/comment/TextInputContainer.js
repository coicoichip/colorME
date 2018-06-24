import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Image, Platform, Text, View, StatusBar, TouchableOpacity, ScrollView, FlatList, Linking, KeyboardAvoidingView, ActivityIndicator, } from 'react-native';
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

import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import getProfileStore from "../profile/profileStore";

import { formatImageLink } from "../../helper/index"
import commentStore from "./commentStore";

import IconDefault from '../../commons/IconDefault';
import { observer } from "mobx-react"
@observer
export default class TextInputContainer extends Component {
    
        postComment = async () => {
            await commentStore.postComment(this.props.id, commentStore.value, getProfileStore.updateUser);
            setTimeout(() => this.props.flatList.scrollToEnd(), 200);
            
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? undefined : 200}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            // NEED HEIGHT KEYBOARD
            >
                <CardItem style={part.cardBottomInModal}>
                    <Thumbnail
                        style={part.avatarUserSmall}
                        // source={{ uri: user.avatar_url }} />
                        source={getProfileStore.updateUser.avatar_url ? { uri: formatImageLink(getProfileStore.updateUser.avatar_url) } : require('../../../assets/image/colorMe.jpg')} />
                    <Body style={{ justifyContent: 'center', marginLeft: 10 }}>
                        {/* {this.state.isLoadingPostComment ? (
                                            <View style={[part.wrapperContainer, { height: 15 }]}>
                                                <ActivityIndicator color={color.gray} />
                                            </View>
                                        ) : ( */}
                        <Item rounded>
                            <Input
                                autoFocus={this.props.haveAutoFocus ? true : false}
                                placeholder='Viết bình luận'
                                autoCorrect={false}
                                ref={input => {
                                    commentStore.checkFocus['one'] = input
                                }}
                                underlineColorAndroid={'transparent'}
                                returnKeyType={'send'}
                                onSubmitEditing={commentStore.value.comment_content == ''
                                    ?
                                    () => { }
                                    :
                                    this.postComment}
                                // placeholderTextColor={color.icon}
                                style={part.inputTheme01}
                                onChangeText={
                                    (text) => {
                                        commentStore.value.comment_content = text
                                    }
                                }
                                value={commentStore.value.comment_content}
                            />
                            {/*<TouchableOpacity>*/}
                            {/*<Icon active name='fontawesome|camera-retro'*/}
                            {/*size={size.iconBig}*/}
                            {/*color={color.icon}*/}
                            {/*style={{paddingRight: 15}}*/}
                            {/*/>*/}
                            {/*</TouchableOpacity>*/}
                        </Item>
                        {/* )} */}
                    </Body>
                    <TouchableOpacity
                        onPress={
                            commentStore.value.comment_content == ''
                                ?
                                () => {
                                }
                                :
                                this.postComment
                        }

                    >
                        <IconDefault active name={'FontAwesome|paper-plane'}
                            size={20}
                            // color={colorCommentIcon}
                            color={commentStore.value.comment_content.length > 0 ? 'red' : 'gray'}
                            style={[part.paddingTLB, { paddingLeft: 10 }]}
                        />
                    </TouchableOpacity>
                </CardItem>
            </KeyboardAvoidingView>
        )
    }

}
const part = StyleSheet.create({
    wrapperContainer: {
        padding: 0,
        backgroundColor: COLORS.LIGHT_COLOR,
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
        paddingLeft: 40,
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
        fontFamily: FONTS.MAIN_FONT_BOLD,
        fontSize: 15,
    },
    textDescriptionDark: {
        color: '#000',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,

    },
    paddingLeft: {
        paddingLeft: 5,
    },
});
