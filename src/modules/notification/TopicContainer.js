import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, Image, TouchableOpacity, Dimensions, Modal, PanResponder, Platform } from "react-native";
import { Container, Button, CardItem, Left, Right, Content } from "native-base";
import { STRINGS, COLORS, SIZES, FONTS } from "../../constants";
import Header from "../../commons/Header";
import { observer } from "mobx-react";
import Loading from "../../commons/Loading";
import IconDefault from '../../commons/IconDefault';
import { notificationStore } from "./notificationStore";
import { formatImageLink, editName } from "../../helper/index";
import Error from "../../commons/Error";
import TextNullData from "../../commons/TextNullData";
import ListProductGroup from "./listItem/ListProductGroup";
@observer
class TopicContainer extends React.Component {
    componentWillMount() {
        const { params } = this.props.navigation.state;
        notificationStore.getTopicInNotification(params.id);
        notificationStore.getProductsInTopic(params.id, 1);
    }
    getMoreProducts() {
        const { params } = this.props.navigation.state;
        if (notificationStore.current_page_group < notificationStore.total_pages_group && notificationStore.isLoadingProducts == false) {
            notificationStore.getProductsInTopic(notificationStore.current_page_group + 1, params.id)
        }
    }
    loadMore() {
        if (notificationStore.isLoadingProducts && notificationStore.current_page_group >= 1)
            return (<Loading />)
        else
            return null
    }
    renderProducts() {
        const { isLoadingTopic, isLoadingProducts, groupProducts, topicData, errorTopic } = notificationStore;
        const { navigate } = this.props.navigation;
        if (isLoadingProducts && groupProducts.length == 0 || isLoadingTopic) {
            return <Loading />
        } else {
            if (errorTopic) return <Error onPress={() => this.componentWillMount()} />
            return (
                <Content style={{ backgroundColor: COLORS.BACKGROUND_GRAY }} showsVerticalScrollIndicator = {false}>
                    <View style={{}}>
                        <Text style = {{fontSize : 12, fontFamily : FONTS.MAIN_FONT, marginLeft : 20, paddingTop : 10}}>{"Số người đã nộp : "}
                           <Text style = {{fontSize : 12, fontFamily : FONTS.MAIN_FONT_BOLD}}>{topicData.submitted_members + "/" + topicData.total_members}</Text>
                        </Text>
                        <FlatList
                            horizontal={true}
                            style = {{marginTop : 10}}
                            showsHorizontalScrollIndicator={false}
                            data={groupProducts}
                            onEndReached={() => this.getMoreProducts()}
                            onEndReachedThreshold={0.2}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={[{ marginLeft: 10, justifyContent: "center", alignItems: "center" }]} onPress={() =>  navigate("DetailBlog", {id : item.id})}>
                                    <Image style={styles.avatarUser} source={{ uri: item.author ? formatImageLink(item.author.avatar_url) : "" }} />
                                    <Text style={{ fontSize: 10 }}>{item.author ? editName(item.author.name.trim()) : ""}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 15 }}
                        >
                            <View >
                                <Image source={{ uri: topicData.thumb_url ? formatImageLink(topicData.thumb_url) : "" }} style={styles.imageAvatarModuleEmails} />
                            </View>
                            <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                                <Text numberOfLines={2} style={styles.emailNameModuleEmail}>{topicData.title.trim()}</Text>
                                <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 20, width: 20, borderRadius: 10 }}
                                        source={{ uri: topicData.creator.avatar_url ? formatImageLink(topicData.creator.avatar_url) : "" }}
                                    />
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginLeft: 5 }}>{topicData.creator.name.trim()}</Text>
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginLeft: 5, color: 'gray' }}>{topicData.created_at.trim()}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* <View style={styles.footerCard}>
                        </View> */}
                        <Text style={{ marginLeft: 20, fontSize: 12, fontFamily: FONTS.MAIN_FONT }}>{"Danh sách đã nộp "}</Text>
                        
                        <FlatList
                            style = {{marginTop : 15, flex : 1}}
                            showsHorizontalScrollIndicator = {false}
                            horizontal={true}
                            data={groupProducts}
                            onEndReached={() => this.getMoreProducts()}
                            onEndReachedThreshold={0.2}
                            renderItem={({item}) => 
                                <ListProductGroup item = {item} navigate = {navigate} />
                            }

                        />

                   
                     
                    </View>
                </Content>
            )
        }
    }
    render() {
        const { isLoadingTopic, topicData, groupProducts } = notificationStore;
        return (
            <Container style={styles.wrapperContainer}>
                <View style={[styles.wrapperHeader, styles.paddingLeftRight, { flexDirection: 'row' }]}>
                    <TouchableOpacity style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={[styles.textHeaderScreen, { fontSize: 20 }]} >{topicData.title}</Text>
                    </TouchableOpacity>
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
                {this.renderProducts()}



            </Container>
        )
    }
}
export default TopicContainer;
const isIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
    wrapperCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperContainer: {
        flex: 1,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    // coppy blog
    imageAvatarModuleEmails: {
        width: SIZES.DEVICE_WIDTH_SIZE + 2,
        height: SIZES.DEVICE_HEIGHT_SIZE / 3.3,
    },

    contentCardImageInformation: {
        flex: 2,
        position: 'relative',
        paddingRight: 10,
        paddingTop: 5,
    },
    emailNameModuleEmail: {
        fontSize: 20,
        paddingTop: 10,
    },
    footerCard: {
        height: 25,
        backgroundColor: 'rgb(240, 240, 240)'
    },

    wrapperHeader: {
        height: isIOS ? 80 : 60,
        paddingTop: isIOS ? 20 : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    textHeaderScreen: {
        color: COLORS.DARK_COLOR,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 25,
    },
    contentCardImageInformation: {
        paddingRight: 10,
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    wrapperDeadline: {
        marginLeft: 3,
        width: SIZES.DEVICE_WIDTH_SIZE - 30,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#dbdee0',
    },
    avatarUser: {
        borderColor : "rgb(240, 240, 240)", 
        borderWidth : 1,
        height: 50,
        width: 50,
        borderRadius: 25
    },
    deadlineProgress: {
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgb(41, 173, 5)',
    },
    cardFooter: {
        paddingTop: 0,
        paddingBottom: 10,
        // borderBottomWidth: 0.5,
        borderColor: COLORS.ICON,
    },
    describeGray: {
        fontFamily: FONTS.MAIN_FONT,
        fontSize: SIZES.DESCRIPTION_SIZE,
        color: COLORS.GRAY_COLOR,
        fontWeight: (Platform.OS === 'ios') ? '400' : 'normal',

    },

});