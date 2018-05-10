import React, {Component} from 'react';
import {Image, Platform, Text, View, StatusBar} from 'react-native';
import {Container, Content, Item, Left, Right, Spinner} from 'native-base';
import BackButton from '../../commons/BackButton';
import Loading from '../../commons/Loading';
import WebViewAutoHeight from '../../commons/WebViewAutoHeight';
import styles from '../../styles/styles';
import {formatImageLink} from "../../helper/index"
import blogStore from "./blogStore";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {observer} from "mobx-react"

@observer
class DetailBlogContainer extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        blogStore.getDetailBlog(params.slug);
    }

    render() {
        const {navigate} = this.props.navigation;
        const {goBack} = this.props.navigation;
        const {detailBlog, isLoadingDetail} = blogStore;
        return (
            <Container style={styles.wrapperContainer}>
                <ParallaxScrollView
                    backgroundColor={'#FFF'}
                    showsVerticalScrollIndicator={false}
                    headerBackgroundColor={'#FFF'}
                    stickyHeaderHeight={Platform.OS === 'ios' ? 70 : 60}
                    parallaxHeaderHeight={350}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View style={styles.wrapperImageInGetFull}>
                            <View key="background">
                            </View>
                        </View>
                    )}
                    renderForeground={() => (
                        <View key="parallax-header" style={[styles.parallaxHeaderTitle]}>
                            <View style={styles.paddingLeftRight}>
                                <Text  style={[styles.textTitleBlog, {fontSize : 20,textAlign: 'center', paddingLeft: 20, paddingRight: 20}]} numberOfLines={3}>
                                    {
                                        isLoadingDetail
                                            ?
                                            'Đang tải...'
                                            :
                                            detailBlog.title
                                    }
                                </Text>
                                <Text/>
                                <View style={styles.wrapperCenter}>
                                    <Image
                                        source={{uri: detailBlog.author ? formatImageLink(detailBlog.author.avatar_url) : ''}}
                                        style={styles.imageCircleBig}/>
                                </View>
                                <Text/>
                                <Text style={[styles.textTitleBlog, {textAlign: 'center', fontSize : 13}]} numberOfLines={1}>
                                    Đăng bởi <Text style={[styles.textTitleBlog, {color: '#287aff', fontSize : 13}]}>
                                    {
                                        isLoadingDetail
                                            ?
                                            'Đang tải...'
                                            :
                                            detailBlog.author ? detailBlog.author.name.trim() : 'colorME'
                                    }
                                </Text>
                                </Text>
                                <Text style={[styles.textTitleBlog, {textAlign: 'center', fontSize : 13}]}
                                      numberOfLines={1}>
                                    {
                                        isLoadingDetail
                                            ?
                                            'Đang tải...'
                                            :
                                            detailBlog.created_at
                                    }
                                </Text>
                                <Text/>
                                <View style={[styles.wrapperCenter]}>
                                    <Text style={[ styles.category,styles.textDescriptionLightBold, {bottom: 0, textAlign: 'center', fontSize  :10}]}>
                                        {
                                            isLoadingDetail
                                                ?
                                                'Đang tải...'
                                                :
                                                detailBlog.category !== "" ? detailBlog.category.trim() : "Chưa phân loại"
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={styles.stickySection}>
                            <View style={[styles.wrapperCenter,Platform.OS === 'ios' ? {marginTop: 30} : {marginTop: 20}]}>
                                <Text style={[styles.textTitleBlog, {fontSize : 12,paddingLeft: 50, paddingRight: 50}]} numberOfLines={1}>
                                    {
                                        isLoadingDetail
                                            ?
                                            'Đang tải...'
                                            :
                                            detailBlog.title
                                    }
                                </Text>
                            </View>
                        </View>
                    )}
                    renderFixedHeader={() => (
                        <View key="fixed-header" style={styles.iconInDrawerNav}>
                        <Left style={Platform.OS === 'ios' ? {marginTop: 20} : {marginTop: 10}}>
                            <BackButton goBack={goBack}/>
                        </Left>
                    </View>
                    )}
                >
                    {
                        isLoadingDetail
                            ?
                            <Loading/>
                            :
                            <WebViewAutoHeight source={detailBlog.content ? detailBlog.content : ''}/>
                    }
                </ParallaxScrollView>
            </Container>
        );
    }
}



export default DetailBlogContainer