import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView, Text, FlatList } from "react-native";
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import { observer } from "mobx-react";
import { formatImageLink } from "../../helper/index";
import getProfileStore from "./profileStore";
import ListAttendence from "./ListItem/ListAttendence";
import TextNullData from "../../commons/TextNullData";
import Loading from "../../commons/Loading"


class AttendanceContainer extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    renderAttendance(){
        const{progress, error, isLoading} = getProfileStore;
        if (error) {
            return (
                <Error onPress={() => getProfileStore.getProfile()} />
            )
        }
        if (progress.length !== 0) {
            return (
                <FlatList
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={progress}
                    renderItem={({ item, index }) =>
                    <ListAttendence index = {index} item={item} navigation={this.props.navigation} how_know = {getProfileStore.user.registers[index].student.how_know} />
                    }
                />
            )
        }
        if (progress.length == 0 && isLoading == false && error == false) {
            return (
                <TextNullData text={"Bạn chưa tham gia khoá học nào"} />
            )
        }
    }
    render() {
        return (
            <View style={{flex: 1}}>
               {/* {this.renderAttendance()} */}
            </View>
        )
    }
}
export default AttendanceContainer
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
    wrapperCenter: {
        ...wrapperCenter
    }
})