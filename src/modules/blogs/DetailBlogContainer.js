import React, { Component } from 'react';
import { Dimensions, StyleSheet, Image, Platform, Text, View, TouchableOpacity, ScrollView, FlatList, Linking, KeyboardAvoidingView, ActivityIndicator, } from 'react-native';
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
import TextInputContainer from "../comment/TextInputContainer"
import { ButtonCommon } from "../../commons/Button"
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import IconDefault from '../../commons/IconDefault';
import CommentContainer from "../comment/CommentContainer";
import { observer } from "mobx-react";
import OneSignal from "react-native-onesignal";
@observer
class DetailBlogContainer extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        blogStore.getDetailBlog(params.slug);
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
        const { params } = this.props.navigation.state;
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
                <FlatList
                    ref={ref => this.flatList = ref}
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={[1]}
                    renderItem={() => { }}
                    ListHeaderComponent={() => {
                        return (
                            isLoadingDetail || commentStore.isLoading
                                ?
                                <Loading />
                                :

                                <View style={{ flex: 1 }}>
                                    <View activeOpacity={0.8} style={{ marginBottom: 15 }}
                                    >
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

                                </View>
                        )
                    }}
                    // onEndReached={() => this.getMoreSubjects()}
                    ListFooterComponent={
                        <CommentContainer id={params.id} navigate={navigate} />
                    }
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'position' : undefined}>
                    <TextInputContainer id={params.id} flatList={this.flatList} />
                </KeyboardAvoidingView>
            </Container>

        );
    }
    componentDidMount(){
        OneSignal.inFocusDisplaying(2);
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