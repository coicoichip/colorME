import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Button, Text, Container, Item, Content, Input, Form } from "native-base";
import styles from "../../styles/styles";
import Loading from '../../commons/Loading';
import { observer } from "mobx-react";
import { InputCommon } from '../../commons';
import { formatImageLink } from "../../helper/index"
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import Avatar from "./upLoadAvatar"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import getProfileStore from "./profileStore";
import { observable } from "mobx";
@observer
class InformationUser extends React.Component {
    render() {
        return (
            <Content style={{marginTop: 10}}>
                <Avatar />
                <KeyboardAwareScrollView
                    style={{ flex: 1, backgroundColor: COLORS.LIGHT_COLOR, marginTop: 30, paddingHorizontal: 20 }}
                    enableOnAndroid={true}
                    scrollEnabled={false}
                    extraHeight={100}
                >
                    <View style={styless.contentForm}>
                        <InputCommon
                            returnKeyType={'next'}
                            size={styless.input}
                            value={getProfileStore.updateUser.name}
                            onChangeText={this.props.onChangeData('name')}
                        />
                        <View style={{ marginTop: 10 }}>
                            <InputCommon
                                returnKeyType={'go'}
                                size={styless.input}
                                value={getProfileStore.updateUser.phone}
                                onChangeText={this.props.onChangeData('phone')}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <InputCommon
                                returnKeyType={'go'}
                                size={styless.input}
                                placeholderTextColor={'rgb(222, 222,222)'}
                                placeholder={"Trường học"}
                                value={getProfileStore.updateUser.university}
                                onChangeText={this.props.onChangeData('university')}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <InputCommon
                                returnKeyType={'go'}
                                size={styless.input}
                                placeholderTextColor={'rgb(222, 222,222)'}
                                placeholder={"Công ty"}
                                value={getProfileStore.updateUser.work}
                                onChangeText={this.props.onChangeData('work')}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <InputCommon
                                returnKeyType={'go'}
                                size={styless.input}
                                placeholderTextColor={'rgb(222, 222,222)'}
                                placeholder={"Ngày sinh"}
                                value={getProfileStore.updateUser.dob}
                                onChangeText={this.props.onChangeData('dob')}
                            />
                        </View>

                        <View />
                    </View>
                    <TouchableOpacity style={[{
                        justifyContent: 'center', marginTop: 20
                    }, styless.buttonRegister]}
                        onPress={() => getProfileStore.updateProfile(getProfileStore.updateUser)}
                    >

                        {getProfileStore.isLoadingUpdate ?
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
                            <Text style={[styles.textDescriptionDark, { fontWeight: 'bold', color: 'white' }]}>Cập nhật</Text>
                        }

                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </Content>
        )
    }

}
export default InformationUser
const wrapperCenter = {
    justifyContent: 'center',
    alignItems: 'center',
  }
  
  const textLogo = {
    fontFamily: FONTS.LOGO_FONT,
    backgroundColor: 'transparent',
    color: COLORS.LIGHT_COLOR,
  }
  
  const text = {
    fontFamily: 'Roboto-Regular',
    backgroundColor: 'transparent',
    color: COLORS.DARK_COLOR,
    fontSize: SIZES.TEXT_BUTTON_SIZE,
  }
  
  const styless = StyleSheet.create({
    textLogoColor: {
      ...textLogo,
      fontSize: SIZES.LOGO_COLOR_SIZE,
    },
    textLogoMe: {
      ...textLogo,
      fontSize: SIZES.LOGO_ME_SIZE,
      marginTop: -40,
    },
    textButton: {
      ...text
    },
    wrapperButton: {
      ...wrapperCenter,
      width: SIZES.DEVICE_WIDTH_SIZE,
      position: 'absolute',
      bottom: SIZES.DEVICE_HEIGHT_SIZE / 4 - 30,
      paddingHorizontal: 80,
    },
    wrapperLogo: {
      ...wrapperCenter,
      flex: 1,
      backgroundColor: COLORS.MAIN_COLOR,
    },
    contentForm: {
      ...wrapperCenter,
      backgroundColor: COLORS.LIGHT_COLOR,
    },
    input: {
      width: SIZES.DEVICE_WIDTH_SIZE - 40,
      height: 35
    },
    buttonRegister: {
      ...wrapperCenter,
      backgroundColor: 'rgb(0, 240, 53)',
      padding: 12,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 3,
  
    },
  
  });