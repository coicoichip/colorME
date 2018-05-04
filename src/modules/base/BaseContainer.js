import React, { Component } from 'react';
import {
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import styles from '../../styles/styles';
import { Container } from 'native-base';
import Header from '../../commons/Header';
import {
    BASE_HEADER_TITLE,
    NULL_DATA
} from '../../constants/text';
import IconDefault from "../../commons/IconDefault"
import ListBase from "./listBase";
import { connect } from 'react-redux';
import Loading from '../../commons/Loading';
import TextNullData from '../../commons/TextNullData';

import { observer } from "mobx-react";
import { store } from "./baseStore";


//let token = "yJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6Ly9hcGkuY29sb3JtZS52bi9sb2dpbiIsImlhdCI6MTUyMTAwMTQ0NCwiZXhwIjoxNTIxNjA2MjQ0LCJuYmYiOjE1MjEwMDE0NDQsImp0aSI6IkRqTGNybjNocnRvQUZDdm0ifQ.VHl36Yeegp72KAZHWg9jQh8JCRKr5LpvKO8NI5ldRHA"
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
       store.getListBase(1, this.props.token);
    }



    refreshList() {
        store.getListBase(1, this.props.token);
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
                <Header title={BASE_HEADER_TITLE} navigate={navigate} />
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
                                            refreshing={store.isRefresh}
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
                                <TextNullData text={NULL_DATA}/>
                        }
                    </View>
                </View>
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return {
        token : (state.login.token === null) ? state.register.token : state.login.token,
    }
}

export default connect(mapStateToProps)(BaseContainer)



