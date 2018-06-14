import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    StyleSheet, PanResponder, Modal
} from 'react-native';
import * as color from '../../styles/colors';
import * as size from '../../styles/sizes';
import { Container } from 'native-base';
import Header from '../../commons/Header';
import { STRINGS, COLORS, SIZES, FONTS } from "../../constants";
import Loading from '../../commons/Loading';
import { observer } from "mobx-react";
import { observable } from "mobx"
import ListBlog from "./ListBlog";
import Error from '../../commons/Error';
import TextNullData from '../../commons/TextNullData';
import ListTag from "./ListTag";
import Analytics from 'appcenter-analytics';
import Onesignal from "react-native-onesignal";
import blogStore from './blogStore';
import deviceStore from '../check-device/deviceStore';
@observer
class BlogContainer extends Component {
    @observable tag = ""
    constructor() {
        super();
        // this.state = {
        //     modalVisible: false,
        // }
        this.changeTag = this.changeTag.bind(this)
    }
    // componentWillMount(){
    //     blogStore.checkAttendance(splashStore.token || loginStore.token);
    //     this.setState({modalVisible: blogStore.attendanceData.id ? true : false})
    // }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        blogStore.getBlog(params.kind, 1, this.tag);

        
        // if(blogStore.attendanceData.isEnrolled && !!blogStore.attendanceData.isEnrolled){
        //     this.setState({modalVisible: true})
        // }

    }
    getMoreBlogs() {
        const { params } = this.props.navigation.state;
        if (blogStore.current_page < blogStore.total_pages && blogStore.isLoading == false) {
            blogStore.getBlog(params.kind, blogStore.current_page + 1, this.tag)
        }
    }
    loadMore() {
        if (blogStore.isLoading && blogStore.current_page >= 1)
            return (<Loading />)
        else
            return null
    }
    changeTag(item) {
        this.tag = item.tag;
        const { params } = this.props.navigation.state;
        setTimeout(() => blogStore.getBlog(params.kind, 1, this.tag, "search"), 200)
    }
    renderSubject() {
        const { params } = this.props.navigation.state;
        if (blogStore.blogs.length == 0 || blogStore.isSearch) {
            return <Loading />
        }
        if (blogStore.error) {
            return (
                <Error onPress={() => blogStore.getBlog(params.kind, 1, this.tag)} />
            )
        }
        if (blogStore.blogs.length !== 0) {
            return (
                <FlatList
                    ref={'listBlog'}
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={blogStore.blogs}
                    onEndReached={() => this.getMoreBlogs()}
                    refreshControl={
                        <RefreshControl
                            refreshing={blogStore.isLoading && blogStore.blogs.length == 0}
                            onRefresh={
                                () => blogStore.getBlog(params.kind, 1, this.tag)
                            }
                        />
                    }
                    renderItem={({ item }) =>
                        <ListBlog item={item} navigation={this.props.navigation} kind={params.kind} />
                    }
                    ListFooterComponent={
                        this.loadMore()
                    }
                />
            )
        }
        if (blogStore.blogs.length == 0 && blogStore.isLoading == false && blogStore.error == false) {
            return (
                <TextNullData text={NULL_DATA} />
            )
        }
    }
    scrollListBlog() {
        this.refs.listBlog.scrollToOffset({ x: 0, y: 0, animated: true })
    }
    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={params.title ? params.title : STRINGS.NEWS_TITLE_HEADER} navigate={navigate} />
                {
                    blogStore.top_tags.length !== 0 ?

                        <ListTag top_tags={blogStore.top_tags} changeTag={this.changeTag} tag={this.tag} />
                        :
                        null
                }
                <View style={{ flex: 1 }}>
                    {this.renderSubject()}
                </View>
            </Container>
        );
    }
}
export default BlogContainer
const wrapperCenter = {
    alignItems: 'center',
    justifyContent: 'center',
};
const textLogo = {
    fontFamily: FONTS.LOGO_FONT,
    backgroundColor: COLORS.NONE_COLOR,
    color: COLORS.LIGHT_COLOR,
}
const buttonTab = {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 13,
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: SIZES.DESCRIPTION_SIZE,
    fontFamily: FONTS.FONT_MAIN,
    color: color.BACKGROUND_COLOR,
};

const styles = StyleSheet.create({
    wrapperContainer: {
        flex: 1,
        backgroundColor: color.BACKGROUND_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonSelected: {
        ...buttonTab,
        backgroundColor: 'black',
        fontFamily: FONTS.FONT_MAIN_BOLD
    },
    buttonNotSelect: {
        ...buttonTab,
        backgroundColor: color.NONE_COLOR,
        color: color.TEXT_COLOR
    },
});