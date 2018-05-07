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
import ListBlog from "./ListBlog";
import Error from '../../commons/Error';
import TextNullData from '../../commons/TextNullData';
@observer
class BlogContainer extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentWillMount() {
        blogStore.getBlog(1);
    }
    getMoreBlogs() {
        if (blogStore.current_page < blogStore.total_pages && blogStore.isLoading == false) {
            blogStore.getBlog(blogStore.current_page + 1)
        }
    }
    loadMore() {
        if (blogStore.isLoading && blogStore.current_page >= 1)
            return (<Loading />)
        else
            return null
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
                            refreshing={blogStore.isLoading}
                            onRefresh={
                                () => this.componentWillMount()
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
        if (coursesStore.subjects.length == 0 && coursesStore.isLoading == false && coursesStore.errorSubject == false) {
            return (
                <TextNullData text={NULL_DATA} />
            )
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={STRINGS.COURSE_TITLE_HEADER} navigate={navigate} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {this.renderSubject()}
                </View>
            </Container>
        );
    }
}
export default BlogContainer