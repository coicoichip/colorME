import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView, Text,FlatList, RefreshControl } from "react-native";
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import getProfileStore from "../profile/profileStore";
import ListProgress from "./ListItem/ListProgress";
import Error from "../../commons/Error";
import TextNullData from "../../commons/TextNullData";
import Loading from "../../commons/Loading";
import { observer } from "mobx-react";

class ProgressContainer extends Component {
    renderProgress(){
        
        const {isLoading, error, progress, registers} = this.props;
        console.log(registers)
        if (isLoading) {
            return <Loading />
        }
        if (error) {
            return (
                <Error onPress={() => getProfileStore.getProfile()} />
            )
        }
        if (progress.length !== 0) {
            return (
                <FlatList
                    ref = {'listBlog'}
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={progress}
                    
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={isLoading && resources.length == 0}
                    //         onRefresh={
                    //             () => this.UNSAFE_componentWillMount()
                    //         }
                    //     />
                    // }
                    renderItem={({ item , index}) =>
                        <ListProgress item={item} navigation={this.props.navigation} status = {getProfileStore.user.registers[index].status}/>
                    }
                    // ListFooterComponent={
                    //     this.loadMore()
                    // }
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
            <View style={styles.wrapperCenter}>
              {this.renderProgress()}
            </View>
        )
    }
}

export default ProgressContainer
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