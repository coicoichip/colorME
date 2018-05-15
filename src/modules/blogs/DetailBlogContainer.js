import React, { Component } from 'react';
import { Image, Platform, Text, View, StatusBar, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Container, Item, Left, Right, Spinner } from 'native-base';
import BackButton from '../../commons/BackButton';
import Loading from '../../commons/Loading';
import WebViewAutoHeight from '../../commons/WebViewAutoHeight';
import styles from '../../styles/styles';
import { formatImageLink } from "../../helper/index"
import blogStore from "./blogStore";
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
    renderDownLoad(link){
        const { params } = this.props.navigation.state;
        if(params.kind == "resource"){
            return (
                <TouchableOpacity activeOpacity = {0.8} style = {{width : 200, height : 30, backgroundColor : 'red'}}
                 onPress = {()=> {Linking.openURL(this.getLink(link))}}
                >
                <Text>Download ngay</Text>
                    </TouchableOpacity>
            )
        }else{
            return null
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        const { detailBlog, isLoadingDetail } = blogStore;
        return (
            <Container style={styles.wrapperContainer}>
                <View style={[styles.wrapperHeader, styles.paddingLeftRight, { flexDirection: 'row' }]}>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={[styles.textHeaderScreen, { fontSize: 17 }]} onPress={() => this.refs.detailBlog.scrollTo({ x: 0, y: 0, animated: true })} >{detailBlog.title}</Text>
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

                            <View>
                                <View activeOpacity={0.8} style={{ marginBottom: 15 }}
                                >
                                    <View>
                                        <Image source={{ uri: formatImageLink(detailBlog.url) }} style={styles.imageAvatarModuleEmails} />
                                    </View>
                                    <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                                    {this.renderDownLoad(detailBlog.content)}


                                        <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                style={{ height: 20, width: 20, borderRadius: 10 }}
                                                source={{ uri: detailBlog.author.avatar_url ? formatImageLink(detailBlog.author.avatar_url) : "" }}
                                            />
                                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginLeft: 5 }}>{detailBlog.author.name.trim()}</Text>
                                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginLeft: 5, color: 'gray' }}>{detailBlog.time.trim()}</Text>
                                        </View>
                                    </View>
                                </View>

                                <WebViewAutoHeight source={detailBlog.content ? detailBlog.content : ''} />
                                
                            </View>
                    }
                </ScrollView>
            </Container>
        );
    }
}



export default DetailBlogContainer