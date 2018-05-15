import React, { Component } from 'react';
import { Image, Platform, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Container, Content, Item, Left, Right, Spinner } from 'native-base';
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
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        const { detailBlog, isLoadingDetail } = blogStore;
        return (
            <Container style={styles.wrapperContainer}>
                <View style={[styles.wrapperHeader, styles.paddingLeftRight, { flexDirection: 'row', marginTop: 20 }]}>
                    <View style={{ flex: 8 }}>
                        <Text style={[styles.textHeaderScreen, { fontSize: 20 }]} onPress = {() => this.refs.detailBlog.scrollToOffset({x: 0, y: 0, animated: true})} >{detailBlog.title}</Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1 }}
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
                <Content ref = {'detailBlog'} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                   
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
                </Content>
            </Container>
        );
    }
}



export default DetailBlogContainer