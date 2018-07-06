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
import OneSignal from "react-native-onesignal";

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
    scheduleStore.getListSchedule();
  }

  render() {
    return <Container style={styles.wrapperContainer}>
        
        {/* <Header title={STRINGS.SCHEDULE.toUpperCase()}  /> */}
        <Agenda items={this.state.items} loadItemsForMonth={this.loadItems.bind(this)} renderItem={this.renderItem.bind(this)} renderEmptyDate={this.renderEmptyDate.bind(this)} rowHasChanged={this.rowHasChanged.bind(this)} // markedDates={{ // markingType={'period'}
          
          theme={{ 
           agendaKnobColor: COLORS.MAIN_COLOR, 
           agendaTodayColor: COLORS.MAIN_COLOR,
           selectedColor: COLORS.MAIN_COLOR,
           dotColor: COLORS.MAIN_COLOR,
           selectedDayBackgroundColor: COLORS.MAIN_COLOR,
           todayTextColor: COLORS.MAIN_COLOR,
           }} />
      </Container>;
  }
  loadItems(day) {
    //console.log(1);
    setTimeout(() => {
      //console.log(1);
      if (this.state.check === false) {
        let Lessons =  scheduleStore.scheduleData;
        //console.log(Lessons);
        for (let lesson of Lessons) {
          //console.log(lesson)
          for (let schedule of lesson) {
            if (!this.state.items[schedule.date]) {
              this.state.items[schedule.date] = [];
            }
            this.state.items[schedule.date].push({
              start_time: schedule.start_time,
              end_time: schedule.end_time,
              color_course: schedule.course.color,
              icon_url: schedule.course.icon_url,
              name_lesson: schedule.name_lesson,
              name_teacher: schedule.name_teacher,
              base: schedule.room.base ? schedule.room.base : "",
              name_room: schedule.name_room,
              address_room: schedule.room.address,
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
    }, 2000);
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
              Giảng viên: {item.name_teacher}
            </Text>
            <Text style={[{ fontSize: 13, color: COLORS.GRAY_COLOR, fontFamily: FONTS.MAIN_FONT, marginTop: 1 }]} numberOfLines={1}>
              Nội dung: {item.name_lesson}
            </Text>
          </View>
        </View>
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
  componentDidMount(){
        OneSignal.inFocusDisplaying(2);
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
    width: 30,
    height: 30,
    borderRadius:15,
    marginRight: 10,
  }
});

export default ScheduleContainer;
