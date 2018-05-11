import React, { Component } from 'react';
import {
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import styles from '../../styles/styles';
import { Container } from 'native-base';
import Header from '../../commons/Header';
import { STRINGS } from "../../constants";
import IconDefault from "../../commons/IconDefault"
import ListBase from "./ListBase";
import Loading from '../../commons/Loading';
import TextNullData from '../../commons/TextNullData';

import { observer } from "mobx-react";
import { store } from "./baseStore";


@observer class BaseContainer extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            base: "",
            isLoadingState: false,
            province_id: "0",
        }
    }
    componentWillMount() {
        store.getListBase();
    }



    refreshList() {
        store.getListBase();
        this.setState({ page: 1 })
    }

    loadingMore() {
        if (this.props.isLoadingMore) {
            return (
                <Loading />
            )
        }
    }

    render() {
        const { navigate} = this.props.navigation;
        //console.log(store.bases);
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={STRINGS.DIRECT_HEADER_TITLEL} navigate={navigate} />
                <View style={styles.wrapperContainer}>
                    <View style={{ flex: 1 }}>
                        {store.isLoading || this.state.isLoadingState ?
                            <Loading />
                            :
                            store.bases.length !== 0 ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={store.bases}
                                    renderItem={({ item }) =>
                                        <ListBase
                                            item={item}
                                            navigation={navigate}
                                        />
                                    }
                                    onEndReachedThreshold={5}
                                    refreshControl={
                                        <RefreshControl
                                            onRefresh={
                                                () => this.refreshList()
                                            }
                                        />
                                    }
                                    ListFooterComponent={
                                        this.loadingMore()
                                    }
                                />
                                :
                                <TextNullData text={STRINGS.NULL_DATA}/>
                        }
                    </View>
                </View>
            </Container>
        );
    }
}

export default BaseContainer