import React, { Component } from 'react';
import {
    Text, View, Image, Platform, PanResponder, FlatList, TouchableOpacity, Modal
} from 'react-native';
import {
    Body, CardItem, Header, Container, Button,
    Left, Right, Spinner, Item
} from 'native-base';
import { coursesStore } from './coursesStore';
import { observer } from "mobx-react";
import BackButton from '../../commons/BackButton';
import styles from '../../styles/styles';
import * as size from '../../styles/sizes';
import ListRegisterCourses from './ListRegisterCourses';
import Loading from '../../commons/Loading';
@observer
class LearnRegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            modalRegister: false,
            name: '',
            study_time: '',
            description: '',
            address: '',
            avatar_url: this.props.navigation.state.params.avatar_url,
            isEnrolled: [],
            classes: [],
            status: [],
            key: '',
            isLoading: false
        }
        this.buttonRegister = this.buttonRegister.bind(this)
    }
    isLoading() {
        this.setState({ isLoading: true })
        setTimeout(() => this.setState({ isLoading: false }), 500)
    }

    componentWillMount() {
        this.isLoading()
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
        let classes = [];
        let isEnrolled = [];
        let status = [];
        let i = 0;
        let data = this.props.navigation.state.params.classes;
        console.log(data + '>>>');
        while (i < data.length) {
            let key = { key: i }
            let datas = data.map((data, i) => {
                return ({ ...data, isEnrolled: 0 })
            });
            let arr = Object.assign(datas[i], key);
            let arr1 = datas[i].isEnrolled;
            let arr2 = data[i].status;
            classes.push(arr);
            isEnrolled.push(arr1);
            status.push(arr2);
            i++
        }
        this.setState({ classes: classes, status: status, isEnrolled: isEnrolled });
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.isLoadingLearnRegister !== this.props.isLoadingLearnRegister && !nextProps.isLoadingLearnRegister) {
    //         this.setState({ modalRegister: false })
    //         if (nextProps.statusRegister == 200) {
    //             let isEnrolled = this.state.isEnrolled;
    //             let status = this.state.status;
    //             isEnrolled[this.state.classes.findIndex(item => item.id == nextProps.class_id)] = !isEnrolled[this.state.classes.findIndex(item => item.id == nextProps.class_id)]
    //             status[this.state.classes.findIndex(item => item.id == nextProps.class_id)] = 1;
    //             this.setState({ isEnrolled: isEnrolled, status: status })

    //         }
    //     }
    // }
    _onPanResponderGrant(event, gestureState) {
        if (event.nativeEvent.locationX === event.nativeEvent.pageX) {
            this.setState({
                modalRegister: false,
            });
        }
    }


    setVisibleModalRegister(visible) {
        this.setState({ modalRegister: visible });
    }

    openRegisterModal(item) {
        this.setVisibleModalRegister(true);
        this.setState({
            key: item.key,
            id: item.id,
            name: item.name,
            course: item.course,
            study_time: item.study_time,
            description: item.description,
            // address: item.address,
        })
    }

    learnRegister(id, token, index) {
        this.setState({ modalRegister: false })
        this.setState({isEnrolled : 1})
        coursesStore.learnRegister(id, token);
    }
    buttonRegister(item, status, isEnrolled) {
        switch (status) {
            case 1:
                return (
                    isEnrolled
                        ?
                        <TouchableOpacity
                            style={styles.buttonLeftRegisterGray}>
                            <Text style={styles.titleNormalLight}>Đã đăng ký</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => this.openRegisterModal(item)}
                            style={styles.buttonLeftRegisterMain}>
                            <Text style={styles.titleNormalLight}>Đăng ký</Text>
                        </TouchableOpacity>

                )
            case 0:
                return (
                    isEnrolled
                        ?
                        <TouchableOpacity
                            style={styles.buttonLeftRegisterGray}>
                            <Text style={styles.titleNormalLight}>Đã đăng ký</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.buttonLeftRegisterGray}>
                            <Text style={styles.titleNormalLight}>Đã hết chỗ</Text>
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
        return (
            this.state.isLoading ?
                <Container style={[styles.wrapperContainer, styles.wrapperCenter]}>
                    <Loading />
                </Container>
                :
                <Container style={styles.wrapperContainer}>
                    <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 20 }}>
                        <BackButton goBack={goBack} />
                        <Text style={styles.textHeaderScreen}> Đăng kí học </Text>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.classes}
                        keyExtractor={item => item.id + ''}
                        renderItem={({ item }) =>
                            <ListRegisterCourses item={item}
                                avatar_url={this.state.avatar_url}
                                status={this.state.status[item.id]}
                                buttonRegister={this.buttonRegister}
                                isEnrolled={this.state.isEnrolled[item.id]}
                                navigation={this.props.navigation} />
                        }
                    />
                    <Modal
                        presentationStyle="overFullScreen"
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalRegister}
                    >
                        <View
                            style={[styles.wrapperModalComment]}
                            {...this.panResponder.panHandlers}
                        >
                            <View style={[styles.modalRegister, styles.padding]}>
                                <View style={[styles.padding]}>
                                    <View style={[{flexDirection: 'row'}]}>
                                        <View style={{marginLeft: 10}}>
                                            <Image
                                                style={styles.avatarUserNormal}
                                                source={{ uri: this.state.avatar_url }} />
                                        </View>
                                        <View style={{marginLeft: 10, justifyContent: 'center'}}>
                                            <Text style={styles.titleSmallBlue}>Đăng ký học {this.state.course}</Text>
                                            <Text style={styles.titleSmallDarkGrayBold}>Xác nhận đăng ký</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{marginHorizontal: 10, marginBottom: 15}}>
                                    <Text style={[styles.titleGrayThin, styles.paddingLine]}>Bạn đang tiến hành đăng ký
                                        lớp
                                            <Text
                                            style={styles.titleSmallDarkGrayBold}> {this.state.course} {this.state.name}</Text></Text>
                                    <Text style={[styles.titleGrayThin, styles.paddingLine]}>Thời gian học <Text
                                        style={styles.titleSmallDarkGrayBold}>{this.state.study_time}</Text></Text>
                                    <Text style={[styles.titleGrayThin, styles.paddingLine]}><Text
                                        style={styles.titleSmallDarkGrayBold}>{this.state.description}</Text></Text>
                                    <Text style={[styles.titleGrayThin, styles.paddingLine]}>Tại: <Text
                                        style={styles.titleSmallDarkGrayBold}>{this.state.address}</Text></Text>
                                    <Text style={[styles.titleGrayThin, styles.paddingLine]}>Hãy xác nhận để colorME
                                        giúp
                                            bạn hoàn thành thủ tục nhé</Text>
                                </View>
                                <View style={{
                                    width: size.deviceWidth * 0.9 - 20,
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        rounded
                                        style={styles.buttonRegister}
                                    onPress={() => this.learnRegister(this.state.id, this.props.token, this.state.key)}
                                    >
                                        {(this.props.isLoadingLearnRegister) ? (
                                            <Container style={{
                                                padding: 10,
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <ActivityIndicator
                                                    animated={true}
                                                    // color={color.navTitle}
                                                    color='red'
                                                    style={{
                                                        flex: 1,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        height: 40,
                                                    }}
                                                // size='small'
                                                />
                                            </Container>
                                        ) : (
                                                <Text style={styles.textButton}>Xác nhận</Text>
                                            )
                                        }

                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </Container>
        );
    }
}
export default LearnRegisterContainer;