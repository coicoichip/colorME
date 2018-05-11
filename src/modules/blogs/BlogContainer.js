import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl
} from 'react-native';
import styles from '../../styles/styles';
import { Container } from 'native-base';
import Header from '../../commons/Header';
import { STRINGS } from "../../constants";
import loginStore  from "../login/loginStore"
import Loading from '../../commons/Loading';
import  blogStore  from './blogStore';
import { observer } from "mobx-react";
import {observable} from "mobx"
import ListBlog from "./ListBlog";
import Error from '../../commons/Error';
import TextNullData from '../../commons/TextNullData';
import ListTag from "./ListTag";
@observer
class BlogContainer extends Component {
    @observable tag = "design"
    constructor() {
        super();
        this.changeTag = this.changeTag.bind(this)
    }
    UNSAFE_componentWillMount() {
        blogStore.getBlog(1, this.tag);
    }
    getMoreBlogs() {
        if (blogStore.current_page < blogStore.total_pages && blogStore.isLoading == false) {
            blogStore.getBlog(blogStore.current_page + 1, this.tag)
        }
    }
    loadMore() {
        if (blogStore.isLoading && blogStore.current_page >= 1)
            return (<Loading />)
        else
            return null
    }
    changeTag(item){
        this.tag = item.tag;
        setTimeout(() => blogStore.getBlog(1, this.tag, "search"), 200)
        console.log("aaaa");
    }
    renderSubject() {
        if (blogStore.blogs.length == 0|| blogStore.isSearch) {
            return <Loading />
        }
        if (blogStore.error) {
            return (
                <Error onPress={() => this.componentWillMount()} />
            )
        }
        if (blogStore.blogs.length !== 0) {
            return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={blogStore.blogs}
                    onEndReached={() => this.getMoreBlogs()}
                    refreshControl={
                        <RefreshControl
                            refreshing={blogStore.isLoading && blogStore.blogs.length == 0}
                            onRefresh={
                                () => this.UNSAFE_componentWillMount()
                            }
                        />
                    }
                    ListFooterComponent={
                        this.loadMore()
                    }
                    renderItem={({ item }) =>
                        <ListBlog item={item} navigation={this.props.navigation} />
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
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={STRINGS.NEWS_TITLE_HEADER} navigate={navigate} />
                    <ListTag  top_tags = {blogStore.top_tags} changeTag = {this.changeTag} tag = {this.tag}/>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {this.renderSubject()}
                </View>
            </Container>
        );
    }
}
export default BlogContainer