import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text,FlatList, RefreshControl ,Modal, PanResponder} from "react-native";
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import getProfileStore from "../profile/profileStore";
import ListProgress from "./ListItem/ListProgress";
import Error from "../../commons/Error";
import TextNullData from "../../commons/TextNullData";
import Loading from "../../commons/Loading";
import { observer } from "mobx-react";
@observer
class ProgressContainer extends Component {
    componentWillMount(){
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
    }
    _onPanResponderGrant(event, gestureState) {
        if (event.nativeEvent.locationX === event.nativeEvent.pageX) {
            getProfileStore.modalReserve = false;
        }
    }
    reserveStudy(){
        Alert.alert("Thông báo", "Bạn đang sắp gửi yêu cầu cho colorME, bạn có chắc chắn", [
            {text : "Huỷ", onPress : () => {}},
            {text : "Đồng ý", onPress : () => {getProfileStore.reserveStudy()}}
        ])
    }
   

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
                        <ListProgress reserveStudy = {this.reserveStudy.bind(this)} item={item} navigation={this.props.navigation} status = {getProfileStore.user.registers[index].status}/>
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
              <Modal
                    onRequestClose={() => getProfileStore.modalReserve = false}
                    animationType="fade"
                    transparent={true}
                    visible={getProfileStore.modalReserve}
                    position={'center'}
                >
                    <View style={styles.wrapperModalUpdate}
                          {...this.panResponder.panHandlers}>
                        <View style={styles.modalUpdate}>
                            {
                                getProfileStore.isLoadingReserve
                                    ?
                                    <Loading/>
                                    :
                                    <View/>
                            }
                            <Text style={[styles.textUpdate, {paddingBottom: 10}]}>{"Đang gửi phản hồi ..."}</Text>
                        </View>
                    </View>
                </Modal>
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
    },
    wrapperModalUpdate : {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalUpdate : {
        borderRadius: 10,
        width: SIZES.DEVICE_WIDTH_SIZE * 0.75,
        height: SIZES.DEVICE_HEIGHT_SIZE / 4,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textUpdate: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Roboto-Regular',
    }
})