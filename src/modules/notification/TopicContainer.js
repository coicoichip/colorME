import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, Image, TouchableOpacity, Dimensions, Modal, PanResponder, Platform } from "react-native";
import { Container, Button, CardItem, Left, Right } from "native-base";
import { STRINGS, COLORS, SIZES, FONTS } from "../../constants";
import Header from "../../commons/Header";
import { observer } from "mobx-react";
import Loading from "../../commons/Loading";
import IconDefault from '../../commons/IconDefault';
import { notificationStore } from "./notificationStore";
import { formatImageLink } from "../../helper/index";
@observer
class TopicContainer extends React.Component {
    componentWillMount() {
        const { params } = this.props.navigation.state;
        notificationStore.getTopicInNotification(params.id);
    }
    render() {
        const { isLoadingTopic, topicData } = notificationStore;
        let widthDeadlineProgress = isLoadingTopic ? 0 : ((SIZES.DEVICE_WIDTH_SIZE - 20) * topicData.submitted_members / topicData.total_members);
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
                <FlatList
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={[1]}
                    renderItem={() => { }}
                    ListHeaderComponent={() => {
                        return (
                            isLoadingTopic
                                ?
                                <Loading />
                                :

                                <View style={{ flex: 1 }}>
                                    <View activeOpacity={0.8} style={{ marginBottom: 15 }}>
                                        <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>



                                            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                                <Image
                                                    style={{ height: 30, width: 30, borderRadius: 15 }}
                                                    source={topicData.creator ? { uri: formatImageLink(topicData.creator.avatar_url) } : require('../../../assets/image/colorMe.jpg')}
                                                />
                                                <View style={{ marginLeft: 10 }}>
                                                    
                                                    <View style={{flexDirection: 'row'}}>
                                                    <Text style={{ fontFamily: FONTS.MAIN_FONT, fontSize: 12, marginLeft: 5, color: 'gray' }}>Đăng bởi</Text>
                                                        <Text style={{ fontFamily: FONTS.MAIN_FONT_BOLD, fontSize: 12, marginLeft: 5, marginTop: 1}}>{topicData.creator ? topicData.creator.name.trim() : ""}</Text>
                                                    </View>
                                                    <Text style={{ fontFamily: FONTS.MAIN_FONT, fontSize: 12, marginLeft: 5, color: 'gray' }}>{topicData.created_at.trim()}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ marginTop: 20 }}>
                                            <CardItem style={[{ height: 20, justifyContent: 'center' }]}>
                                                <View style={styles.wrapperDeadline}>
                                                    <View
                                                        style={[styles.deadlineProgress, { width: widthDeadlineProgress }]}>
                                                    </View>
                                                </View>
                                            </CardItem>
                                            <CardItem footer style={[styles.cardFooter]}>
                                                <Left>
                                                    <Right>
                                                        <Text style={[styles.describeGray, { right: 0 }]}>
                                                            {
                                                                isLoadingTopic
                                                                    ?
                                                                    ''
                                                                    :
                                                                    `${topicData.deadline} - ${topicData.submitted_members}/${topicData.total_members} đã nộp`
                                                            }

                                                        </Text>
                                                    </Right>
                                                </Left>
                                            </CardItem>

                                        </View>
                                        <View>
                                            <Image
                                                style={{
                                                    width: SIZES.DEVICE_WIDTH_SIZE,
                                                    height: 250,
                                                }}
                                                resizeMode={'cover'}
                                                source={{
                                                    uri: topicData.thumb_url
                                                }} />
                                        </View>
                                    </View>
                                </View>
                        )
                    }}
                />
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