import React, { Component } from 'react';
import { Image, Platform, Text, View, WebView } from 'react-native';
import { Container, Content, Item, Left, Right, Spinner } from 'native-base';
import BackButton from '../../commons/BackButton';
import Loading from '../../commons/Loading';
import WebViewAutoHeight from '../../commons/WebViewAutoHeight';
import styles from '../../styles/styles';
import * as color from '../../styles/colors';
import * as text from '../../constants/text';
import { connect } from 'react-redux'
import * as blogAction from './blogAction';
import { formatImageLink } from "../../helper/index"
import { bindActionCreators } from 'redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import parallaxStyle from '../../styles/parallaxStyle';

class DetailBlog extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
        }
    }

    componentWillMount() {
        const { blogAction } = this.props;
        blogAction.getDetailBlog(this.props.navigation.state.params.id);
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        const { data, isLoading } = this.props;
        return (
            <Container style={styles.wrapperContainer}>
                <ParallaxScrollView
                    backgroundColor={'#FFF'}
                    showsVerticalScrollIndicator={false}
                    headerBackgroundColor={'#FFF'}
                    stickyHeaderHeight={Platform.OS === 'ios' ? 70 : 60}
                    parallaxHeaderHeight={270}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View style={styles.wrapperImageFullWidth}>
                            <View key="background">
                            </View>
                        </View>
                    )}
                    renderForeground={() => (
                        <View key="parallax-header" style={[parallaxStyle.parallaxHeaderTitle]}>
                            <View style={styles.paddingLeftRight}>
                                <Text style={[{ color: "#020202", fontSize: 22, fontFamily: "HelveticaNeue-Thin", textAlign: 'center', paddingLeft: 20, paddingRight: 20 }]} numberOfLines={3}>
                                    {
                                        isLoading
                                            ?
                                            text.TEXT_ISLOADING
                                            :
                                            data.title
                                    }
                                </Text>
                                <Text />
                                <View style={styles.wrapperCenter}>
                                   {
                                       isLoading ? 
                                       <Text style={[{ color: "#020202", fontSize: 22, fontFamily: "HelveticaNeue-Thin", textAlign: 'center', paddingLeft: 20, paddingRight: 20 }]} numberOfLines={3}>
                                       {text.TEXT_ISLOADING}
                                       </Text>
                                       :
                                       <Image
                                        source={{ uri: data.author ? formatImageLink(data.author.avatar_url) : '' }}
                                        style={styles.imageCircleBig} />
                                       
                                     }
                                    
                                </View>
                                <Text />
                                <Text style={[styles.textAuthor, { textAlign: 'center', color: color.BLUE_COLOR }]} numberOfLines={1}>
    
                                        {
                                            isLoading
                                                ?
                                                text.TEXT_ISLOADING
                                                :
                                                data.author ?    "Đăng bởi " + data.author.name.trim() : 'Khuyết danh'
                                        }
                                    </Text>
                               
                                <Text style={[styles.textAuthor, { textAlign: 'center', color: color.disableColor, marginTop: 5 }]}
                                    numberOfLines={1}>
                                    {
                                        isLoading
                                            ?
                                            text.TEXT_ISLOADING
                                            :
                                            data.created_at
                                    }
                                </Text>
                                <Text />
                                <View style={styles.wrapperCenter}>
                                    <Text style={[styles.textPupa, { fontSize: 12, backgroundColor: color.MAIN_COLOR }]}>
                                        {
                                            isLoading
                                                ?
                                                text.TEXT_ISLOADING
                                                :
                                                data.category !== "" ? data.category : "Chưa phân loại"
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={parallaxStyle.stickySection}>
                            <View style={[styles.wrapperCenter, Platform.OS === 'ios' ? { marginTop: 30 } : { marginTop: 20 }]}>
                                <Text style={[styles.textTitleBig, { paddingLeft: 50, paddingRight: 50 }]} numberOfLines={1}>
                                    {
                                        isLoading
                                            ?
                                            'Đang tải...'
                                            :
                                            data.title
                                    }
                                </Text>
                            </View>
                        </View>
                    )}
                    renderFixedHeader={() => (
                        <View key="fixed-header" style={styles.wrapperIconFixedHeader}>
                            <Left style={Platform.OS === 'ios' ? { marginTop: 23, marginLeft: 15 } : { marginTop: 23, marginLeft: 15 }}>
                                <BackButton goBack={goBack} />
                            </Left>
                        </View>
                    )}
                >
                    {
                        isLoading
                            ?
                            <Loading />
                            :
                            <WebViewAutoHeight source={data.content ? data.content : "<h1 style = 'text-align : center, font-size : 30px'>Bài viết không có nội dung</h1>"} />
                    }
                </ParallaxScrollView>
            </Container>

        );
    }
}


function mapStateToProps(state) {
    return {
        data: state.blog.detailBlog,
        isLoading: state.blog.isLoadingDetail,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        blogAction: bindActionCreators(blogAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailBlog);