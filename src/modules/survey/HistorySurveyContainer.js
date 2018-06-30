import React, { Component } from 'react';
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View, Animated, Easing, Keyboard } from 'react-native';
import { Container } from 'native-base';
import Loading from '../../commons/Loading';
import Header from "../../commons/Header";
import general from '../../Style/generalStyle';
import * as surveyAction from './surveyAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { observer } from "mobx-react";
import loginStore from "../login/loginStore";
import {formatImageLink} from '../../helper'

@observer
class HistorySurveyContainer extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            historySurveyState: []
        }
    }
    componentDidMount() {
        this.props.surveyAction.getHistorySurvey(1);
    }
    getMoreListHistorySurvey() {
        const { historySurvey, surveyAction } = this.props;
        if (historySurvey.length >= this.state.page * 20) {
            let page = this.state.page + 1;
            this.setState({ page: page });
            surveyAction.getMoreHistorySurvey(page);
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     const newArr = this.props.historySurvey.map((item, i) => {
    //         return {
    //             ...item,
    //             index: i
    //         }
    //     })
    //     this.setState({ historySurveyState: newArr })
    // }

    loadMore() {
        if (this.props.isLoadingMoreHistorySurvey)
            return (<Loading />)
        else
            return (<View />)
    }

    render() {
        const { navigate } = this.props.navigation;
        const { isLoadingHistorySurvey, historySurvey, isRefreshingHistorySurvey } = this.props;
        const { user } = loginStore;
        return (
            <Container style={general.wrapperContainer}>
                <Header title={"Lịch sử khảo sát"} navigate={navigate} />
                {
                    isLoadingHistorySurvey
                        ?
                        <Loading />
                        :
                        
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <FlatList
                                    ref="listRef"
                                    showsVerticalScrollIndicator={false}
                                    data={Array.isArray(historySurvey) ? historySurvey.map((item, i) => {
                                        return {
                                            ...item,
                                            index: i
                                        }
                                    })  :[]}
                                    keyExtractor={(item, key) => key + ''}
                                    onEndReachedThreshold={5}
                                    onEndReached={
                                        () => this.getMoreListHistorySurvey()
                                    }
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={isRefreshingHistorySurvey}
                                            onRefresh={
                                                () => this.props.surveyAction.getHistorySurvey(1)
                                            }
                                        />
                                    }
                                    ListHeaderComponent={
                                        <View
                                            style={[general.wrapperRowCenter, general.padding, general.marginBottomFar]}>
                                            <Image
                                                style={[general.imageCircleNormal]}
                                                source={{ uri: user ? formatImageLink(user.avatar_url) : '' }}
                                            />
                                            <View style={general.marginLR}>
                                                <Text style={general.textTitleBig}>{user.name}</Text>
                                                <Text style={general.textDescriptionCard}>Dữ liệu về cuộc khảo sát mà
                                                    bạn đã thực hiện.</Text>
                                            </View>
                                        </View>
                                    }

                                    ListFooterComponent={
                                        this.loadMore()
                                    }
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            onPress={() => navigate('DetailHistorySurvey', { data: item })}
                                            activeOpacity={1}
                                            style={[general.shadow, general.marginBottom, general.wrapperSurvey, general.paddingFar, general.margin, general.marginBottomFar]}>
                                            <Text style={general.textTitleCard}>{item.survey.name.toUpperCase()}</Text>
                                            <View style={general.wrapperRowCenter}>
                                                <Image style={general.imageCircleTiny}
                                                    source={{ uri: item.user ? item.user.avatar_url : '' }}
                                                />
                                                <Text
                                                    style={[general.textNameCard, general.paddingLine]}>&nbsp;&nbsp;{item.user ? item.user.name.toUpperCase() : ''}<Text
                                                        style={general.textTimeCard}>&nbsp;-&nbsp;{item.survey ? item.survey.created_at : ''}</Text></Text>
                                            </View>
                                            <Text
                                                style={[general.textDescriptionCard, general.marginBottom]}>{item.survey.description}</Text>
                                            <View style={general.wrapperSpace} />
                                            <Text
                                                style={[general.categoryInImage, general.textDescriptionCardLight, { right: 10 }]}>
                                                {item.created_at}
                                            </Text>
                                            <View style={general.wrapperSpace} />
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                        </View>
                }
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoadingHistorySurvey: state.survey.isLoadingHistorySurvey,
        isLoadingMoreHistorySurvey: state.survey.isLoadingMoreHistorySurvey,
        isRefreshingHistorySurvey: state.survey.isRefreshingHistorySurvey,
        historySurvey: state.survey.historySurvey,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        surveyAction: bindActionCreators(surveyAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistorySurveyContainer);