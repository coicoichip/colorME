import React, { Component } from 'react';
import {
    ActivityIndicator, Text, View, Image, Platform, PanResponder, FlatList, TouchableOpacity, Modal, StyleSheet
} from 'react-native';
import {
    Container
} from 'native-base';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import { coursesStore } from './coursesStore';
import { observer } from "mobx-react";
import { ButtonCommon } from '../../commons';
import * as size from '../../styles/sizes';
import * as color from '../../styles/colors';
import Icon from '../../commons/Icon';
import IconDefault from '../../commons/IconDefault';
import ListRegisterCourses from './ListRegisterCourses';
import Loading from '../../commons/Loading';
import { observable } from 'mobx';
import SelectBase, { returnBase } from "./SelectBase";
import { drawerStore } from "../drawer/drawerStore";
import Analytics from 'appcenter-analytics';

@observer
class LearnRegisterContainer extends Component {
    @observable base_id = ""
    constructor(props) {
        super(props); 
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
        this.state = {
            base_id: "",
        }
    }
    componentDidMount() {
        const { params } = this.props.navigation.state;
        coursesStore.getCourseInformation(params.linkId, "");
        drawerStore.getProfile();
    }
    _onPanResponderGrant(event, gestureState) {
        if (event.nativeEvent.locationX === event.nativeEvent.pageX) {
            coursesStore.modalRegister = false;
            coursesStore.modalRegister1 = false;
        }
    }

