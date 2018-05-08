import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl
} from 'react-native';
import styles from '../../styles/styles';
import { Container } from 'native-base';
import TextNullData from '../../commons/TextNullData';
import Header from '../../commons/Header';
import {STRINGS} from '../../constants';

import Loading from '../../commons/Loading';
import ListBase from "./ListBase";
import {store} from "./baseStore";
import { observer } from "mobx-react";

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
    renderBlog(){
        if(store.isLoading && store.bases.length == 0 ){
            return <Loading/>
        }
        if(store.error){
            return (
                <View style = {styles.wrapperCenter}>
                    <Text style ={styles.textDescriptionDark}>Có lỗi xảy ra</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.buttonLogin, styles.shadow]}
                        onPress={() => {
                            this.props.blogAction.getListBlog(1, "");
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
                <Header title={STRINGS.BASE_HEADER_TITLEL} navigate={navigate} />
                <View style={styles.wrapperContainer}>
                    <View style={{ flex: 1 }}>

                        {this.renderBlog()}

                    </View>
                </View>
            </Container>
        );
    }
}

export default BaseContainer2;