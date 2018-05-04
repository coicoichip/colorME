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
import TextNullData from '../../commons/TextNullData';
import Header from '../../commons/Header';
import * as text from '../../constants/text';
//import IconDefault from "../../commons/IconDefault"
import * as blogAction from "./blogAction";
import ListBlog from "./listBlog";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import SelectHeader from '../../commons/SelectHeader';

import Loading from '../../commons/Loading';
class BlogContainer extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            blog: "",
            isLoadingState: false,
            isRefresh: false,
        }
    }
    componentWillMount() {
        this.props.blogAction.getListBlog(1, "");
    }
    loadMore() {
        if (this.props.isLoading && this.props.current_page > 1 && this.props.blogs.length > 0)
            return (<Loading />)
        else
            return null
    }
    getMoreBlog() {
        if (this.props.current_page < this.props.total_pages && this.props.isLoading == false) {
            this.props.blogAction.getListBlog(this.props.current_page + 1,this.state.blog)
        }
    }
    refreshList() {
        this.props.blogAction.getListBlog(1, "",  "refresh");
    }
    // search(input) {
    //     this.setState({  blog: input});
    //     if (this.timeOut !== null) {
    //         clearTimeout(this.timeOut);
    //     }
    //     this.timeOut = setTimeout(function () {
    //         this.props.blogAction.getblogRegister(1, this.state.genState,this.state.blog,this.props.token, "search");
    //     }.bind(this), 200)

    // }
    renderBlog(){
        const{isLoading, isRefresh, blogs, errorBlog, isSearch} = this.props;
          if(isLoading && blogs.length == 0 || isSearch){
              return <Loading/>
          }
          if(errorBlog){
              return (
                  <View style = {styles.wrapperCenter}>
                     <Text style ={styles.textDescriptionDark}>Có lỗi xảy ra</Text>
                     <TouchableOpacity
                                    activeOpacity={1}
                                    style={[styles.buttonLogin, styles.shadow]}
                                    onPress={() => {
                                        this.props.blogAction.getListBlog(1, "");
                                    }}
                                >
                                </TouchableOpacity>
                  </View>
              )
          }
          if(blogs.length !== 0){
              return (
                <FlatList
                showsVerticalScrollIndicator={false}
                data={blogs}
                onEndReached={() => this.getMoreBlog()}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefresh}
                        onRefresh={
                            () => this.refreshList()
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
          if(blogs.length == 0 && isLoading == false && errorBlog == false){
              return (
                <TextNullData text={text.NULL_DATA} />
              )
          }
        }




    render() {
        console.log(this.props.isRefresh)
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={text.BLOG_HEADER_TITLE} navigate={navigate} />
                <View style={styles.wrapperContainer}>
                    <View style={{ flex: 1 }}>

                         {this.renderBlog()}

                    </View>
                </View>
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return {
        isSearch : state.blog.isSearch,
        isLoading: state.blog.isLoading,
        isRefresh: state.blog.isLoadingRefresh,
        blogs: state.blog.blogs,
        total_pages: state.blog.total_pages,
        current_page : state.blog.current_page,
        errorBlog : state.blog.errorBlog
    }
}

function mapDispatchToProps(dispatch) {
    return {
        blogAction: bindActionCreators(blogAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer)