    learnRegister(id) {
        coursesStore.learnRegister(id);
    }
    async pickBase() {
        const { params } = this.props.navigation.state;
        await returnBase(base_value => { this.base_id = base_value; console.log(base_value) });
        coursesStore.getCourseInformation(params.linkId, this.base_id)
    }
    scrollListRegisterCourses() {
        this.refs.listRegisterCourses.scrollToOffset({ x: 0, y: 0, animated: true })
    }
    buttonRegister(item, status) {
        let classes = coursesStore.classes;
        switch (status) {
            case 1:
                return (
                    item.isEnroll || coursesStore.courses.isEnroll[item.id]
                        ?
                        <TouchableOpacity style={{ justifyContent: 'center' }}>
                            <View style={{
                                justifyContent: 'center', alignItems: 'flex-start'
                            }}>
                                <Text style={[styles.textDescriptionDark, styles.noButtonRegister]}>Đã đăng kí</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ justifyContent: 'center' }}
                            onPress={() => {
                                coursesStore.modalRegister = true;
                                coursesStore.courses.name = item.name;
                                coursesStore.courses.studyTime = item.study_time;
                                coursesStore.courses.dateStart = item.date_start;
                                coursesStore.courses.icon = item.icon_url;
                                coursesStore.courses.id = item.id;
                            }}>
                            <View style={{
                                justifyContent: 'center', alignItems: 'flex-start'
                            }}>
                                <Text style={[styles.textDescriptionDark, styles.buttonRegister]}>Đăng kí ngay</Text>
                            </View>
                        </TouchableOpacity>

                )
            case 0:
                return (
                    item.isEnroll
                        ?
                        <TouchableOpacity style={{ justifyContent: 'center' }}>
                            <View style={{
                                justifyContent: 'center', alignItems: 'flex-start'
                            }}>
                                <Text style={[styles.textDescriptionDark, styles.noButtonRegister]}>Đẵ đăng kí</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ justifyContent: 'center' }}>
                            <View style={{
                                justifyContent: 'center', alignItems: 'flex-start'
                            }}>
                                <Text style={[styles.textDescriptionDark, styles.noButtonRegister]}>Hết chỗ</Text>
                            </View>
                        </TouchableOpacity>
                )
            default: return (<TouchableOpacity
                style={styles.buttonLeftRegisterGray}>
                <Text style={styles.titleNormalLight}>Đã hết chỗ</Text>
            </TouchableOpacity>)
        }
    }
    render() {
        const { goBack, navigate } = this.props.navigation;
        const { courses } = coursesStore;
        return (
            <Container style={styles.wrapperContainer}>
                <View>
                    <View style={[styles.wrapperHeader, styles.paddingLeftRight, { flexDirection: 'row' }]}>
                        <TouchableOpacity style={{ flex: 8, justifyContent: 'center' }} onPress= {() => this.scrollListRegisterCourses()}>
                            <Text style={[styles.textHeaderScreen, { fontSize: 20 }]} >Đăng kí học {coursesStore.courseName}</Text>
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

                </View>
                <SelectBase haveBase functionBase={() => this.pickBase()} />
                {coursesStore.isLoadingCoursesInformation ?
                    <Container style={[styles.wrapperContainer, styles.wrapperCenter]}>
                        <Loading />
                    </Container>
                    :
                    <FlatList
                        ref={'listRegisterCourses'}
                        showsVerticalScrollIndicator={false}
                        data={coursesStore.classes}
                        keyExtractor={item => item.id + ''}
                        renderItem={({ item }) =>
                            <ListRegisterCourses item={item}
                                avatar_url={coursesStore.courseInformation.icon_url}
                                buttonRegister={this.buttonRegister}
                                base_id={this.base_id}
                                navigation={this.props.navigation} />
                        }
                    />}
                <Modal
                    presentationStyle="overFullScreen"
                    animationType="fade"
                    transparent={true}
                    visible={coursesStore.modalRegister}
                >
                    <View
                        style={[styles.wrapperModalComment]}
                        {...this.panResponder.panHandlers}
                    >
                        <View style={[styles.modalRegister]}>
                            <View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, marginTop: 20 }}>
                                        Đăng kí khoá học
                                    </Text>
                                </View>
                                <View style={{ marginTop: 25 }}>
                                    <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 20, marginRight: 20, justifyContent: 'center' }}>
                                        <View style={[styles.paddingLeftRight]}>
                                            <View style={[styles.wrapperCenter, { flexDirection: 'row', marginRight: -20 }]}>
                                                <Image
                                                    style={[styles.avatarUserNormals, styles.marginRightFar, { marginRight: 20 }]}
                                                    source={{ uri: drawerStore.user.avatar_url }} />
                                                <Image
                                                    style={[styles.avatarUserNormals, styles.marginRightFar]}
                                                    source={{ uri: courses.icon }} />
                                            </View>
                                            <View style={{ marginRight: 20, marginTop: 25, marginBottom: 15, flexDirection: 'row' }}>
                                                <Text>Chào</Text>
                                                <Text style={{ fontWeight: 'bold', marginLeft: 6 }}>{drawerStore.user.name}</Text>
                                            </View>
                                            <Text style={[styles.textDescriptionDark]}>Bạn đang chuẩn bị đăng kí học Lớp {courses.name}</Text>
                                            <Text style={{ height: 5 }}></Text>
                                            <Text style={styles.textDescriptionDark}>Thông tin về lớp học như sau :</Text>
                                            <Text style={{ height: 20 }}></Text>
                                            <Text style={styles.textDescriptionDark}>thời gian : {courses.studyTime}</Text>
                                            <Text style={{ height: 3 }}></Text>
                                            <Text numberOfLines={2} style={styles.textDescriptionDark}>Cơ sở 1 - số 175 chùa Láng - Đống Đa - Hà Nội</Text>
                                            <Text style={{ height: 3 }}></Text>
                                            <Text style={styles.textDescriptionDark}>Khai giảng ngày : {courses.dateStart}</Text>
                                            <Text style={{ height: 20 }}></Text>
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                onPress={() => coursesStore.isLoadingLearnRegister ? {} : onPress()}
                                                full
                                                warning
                                                style={[{ justifyContent: 'center', marginBottom: 10, marginRight: -20, height: 32 }, styles.buttonRegisters, styles.wrapperCenter]}
                                                onPress={() =>
                                                    coursesStore.learnRegister(coursesStore.courses.id)
                                                }>
                                                {
                                                    coursesStore.isLoadingLearnRegister
                                                        ?
                                                        <ActivityIndicator
                                                            animated={true}
                                                            color={COLORS.LIGHT_COLOR}
                                                            style={{
                                                                flex: 1,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                            }}
                                                            size='small'
                                                        />
                                                        :
                                                        <Text style={styles.textDescriptionWhite}>XÁC NHẬN</Text>
                                                }
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    presentationStyle="overFullScreen"
                    animationType="fade"
                    transparent={true}
                    visible={coursesStore.modalRegister1}
                >
                    <View
                        style={[styles.wrapperModalComment]}
                        {...this.panResponder.panHandlers}
                    >
                        <View style={[styles.modalRegister]}>
                            <View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, marginTop: 20 }}>
                                        Đăng kí thành công
                                    </Text>
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 20, marginRight: 20, justifyContent: 'center' }}>
                                        <View style={[styles.paddingLeftRight]}>
                                            <View style={[styles.wrapperCenter, { flexDirection: 'row', marginRight: -20 }]}>
                                                <IconDefault
                                                    name={'MaterialIcons|check-circle'}
                                                    size={50}
                                                    color={COLORS.GREEN}
                                                />
                                            </View>
                                            <View style={{ marginRight: 20, marginTop: 15, marginBottom: 15, flexDirection: 'row' }}>
                                                <Text>Chào</Text>
                                                <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{drawerStore.user.name}</Text>
                                            </View>
                                            <Text style={[styles.textDescriptionDark]}>Bạn vừa đăng kí thành công Lớp {courses.name}</Text>
                                            <Text style={{ height: 20 }}></Text>
                                            <Text style={[styles.textDescriptionDark]}>ColorME sẽ nhanh chóng gọi lại cho bạn để hướng dẫn thủ tục
                                                hoàn thành học phí và giải đáp các thắc mắc của bạn</Text>
                                            <Text style={{ height: 20 }}></Text>
                                            <Text style={styles.textDescriptionDark}>Cảm ơn bạn đã tin tưởng và lựa chon colorME</Text>
                                            <Text style={{ height: 20 }}></Text>
                                            <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: 'center', marginBottom: 10, marginRight: -20 }}
                                                onPress={() => { coursesStore.modalRegister1 = false }}>
                                                <View style={{
                                                    justifyContent: 'center'
                                                }}>
                                                    <View style={[styles.buttonRegister, styles.wrapperCenter, { borderRadius: 13 }]}>
                                                        <Text style={[styles.textDescriptionWhite]}>QUAY LẠI</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Container>
        );
    }
}
export default LearnRegisterContainer;
const isIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
    wrapperCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperContainer: {
        flex: 1,
        backgroundColor: color.BACKGROUND_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    avatarUserNormal: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    marginRightFar: {
        marginRight: 10,
    },
    textDescriptionDark: {
        color: '#000',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,

    },
    noButtonRegister: {
        backgroundColor: 'rgb(214, 214, 214)',
        padding: 7,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 3,
        overflow: "hidden", color: 'white'

    },
    buttonRegister: {
        backgroundColor: COLORS.GREEN,
        padding: 7,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 3,
        overflow: "hidden", color: 'white'

    },
    buttonLeftRegisterGray: {
        borderRadius: 100,
        marginTop: 5,
        backgroundColor: 'rgb(214, 214, 214)',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,

    },
    titleNormalLight: {
        fontFamily: (Platform.OS === 'ios') ? 'Roboto' : 'Roboto-Medium',
        fontSize: 11,
        color: color.BACKGROUND_COLOR,
        fontWeight: (Platform.OS === 'ios') ? '500' : 'normal',
    },
    wrapperHeader: {
        height: isIOS ? 80 : 60,
        paddingTop: isIOS ? 20 : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.BACKGROUND_COLOR,
    },
    textHeaderScreen: {
        color: color.TEXT_COLOR,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 25,
    },
    modalRegister: {
        borderRadius: 20,
        width: size.deviceWidth * 0.9,
        backgroundColor: color.BACKGROUND_COLOR,
    },
    avatarUserNormals: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
    },
    buttonRegisters: {
        backgroundColor: COLORS.GREEN,
        borderRadius: 20,
        overflow: "hidden", color: 'white'

    },
    textDescriptionWhite: {
        color: '#fff',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,
    },
    wrapperModalComment: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});