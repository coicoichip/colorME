import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    StyleSheet
} from 'react-native';
import * as color from '../../styles/colors';
import * as size from '../../styles/sizes';
import { Container } from 'native-base';
import Header from '../../commons/Header';
import { STRINGS, COLORS, SIZES, FONTS } from "../../constants";
import Loading from '../../commons/Loading';
import  resourceStrore  from './resourceStrore';
import { observer } from "mobx-react";
import {observable} from "mobx"
import ListBlog from "./ListBlog";
import Error from '../../commons/Error';
import TextNullData from '../../commons/TextNullData';
import ListTag from "./ListTag";

@observer
class ResourceContainer extends Component {
    @observable tag = ""
    constructor() {
        super();
        this.changeTag = this.changeTag.bind(this)
    }
    UNSAFE_componentWillMount() {
        const {params} = this.props.navigation.state;
        resourceStrore.getBlog(params.kind, 1, this.tag);
    }
    getMoreBlogs() {
        const {params} = this.props.navigation.state;
        if (resourceStrore.current_page < resourceStrore.total_pages && resourceStrore.isLoading == false) {
            resourceStrore.getBlog(params.kind,resourceStrore.current_page + 1, this.tag)
        }
    }
    loadMore() {
        if (resourceStrore.isLoading && resourceStrore.current_page >= 1)
            return (<Loading />)
        else
            return null
    }
    changeTag(item){
        this.tag = item.tag;
        const {params} = this.props.navigation.state;
        setTimeout(() => resourceStrore.getBlog(params.kind,1, this.tag, "search"), 200)
    }
    renderSubject() {
        const {params} = this.props.navigation.state;
        if (resourceStrore.resources.length == 0|| resourceStrore.isSearch) {
            return <Loading />
        }
        if (resourceStrore.error) {
            return (
                <Error onPress={() => this.UNSAFE_componentWillMount()} />
            )
        }
        if (resourceStrore.resources.length !== 0) {
            return (
                <FlatList
                    ref = {'listBlog'}
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={resourceStrore.resources}
                    onEndReached={() => this.getMoreBlogs()}
                    refreshControl={
                        <RefreshControl
                            refreshing={resourceStrore.isLoading && resourceStrore.resources.length == 0}
                            onRefresh={
                                () => this.UNSAFE_componentWillMount()
                            }
                        />
                    }
                    ListHeaderComponent={
                        <ListTag top_tags = {resourceStrore.top_tags} changeTag = {this.changeTag} tag = {this.tag}/>
                    }
                    renderItem={({ item }) =>
                        <ListBlog item={item} navigation={this.props.navigation} kind = {params.kind}/>
                    }
                    ListFooterComponent={
                        this.loadMore()
                    }
                />
            )
        }
        if (resourceStrore.resources.length == 0 && resourceStrore.isLoading == false && resourceStrore.error == false) {
            return (
                <TextNullData text={NULL_DATA} />
            )
        }
    }
    scrollListBlog(){
        this.refs.listBlog.scrollToOffset({x: 0, y: 0, animated: true})
    }
    render() {
        const { navigate } = this.props.navigation;
        const { params} =this.props.navigation.state;
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={params.title ? params.title : STRINGS.NEWS_TITLE_HEADER} navigate={navigate} />
                <View style={{ flex: 1}}>
                    {this.renderSubject()}
                </View>
            </Container>
        );
    }
}
export default ResourceContainer
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