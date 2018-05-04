import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    FlatList,
    RefreshControl
} from 'react-native';
import styles from '../../styles/styles';
import { Container } from 'native-base';
import Header from '../../commons/Header';
import {
    BASE_HEADER_TITLE,
    NULL_DATA, OVERVIEW_HEADER_TITLE
} from '../../constants/text';
import IconDefault from "../../commons/IconDefault"
import * as baseAction from "./baseAction";
import ListBase from "./listBase";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import SelectHeader, {returnProvincesValue} from '../../commons/SelectHeader';
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


    // getMoreBases() {
    //     let page = this.state.page + 1;
    //     if (page <= this.props.total_pages) {
    //         this.props.baseAction.getListBase(page, this.props.token)
    //     }
    //     this.setState({ page: page })
    // }
    refreshList() {
        this.props.baseAction.getListBase(1, this.props.token);
        this.setState({ page: 1 })
    }
    // search(input) {
    //     this.isLoading();
    //     this.setState({ page: 1, student: input });
    //     this.props.studentAction.getStudentRegister(1, input, token)
    // }
    loadingMore() {
        if (this.props.isLoadingMore) {
            return (
                <Loading />
            )
        }
    }

    returnProvinces() {
        //returnProvincesValue(provinces_value =>  this.setState({ province_id: provinces_value }));
        //console.log(this.state.province_id);
        //setTimeout(() => this.props.baseAction.getListBase(1, this.props.token), 200);
    }

    render() {
        //console.log(this.props.isRefresh)
        const { navigate} = this.props.navigation;
        //const { bases } = this.props;
        console.log(store.bases.length);
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={BASE_HEADER_TITLE} navigate={navigate} />

                {/*<SelectHeader*/}
                    {/*haveProvinces*/}
                    {/*functionProvinces={() => this.returnProvinces()}*/}
                {/*/>*/}

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
                                    //onEndReached={() => this.getMoreBases()}
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
        isLoading: state.base.isLoading,
        isLoadingMore: state.base.isLoadingMore,
        isRefresh: state.base.isLoadingRefresh,
        bases: state.base.bases,
        total_pages: state.base.total_pages,
        provinces: state.base.provinces,
        token : (state.login.token === null) ? state.register.token : state.login.token,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        baseAction: bindActionCreators(baseAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer)



