import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    View,
    ActivityIndicator,
    Alert,
    FlatList,
    Platform, StyleSheet
} from 'react-native';
import { CheckBox, Container, Content, Form, Input, Item, Left } from 'native-base';
import Header from '../../commons/Header';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import { formatImageLink } from "../../helper/index";
import UpLoadImage from "../../commons/UploadImage";
import { observer } from "mobx-react";
import {SupportStore} from "./supportStore";
import getProfileStore from "../../modules/profile/profileStore"

@observer
class FeedbackTeacher extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         title: "",
    //         message: "",
    //         email : this.props.user.email ? this.props.user.email : "",
    //         name : this.props.user.name ? this.props.user.name : ""
    //     }
    //     this.handleFileUpload = this.handleFileUpload.bind(this)
    // }
    support(value){
        SupportStore.info.name = getProfileStore.updateUser.name;
        SupportStore.info.email = getProfileStore.updateUser.email;
        if(SupportStore.info.message == "" || SupportStore.info.title == ""){
            Alert.alert("Thông báo", "bạn chưa gửi tiêu đề hoặc nội dung")
        }else{
            SupportStore.support(value);
        }  
    }
    // handleFileUpload (image_urls){
    //     this.props.handleFileUpload(image_urls)
    // }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={STRINGS.FEEDBACK_TEACHER} navigate={navigate} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View>
                            <View style={[styles.wrapperContainer, styles.paddingLeftRight]}>
                                <Text style={styles.textDescriptionDark}>Bạn có thể nhận xét về các giảng viên, trợ giảng của chúng tôi tại đây !</Text>
                                <View style={[styles.cardItem, { flexDirection: 'row', marginTop: 30 },]}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image
                                            style={styles.avatarUserImage}
                                            source={{ uri: getProfileStore.updateUser.avatar_url ? getProfileStore.updateUser.avatar_url : "" }}
                                        />
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
                                        <Text style={[styles.textDescriptionDark]}>{getProfileStore.updateUser.name ? getProfileStore.updateUser.name : null}</Text>
                                        <Text style={{ height: 3 }} />
                                        <Text style={[styles.textDescriptionGray]}>{getProfileStore.updateUser.email ? getProfileStore.updateUser.email : null}</Text>
                                        <Text style={{ height: 5 }} />
                                        <Text style={[styles.textNumberPhone]}>{getProfileStore.updateUser.phone ? getProfileStore.updateUser.phone : null}</Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: 30, marginLeft: -5 }}>
                                    <Item style={[styles.itemInput]}>
                                        <Input
                                            style={[styles.inputTheme02, styles.textDescriptionCard, { fontSize: 13 }]}
                                            underlineColorAndroid={"transparent"}
                                            placeholder="Tiêu đề"
                                            returnKeyType={'next'}
                                            autoCorrect={false}
                                            onChangeText={(title) => {
                                                SupportStore.info.title = title;
                                            }}
                                        />
                                    </Item>

                                    <Item style={[styles.itemInput, { marginTop: 20, height: 100 }]} regular>
                                        <Input
                                            style={[styles.inputTheme02, styles.textDescriptionCard, { fontSize: 13 }]}
                                            underlineColorAndroid={"transparent"}
                                            placeholder="Nôi dung"
                                            returnKeyType={'next'}
                                            autoCorrect={false}
                                            onChangeText={(message) => {
                                                SupportStore.info.message = message;
                                            }}
                                        />
                                    </Item>
                                </View>
                            </View>

                            {/* <UpLoadImage image_urls={this.props.image_urls} token={this.props.token} handleFileUpload={this.handleFileUpload} /> */}
                            <View style={[styles.wrapperButtonBottom, { marginTop: 20 }]}>
                                <TouchableOpacity style={[styles.buttonBottom]}
                                    onPress={() => {
                                        this.support(SupportStore.info)
                                    }}
                                >
                                    {(SupportStore.isLoading) ? (
                                        <ActivityIndicator
                                            animated={true}
                                            color={"#FFF"}
                                            size='small'
                                        />
                                    ) : (
                                            <Text style={styles.textDescriptionLight}>GỬI</Text>
                                        )
                                    }

                                </TouchableOpacity>
                            </View>
                        </View>
                    } />
            </Container>
        );
    }
}
export default FeedbackTeacher

const wrapperCenter = {
    justifyContent: 'center',
    alignItems: 'center',
}
const text = {
    fontFamily: 'Roboto-Regular',
    backgroundColor: 'transparent',
    color: COLORS.DARK_COLOR,
    fontSize: SIZES.TEXT_BUTTON_SIZE,
}
const styles = StyleSheet.create({
    wrapperContainer: {
        flex: 1,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    textDescriptionDark: {
        color: '#000',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,

    },
    cardItem: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
    },
    avatarUserImage: {
        height: 32,
        width: 32,
        borderRadius: 16,
    },
    itemInput: {
        width: SIZES.DEVICE_WIDTH_SIZE * 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textDescriptionGray: {
        color: '#8c8c8c',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,
    },
    textNumberPhone: {
        color: "#498fff",
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,
    },
    wrapperButtonBottom: {
        width: SIZES.DEVICE_WIDTH_SIZE,
        marginTop: 20,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBottom: {
        ...wrapperCenter,
        borderRadius: 5,
        width: SIZES.DEVICE_WIDTH_SIZE * 0.9,
        padding: 10,
        backgroundColor: COLORS.MAIN_COLOR,
    },
    textDescriptionLight: {
        color: '#FFF',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 14,
    },
});