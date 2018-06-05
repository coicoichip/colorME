import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from "react-native";
import {
  Button,
  Text,
  Container,
  Item,
  Content,
  Input,
  Form
} from "native-base";
import Header from "../../commons/Header";
import styles from "../../styles/styles";
import Loading from "../../commons/Loading";
import { observer } from "mobx-react";
import { InputCommon } from "../../commons";
import { formatImageLink } from "../../helper/index";
import { STRINGS, COLORS, SIZES, FONTS } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import getProfileStore from "./profileStore";
import ProgressContainer from "./ProgressContainer";
import AttendanceContainer from "./AttendanceContainer";
import { observable } from "mobx";
import ScheduleContainer from "../schedule/ScheduleContainer";
import Analytics from 'appcenter-analytics';

// import loginStore from "../login/loginStore";
@observer
class StudyContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      category: 0,
      categogyArr: [
        { title: STRINGS.PROCESS, index: 0 },
        { title: STRINGS.ATTENDANCE, index: 1 },
        { title: STRINGS.CALENDAR_STUDY, index: 2 }
      ]
    };
  }
  componentDidMount() {
    Analytics.trackEvent(STRINGS.ACTION_ROOT_TAB_STUDY, {});
    getProfileStore.getProfile();
  }
  onChangeData = field => value => {
    getProfileStore.updateUser[field] = value;
  };
  chooseCategory(index) {
    this.setState({ category: index });
    if (index == 0) {
    }
    this.refs.__data.scrollTo({
      x: SIZES.DEVICE_WIDTH_SIZE * index,
      y: 0,
      animated: false
    });
    
  }
  __renderCategory = () => {
    return (
      <View height={40}>
        <Content horizontal={true} style={[styles.paddingLeftRight]}>
          {this.state.categogyArr.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.9}
                onPress={() => this.chooseCategory(item.index)}
              >
                <View style={{ marginRight: 10 }}>
                  <Text
                    style={
                      this.state.category == item.index
                        ? styles.buttonSelected
                        : styles.buttonNotSelect
                    }
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </Content>
      </View>
    );
  };
  __renderData() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref="__data"
        scrollEnabled={false}
      >
        <View style={{ width: SIZES.DEVICE_WIDTH_SIZE, marginTop: 10 }}>
          <ProgressContainer
            progress={getProfileStore.progress}
            error={getProfileStore.error}
            isLoading={getProfileStore.isLoading}
          />
        </View>

        <View style={{ width: SIZES.DEVICE_WIDTH_SIZE, marginTop: 10 }}>
          <AttendanceContainer />
        </View>
        <View style={{ width: SIZES.DEVICE_WIDTH_SIZE, marginTop: 10 }}>
          <ScheduleContainer />
        </View>
      </ScrollView>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.wrapperContainer}>
        <Header title={STRINGS.STUDY} navigate={navigate} />

        {this.__renderCategory()}

        {this.__renderData()}
        {/* </View> */}
        {/* </View> */}
      </View>
    );
  }
}
export default StudyContainer;
const wrapperCenter = {
  justifyContent: "center",
  alignItems: "center"
};

const textLogo = {
  fontFamily: FONTS.LOGO_FONT,
  backgroundColor: "transparent",
  color: COLORS.LIGHT_COLOR
};

const text = {
  fontFamily: "Roboto-Regular",
  backgroundColor: "transparent",
  color: COLORS.DARK_COLOR,
  fontSize: SIZES.TEXT_BUTTON_SIZE
};

const styless = StyleSheet.create({
  textLogoColor: {
    ...textLogo,
    fontSize: SIZES.LOGO_COLOR_SIZE
  },
  textLogoMe: {
    ...textLogo,
    fontSize: SIZES.LOGO_ME_SIZE,
    marginTop: -40
  },
  textButton: {
    ...text
  },
  wrapperButton: {
    ...wrapperCenter,
    width: SIZES.DEVICE_WIDTH_SIZE,
    position: "absolute",
    bottom: SIZES.DEVICE_HEIGHT_SIZE / 4 - 30,
    paddingHorizontal: 80
  },
  wrapperLogo: {
    ...wrapperCenter,
    flex: 1,
    backgroundColor: COLORS.MAIN_COLOR
  },
  contentForm: {
    ...wrapperCenter,
    backgroundColor: COLORS.LIGHT_COLOR
  },
  input: {
    width: SIZES.DEVICE_WIDTH_SIZE - 40,
    height: 35
  },
  buttonRegister: {
    ...wrapperCenter,
    backgroundColor: "rgb(0, 240, 53)",
    padding: 12,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 3
  }
});
