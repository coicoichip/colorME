import React, { Component } from 'react';
import { Image, Platform, Text, View, StatusBar, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Container, Item, Left, Right, Spinner } from 'native-base';
import BackButton from '../../commons/BackButton';
import Loading from '../../commons/Loading';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import WebViewAutoHeight from '../../commons/WebViewAutoHeight';
import styles from '../../styles/styles';
import * as size from '../../styles/sizes';
import { formatImageLink } from "../../helper/index"
import blogStore from "./blogStore";
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
                    {/* <View style={{
                        alignItems: 'center', justifyContent: 'flex-start', flexDirection: "row"
                    }}>
                        <Text style={[styles.textDescriptionDark, styles.buttonRegister, styles.textDownload, {borderRadius: 20}]}>Tải ngay</Text>
                        <IconDefault
                            name={'Feather|arrow-right'}
                            style={{ fontWeight: 'bold', marginLeft: -55 }}
                            color={'white'}
                            size={26}
                        />
                    </View> */}
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
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        const { detailBlog, isLoadingDetail } = blogStore;
        console.log(detailBlog)
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
                            </View>
                    }
                </ScrollView>
            </Container>
        );
    }
}



export default DetailBlogContainer