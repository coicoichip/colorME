import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import { Container } from "native-base";
import { STRINGS, COLORS, SIZES, FONTS } from "../../constants";
import { Agenda } from "react-native-calendars";
import { formatImageLink } from "../../helper/index";
import scheduleStore from "./scheduleStore";
import loginStory from "../login/loginStore";
import { observer } from "mobx-react";
import Header from "../../commons/Header";


const isIOS = Platform.OS === "ios";

@observer
class ScheduleContainer extends React.Component {
   constructor() {
        super();
        this.state = {
            check: false,
            items: {}
        }
    }

  componentDidMount() {
    console.log(1);
    scheduleStore.getListSchedule(loginStore.token);
  }

  render() {
    //console.log(scheduleStore.data);
    //console.log(scheduleStore.scheduleData);
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    return (
      <Container style={styles.wrapperContainer}>
        {/* <View style={[styles.wrapperHeader, styles.paddingLeftRight]}>
          <View style={{ flex: 5 }}>
            <Text style={[styles.textHeaderScreen]}>
              {STRINGS.SCHEDULE.toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <View style={{ alignItems: "flex-end" }}>
              <IconDefault
                name={"Ionicons|md-close"}
                style={{ padding: 0 }}
                color={this.props.color ? this.props.color : null}
              />
            </View>
          </TouchableOpacity>
        </View> */}
        <Header title={STRINGS.SCHEDULE.toUpperCase()} navigate={navigate} />
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // markingType={'period'}
          // markedDates={{
          //    '2018-05-08': {textColor: '#666'},
          //    '2018-05-09': {textColor: '#666'},
          //    '2018-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2018-05-21': {startingDay: true, color: 'blue'},
          //    '2018-05-22': {endingDay: true, color: 'gray'},
          //    '2018-05-24': {startingDay: true, color: 'gray'},
          //    '2018-05-25': {color: 'gray'},
          //    '2018-05-26': {endingDay: true, color: 'gray'}}}
          //  monthFormat={'yyyy'}
          //  // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        />
      </Container>
    );
  }
  loadItems(day) {
    //console.log(1);
    setTimeout(() => {
      if (this.state.check === false) {
        let Lessons =  scheduleStore.scheduleData;
        for (let lesson of Lessons) {
          console.log(lesson)
          for (let schedule of lesson) {
            if (!this.state.items[schedule.date]) {
              this.state.items[schedule.date] = [];
            }
            this.state.items[schedule.date].push({
              name: schedule.course.name,
              start_time: schedule.start_time,
              end_time: schedule.end_time,
              color_course: schedule.course.color,
              icon_url: schedule.course.icon_url,
              name_lesson: schedule.name_lesson,
              teacher: schedule.teacher.name,
              base: schedule.room.base,
              name_room: schedule.room.name,
              address_room: schedule.room.address
            });
          }
        }
         const newItems = {};
         Object.keys(this.state.items).forEach(key => {
           newItems[key] = this.state.items[key];
         });
         this.setState({ items: newItems, check : true });
      }
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1300);
    //console.log(this.state);
  }

  renderItem(item) {
    return <View style={[styles.item, { height: 110 }]}>
        <View style={[{ flexDirection: "row" }]}>
          <Image source={{ uri: formatImageLink(item.icon_url) }} style={styles.imageFeature} />
          <View style={[{ width: SIZES.DEVICE_WIDTH_SIZE / 1.6, marginLeft: 0, marginRight:5 }]}>
            <Text style={[{ fontSize: 15, color: COLORS.DARK_COLOR, fontFamily: FONTS.MAIN_FONT, marginTop: 0 }]} numberOfLines={1}>
              {item.start_time} - {item.end_time}
            </Text>
            <Text style={[{ fontSize: 13, color: COLORS.GRAY_COLOR, fontFamily: FONTS.MAIN_FONT, marginTop: 1 }]} numberOfLines={2}>
              Địa chỉ: {item.name_room} - {item.base} - {item.address_room}
            </Text>
            <Text style={[{ fontSize: 13, color: COLORS.GRAY_COLOR, fontFamily: FONTS.MAIN_FONT, marginTop: 1 }]} numberOfLines={1}>
              Giảng viên: {item.teacher}
            </Text>
            <Text style={[{ fontSize: 13, color: COLORS.GRAY_COLOR, fontFamily: FONTS.MAIN_FONT, marginTop: 1 }]} numberOfLines={1}>
              Nội dung: {item.name_lesson}
            </Text>
          </View>
        </View>
        {/* <View style={[{ marginLeft:2}]}>
            
        </View> */}
      </View>;
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <View style={styles.viewInEmpty} />
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const wrapperCenter = {
  justifyContent: "center",
  alignItems: "center"
};

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_COLOR
  },
  wrapperHeader: {
    height: isIOS ? 80 : 60,
    paddingTop: isIOS ? 20 : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.LIGHT_COLOR,
    marginTop: 20
  },
  paddingLeftRight: {
    paddingLeft: 20,
    paddingRight: 20
  },
  textHeaderScreen: {
    color: COLORS.TITLE_HEADER_COLOR,
    fontFamily: FONTS.MAIN_FONT,
    fontSize: 25
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    backgroundColor: "transparent",
    flex: 1,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 17
  },
  viewInEmpty: {
    height: 1,
    width: SIZES.DEVICE_WIDTH_SIZE / 1.23,
    backgroundColor: "#d0d3d8",
    marginTop: 30
  },
  imageFeature: {
    width: 50,
    height: 50,
    borderRadius:25,
    marginRight: 10,
  }
});

export default ScheduleContainer;
