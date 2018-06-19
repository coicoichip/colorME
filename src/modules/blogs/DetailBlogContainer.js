import React, { Component } from 'react';
import { StyleSheet, Image, Platform, Text, View, StatusBar, TouchableOpacity, ScrollView, Linking, KeyboardAvoidingView, ActivityIndicator, } from 'react-native';
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
import BackButton from '../../commons/BackButton';
import Loading from '../../commons/Loading';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import WebViewAutoHeight from '../../commons/WebViewAutoHeight';
import styles from '../../styles/styles';
import * as size from '../../styles/sizes';
import { formatImageLink } from "../../helper/index"
import blogStore from "./blogStore";
import commentStore from "../comment/commentStore";
import { ButtonCommon } from "../../commons/Button"
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import IconDefault from '../../commons/IconDefault';
import { observer } from "mobx-react"

@observer
class DetailBlogContainer extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        blogStore.getDetailBlog(params.slug);
        commentStore.getComment(params.id);
        console.log(params.kind)
    }
    getContent(url, content) {
        return "<p><img src=" + formatImageLink(url) + ' style="width: 100%px; height: 100%px"></p>' + content
    }
    // getContent(content){
    //   const {params} = this.props.navigation.state;
    //   if(params.kind == "resource") {
    //   let str = "[[share_to_download]]"
    //    let end  = content.indexOf(str);
    //    return content.slice(0, end)
    //   }
    // }
    getLink(content) {
        const { params } = this.props.navigation.state;
        if (params.kind == "resource") {
            let str1 = "[[share_to_download]]"
            let str2 = "[[/share_to_download]]"
            let start = content.indexOf(str1);
            let end = content.indexOf(str2);
            return content.slice(start + str1.length, end)
        }
    }
    renderDownLoad(link) {
        const { params } = this.props.navigation.state;
        if (params.kind == "resource") {
            return (
                <TouchableOpacity activeOpacity={0.8} >
                    <View style={styles.wrapperButton}>
                        <ButtonCommon
                            haveColorGreen
                            onPress={() => { Linking.openURL(this.getLink(link)) }}
                            label={"Tải Ngay".toUpperCase()}
                            text={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: SIZES.SUBTITLE_SIZE
                            }}
                        />
                    </View>

                </TouchableOpacity>
            )
        } else {
            return null
        }
    }
    renderComment() {
        // let likedIcon = liked ? 'fontawesome|heart' : 'fontawesome|heart-o';
        return (
            commentStore.comments.map((item, index) => {
                return (
                    <View
                        style={[item.parent_id === 0 ? part.cardCmt : part.cardCmt]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={part.paddingTRB}
                            onPress={() => navigate('UserInNewFeed', { username: item.commenter.username })}
                        >
                            <Image
                                style={part.avatarUserSmall}
                                source={{ uri: item.commenter.avatar_url }} />
                        </TouchableOpacity>
                        <View style={{paddingRight: 20}}>
                            <Text
                                style={[part.titleSmallBlue, part.paddingTLB]}
                            >
                                {item.commenter.name}
                            </Text>
                            <Text
                                style={[part.textDescriptionDark, part.paddingLeft]}
                            >
                                {item.content}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={[part.textDescriptionDark, part.paddingTLB]}
                                >
                                    {/* {item.created_at} &middot; {numberOfLikesComment[i]} lượt thích */}
                                    lượt thích
                                                                </Text>

                                {/* {item.commenter.username === this.props.user.username ?
                                    (
                                        <Text
                                            style={[part.textDescriptionDark, part.paddingTLB, part.marginLeftFar]}
                                            onPress={() => this.deleteComment(item.id, this.props.token, i)}
                                        >
                                            Xoá
                                                                        </Text>
                                    ) : (<TouchableOpacity />)
                                } */}
                            </View>
                            <TouchableOpacity transparent onPress={() => {
                                this.likeComment(item.id, this.props.user.id, i)
                            }}>
                                <IconDefault name={'FontAwesome|heart'}
                                    color={"red"}
                                    size={15}
                                    style={[part.paddingRight, part.marginTop]}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                )
            })
        );
    }

    editString(string) {
        const { params } = this.props.navigation.state;
        let index = string.indexOf("<p><br></p><p><a");
        if (index == -1) index = string.indexOf("<a");
        let string1 = string.slice(index, string.length);
        if (params.kind === "resource")
            return (string.replace(string1, ""));
        else return string;
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        const { detailBlog, isLoadingDetail } = blogStore;
        return (
            <Container style={styles.wrapperContainer}>
                <View style={[styles.wrapperHeader, styles.paddingLeftRight, { flexDirection: 'row' }]}>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={[styles.textHeaderScreen, { fontSize: 17 }]} numberOfLines={1} onPress={() => this.refs.detailBlog.scrollTo({ x: 0, y: 0, animated: true })} >{detailBlog.title}</Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
                        onPress={() => this.props.navigation.goBack()}
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
                <ScrollView ref={'detailBlog'} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    {
                        isLoadingDetail
                            ?
                            <Loading />
                            :

                            <View style={{ flex: 1 }}>
                                <View activeOpacity={0.8} style={{ marginBottom: 15 }}
                                >
                                    {/* <View style={{alignItems: 'center'}}>
                                        <Image source={{ uri: detailBlog.url ? formatImageLink(detailBlog.url): "" }} style={styles.imageAvatarModuleEmails} />
                                    </View> */}
                                    <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>



                                        <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                style={{ height: 20, width: 20, borderRadius: 10 }}
                                                source={detailBlog.author.avatar_url !== "http://" ? { uri: formatImageLink(detailBlog.author.avatar_url) } : require('../../../assets/image/colorMe.jpg')}
                                            />
                                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginLeft: 5 }}>{detailBlog.author.name.trim()}</Text>
                                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginLeft: 5, color: 'gray' }}>{detailBlog.time.trim()}</Text>
                                        </View>
                                    </View>
                                </View>

                                <WebViewAutoHeight source={this.getContent(detailBlog.url, detailBlog.content) !== "" ? this.editString(this.getContent(detailBlog.url, detailBlog.content)) : ''} />
                                {this.renderDownLoad(detailBlog.content)}
                                {this.renderComment()}
                            </View>
                    }
                </ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'position' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? undefined : 200}
                // NEED HEIGHT KEYBOARD
                >
                    <CardItem style={part.cardBottomInModal}>
                        <Left>
                            <Thumbnail
                                style={part.avatarUserSmall}
                                // source={{ uri: user.avatar_url }} />
                                source={{ uri: "data:image/jpeg;base64,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" }} />
                            <Body>
                                {/* {this.state.isLoadingPostComment ? (
                                                    <View style={[part.wrapperContainer, { height: 15 }]}>
                                                        <ActivityIndicator color={color.gray} />
                                                    </View>
                                                ) : ( */}
                                <Item rounded>
                                    <Input
                                        placeholder='Viết bình luận'
                                        autoCorrect={false}
                                        underlineColorAndroid={'transparent'}
                                        returnKeyType={'send'}
                                        // placeholderTextColor={color.icon}
                                        style={part.inputTheme01}
                                        // onChangeText={
                                        //     (text) => {
                                        //         this.setState({ comment_content: text })
                                        //     }
                                        // }
                                        // value={this.state.comment_content}
                                        value={'hello'}
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
                            // onPress={
                            //     this.state.comment_content == ''
                            //         ?
                            //         () => {
                            //         }
                            //         :
                            //         () => this.commentPost(this.props.item.id, this.props.token, this.state)
                            // }
                            >
                                <IconDefault active name={'FontAwesome|paper-plane'}
                                    size={20}
                                    // color={colorCommentIcon}
                                    color={'red'}
                                    style={[part.paddingTLB, { paddingLeft: 10 }]}
                                />
                            </TouchableOpacity>
                        </Left>
                    </CardItem>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const part = StyleSheet.create({
    wrapperContainer: {
        padding: 0,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    cardBottomInModal: {
        width: SIZES.DEVICE_WIDTH_SIZE * 0.9,
        flexDirection: 'row',
        height: 50,
        backgroundColor: COLORS.LIGHT_COLOR,
        bottom: 0,
        borderRadius: 10,
    },
    avatarUserSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
        paddingBottom: 5,
        paddingTop: 5,
    },
    cardCmt: {
        flexDirection: 'row',
        paddingRight: 20,
        flex: 1,
    },
    paddingTRB: {
        paddingRight: 5,
        paddingBottom: 5,
        paddingTop: 5,
    },
    titleSmallBlue: {
        fontFamily: (Platform.OS === 'ios') ? FONTS.MAIN_FONT : FONTS.MAIN_FONT,
        fontSize: 14,
        color: 'blue',
        fontWeight: (Platform.OS === 'ios') ? '600' : 'normal',
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


export default DetailBlogContainer