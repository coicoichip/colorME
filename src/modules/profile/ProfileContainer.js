import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Button, Text, Container, Item, Content, Input, Form } from "native-base";
import Header from "../../commons/Header";
import styles from "../../styles/styles";
import Loading from '../../commons/Loading';
import { observer } from "mobx-react";
import getProfileStore from "./profileStore";
import { InputCommon } from '../../commons';
import { formatImageLink } from "../../helper/index"
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
@observer
class ProfileContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      category: 0,
      categogyArr: [
        { title: "Tiến độ", index: 0 },
        { title: "Thông tin", index: 1 },
        { title: "Điểm danh", index: 2 },
      ]
    }
  }
  componentWillMount() {
    getProfileStore.getProfile();

  }
  onChangeData = field => value => {
    getProfileStore.user[field] = value;
  };
  chooseCategory(index) {
    this.setState({ category: index })
    if (index === 0) {
      this.setState({ isLoading: true })
      setTimeout(() => this.setState({ isLoading: false }), 500)
      // coursesStore.data = coursesStore.subjects.filter(e =>
      //   e.categories[0].id === 1
      // )
    }
    if (index === 1) {
      this.setState({ isLoading: true })
      setTimeout(() => this.setState({ isLoading: false }), 500)
    }
    else {
      this.setState({ isLoading: true })
      setTimeout(() => this.setState({ isLoading: false }), 500)
      // coursesStore.data = coursesStore.subjects.filter(e =>
      //   e.categories[0].id === 2
      // )
    }
  }
  __renderCategory = () => {
    return (
      <View height={40} >
        <Content
          horizontal={true}
          style={[styles.paddingLeftRight]}>
          {
            this.state.categogyArr.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.9}
                  onPress={() => this.chooseCategory(item.index)}
                >
                  <View style={{ marginRight: 10 }}>
                    <Text style={this.state.category == item.index ? styles.buttonSelected : styles.buttonNotSelect}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </Content>
      </View>
    )
  }
  renderProfile() {
    const { user } = getProfileStore;
    return (
      <Content>
        <View style={{ flex: 1, marginTop: 10 }}>
          <TouchableOpacity style={{ alignItems: 'center' }} activeOpacity={0.8}>
            <View >
              <Image source={{ uri: formatImageLink(getProfileStore.user.avatar_url) }} style={{ width: 90, height: 90, borderRadius: 45 }} />
            </View>
            <Text style={{ marginTop: 15, fontSize: 13 }}>Thay đổi ảnh đại diện </Text>
          </TouchableOpacity>
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
                value={getProfileStore.user.name}
                onChangeText={this.onChangeData('name')}
              />
              <View style={{ marginTop: 10 }}>
                <InputCommon
                  returnKeyType={'go'}
                  size={styless.input}
                  value={getProfileStore.user.phone}
                  onChangeText={this.onChangeData('phone')}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <InputCommon
                  returnKeyType={'go'}
                  size={styless.input}
                  placeholderTextColor={'rgb(222, 222,222)'}
                  placeholder={"Trường học"}
                  value={""}
                  onChangeText={this.onChangeData('phone')}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <InputCommon
                  returnKeyType={'go'}
                  size={styless.input}
                  placeholderTextColor={'rgb(222, 222,222)'}
                  placeholder={"Công ty"}
                  value={""}
                  onChangeText={this.onChangeData('phone')}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <InputCommon
                  returnKeyType={'go'}
                  size={styless.input}
                  placeholderTextColor={'rgb(222, 222,222)'}
                  placeholder={"Công ty"}
                  value={""}
                  onChangeText={this.onChangeData('phone')}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <InputCommon
                  returnKeyType={'go'}
                  size={styless.input}
                  placeholderTextColor={'rgb(222, 222,222)'}
                  placeholder={"Ngày sinh"}
                  value={""}
                  onChangeText={this.onChangeData('phone')}
                />
              </View>

              <View />
            </View>
            <View style={[{
              justifyContent: 'center', marginTop: 20
            }, styless.buttonRegister]}>
              <Text style={[styles.textDescriptionDark, {fontWeight: 'bold', color:'white'}]}>Cập nhật</Text>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Content>
    )

  }
  render() {
    console.log(formatImageLink(getProfileStore.user.avatar_url));
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.wrapperContainer}>
        <Header title={STRINGS.PROFILE_TITLE_HEADER} navigate={navigate} />
        {this.__renderCategory()}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          {this.renderProfile()}
        </View>
      </View>
    );
  }
}
export default ProfileContainer;
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
