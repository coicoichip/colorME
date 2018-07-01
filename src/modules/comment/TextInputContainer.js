import React, { Component } from 'react';
import { StyleSheet, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native';
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
    View,
} from 'native-base';

import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import getProfileStore from "../profile/profileStore";

import { formatImageLink } from "../../helper/index"
import commentStore from "./commentStore";

import IconDefault from '../../commons/IconDefault';
import { observer } from "mobx-react"
@observer
export default class TextInputContainer extends Component {

    componentDidMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }
    keyboardDidShow(e) {
        commentStore.height = Dimensions.get('window').height - e.endCoordinates.height;
    }

    keyboardDidHide(e) {
        commentStore.height = Dimensions.get('window').height;
    }
    keyboard(){
       this.props.flatList.scrollToEnd();
    }
    postComment = async () => {
        await commentStore.postComment(this.props.id, commentStore.value, getProfileStore.updateUser);
        Keyboard.dismiss();
        setTimeout(() => this.keyboard(), 200)
    }
    render() {

        return (

            <CardItem style={[part.cardBottomInModal, { bottom: this.props.haveAutoFocus ? ((Platform.OS === 'ios') ? 0 : 25) : 0 }]}>
                <Thumbnail
                    style={part.avatarUserSmall}
                    source={getProfileStore.updateUser.avatar_url ? { uri: formatImageLink(getProfileStore.updateUser.avatar_url) } : require('../../../assets/image/colorMe.jpg')} />
                <View style={{ flex: 1, marginLeft : 10}}>
                    <Item rounded>
                        <Input
                            ref={'input'}
                            // autoFocus={this.props.haveAutoFocus ? true : false}
                            placeholder='Viết bình luận'
                            autoCorrect={false}
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
                    </Item>
                </View>
                {/* )} */}
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
        )
    }

}
const part = StyleSheet.create({
    wrapperContainer: {
        padding: 0,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    cardBottomInModal: {
        width: SIZES.DEVICE_WIDTH_SIZE,
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
        lineHeight: 12,
        height: (Platform.OS === 'ios') ? 30 : 40,
        fontWeight: (Platform.OS === 'ios') ? '400' : 'normal',
    },
    paddingTLB: {
        paddingLeft: 5,
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