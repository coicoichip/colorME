import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Image, Platform, Text, View, StatusBar, TouchableOpacity, ScrollView, FlatList, Linking, KeyboardAvoidingView, ActivityIndicator, } from 'react-native';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Input,
    Item,
    Left,
    List,
    ListItem,
    Right,
    Spinner,
    Thumbnail,
} from 'native-base';
import BackButton from '../../commons/BackButton';
import Loading from '../../commons/Loading';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import WebViewAutoHeight from '../../commons/WebViewAutoHeight';
import styles from '../../styles/styles';
import * as size from '../../styles/sizes';
import { formatImageLink } from "../../helper/index"
import blogStore from "./blogStore";
import TextInputContainer from "../comment/TextInputContainer"
import { ButtonCommon } from "../../commons/Button"
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import IconDefault from '../../commons/IconDefault';
import CommentContainer from "../comment/CommentContainer";
import commentStore from "../comment/commentStore";
import { observer } from "mobx-react"
import HeaderDetailContainer from "./HeaderDetailContainer";
@observer
class DetailBlogContainer extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        blogStore.getDetailBlog(params.slug);
        commentStore.getComment(params.id, getProfileStore.updateUser.name);
        commentStore.getInfoPost(params.id, getProfileStore.updateUser.name);
    }
   
    // getContent(content){
    //   const {params} = this.props.navigation.state;
    //   if(params.kind == "resource") {
    //   let str = "[[share_to_download]]"
    //    let end  = content.indexOf(str);
    //    return content.slice(0, end)
    //   }
    // }
    
    convertComment(comments) {
        let parrent = comments.filter(item => item.parent_id == 0);
        let children = comments.filter(item => item.parent_id !== 0);
        return parrent.map((item) => {
            return {
                id: item.id,
                comments_related: [item].concat(children.filter(post => post.parent_id == item.id))
            }
        })
    }
    scrollToItem() {
        this.flatList.scrollToEnd(); 
    }

    
    render() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        const { detailBlog, isLoadingDetail } = blogStore;
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
                <FlatList
                    ref={(ref) => this.flatList = ref}
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={this.convertComment(commentStore.comments)}
                    renderItem={() => { }}
                    ListHeaderComponent={() => {
                        return (
                            <HeaderDetailContainer params = {params}/>
                        )
                    }}
                    
                    renderItem={({item, index}) => 
                     <CommentContainer items = {item} index = {index}/>
                }
                />
                <TextInputContainer id={params.id} scrollToItem = {this.scrollToItem.bind(this)} />

            </Container>
        );
    }
}

const part = StyleSheet.create({
    wrapperContainer: {
        padding: 0,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    cardBottomInModal: {
        width: SIZES.DEVICE_WIDTH_SIZE - 10,
        flexDirection: 'row',
        height: 50,
        backgroundColor: COLORS.LIGHT_COLOR,
        bottom: 0,
        borderRadius: 10,
    },
    avatarUserSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    inputTheme01: {
        fontFamily: (Platform.OS === 'ios') ? FONTS.MAIN_FONT : FONTS.MAIN_FONT,
        fontSize: 12,
        lineHeight: 10,
        height: (Platform.OS === 'ios') ? 30 : 40,
        fontWeight: (Platform.OS === 'ios') ? '400' : 'normal',
    },
    paddingTLB: {
        paddingLeft: 5,
        paddingBottom: 5,
        paddingTop: 5,
    },
    cardCmt: {
        flexDirection: 'row',
        paddingRight: 20,
        flex: 1,
    },
    paddingTRB: {
        paddingRight: 5,
        paddingBottom: 5,
        paddingTop: 5,
    },
    titleSmallBlue: {
        fontFamily: (Platform.OS === 'ios') ? FONTS.MAIN_FONT : FONTS.MAIN_FONT,
        fontSize: 14,
        color: 'blue',
        fontWeight: (Platform.OS === 'ios') ? '600' : 'normal',
    },
    textDescriptionDark: {
        color: '#000',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,

    },
    paddingLeft: {
        paddingLeft: 5,
    },
});


export default DetailBlogContainer