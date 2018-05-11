import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet
} from "react-native";
import { Container } from 'native-base';
import TextNullData from '../../commons/TextNullData';
import Header from '../../commons/Header';
import Loading from '../../commons/Loading';
import ListBase from "./ListBase";
import {store} from "./baseStore";
import { observer } from "mobx-react";
import { STRINGS, COLORS, SIZES, FONTS } from "../../constants";


@observer class BaseContainer2 extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentWillMount() {
        store.getListBase();
    }
    loadMore() {
        if (this.props.isLoading && this.props.current_page >= 1)
            return (<Loading />)
        else
            return null
    }
    refreshList() {
        store.getListBase();
    }
    renderBase(){
        if(store.isLoading && store.bases.length == 0 ){
            return <Loading/>
        }
        if(store.error){
            return (
                <View style = {styles.wrapperCenter}>
                    <Text style ={styles.textDescriptionDark}>{STRINGS.HAVE_ERROR}</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.buttonError]}
                        onPress={() => {
                            store.getListBase();
                        }}
                    >
                    </TouchableOpacity>
                </View>
            )
        }
        if(store.bases.length !== 0){
            return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={store.bases}
                    refreshControl={
                        <RefreshControl
                            refreshing={store.isLoadingRefresh}
                            onRefresh={
                                () => this.refreshList()
                            }
                        />
                    }
                    ListFooterComponent={
                        this.loadMore()
                    }
                    renderItem={({ item }) =>
                        <ListBase item={item} navigation={this.props.navigation} />
                    }
                />
            )
        }
        if(store.base.length == 0 && store.isLoading == false && store.error == false){
            return (
                <TextNullData text={STRINGS.NULL_DATA} />
            )
        }
    }




    render() {
        console.log(this.props.isRefresh)
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={STRINGS.DIRECT_HEADER_TITLEL} navigate={navigate} />
                <View style={styles.wrapperContainer}>
                    <View style={{ flex: 1 }}>
                        {this.renderBase()}
                    </View>
                </View>
            </Container>
        );
    }
} 

const wrapperCenter = {
  justifyContent: "center",
  alignItems: "center",
};


const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_COLOR
  },
  wrapperCenter: {
    ...wrapperCenter
  },
  textDescriptionDark: {
    color: "#000",
    fontFamily: FONTS.MAIN_FONT,
    fontSize: 12
  },
  buttonError: {
    ...wrapperCenter,
    padding: 10,
    borderRadius: 5,
    height: 40,
    marginTop: 20,
    maxWidth: 460,
    width: SIZES.DEVICE_WIDTH_SIZE * 0.9 - 60,
    backgroundColor: COLORS.MAIN_COLOR
  },
  
});

export default BaseContainer2;