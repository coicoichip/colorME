import React, {Component} from 'react';
import {FlatList, Image, RefreshControl, Text, TouchableOpacity, View, Animated, Easing, Keyboard} from 'react-native';
import {Container} from 'native-base';
import Loading from '../../commons/Loading';
import { STRINGS } from "../../constants";
import Header from "../../commons/Header";
import general from '../../Style/generalStyle';
import * as surveyAction from './surveyAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as size from "../../Style/size";
import { observer } from "mobx-react";
import loginStore from "../login/loginStore";

@observer
class SurveyContainer extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
        }
    }

    componentWillMount() {
        this.props.surveyAction.getDataSurvey(1)
    }

    getMoreLisSurvey() {
        const {surveys, surveyAction} = this.props;
        if (surveys.length >= this.state.page * 20) {
            let page = this.state.page + 1;
            this.setState({page: page});
            surveyAction.getMoreDataSurvey(page);
        }
    }

    loadMore() {
        if (this.props.isLoadingMoreSurvey)
            return (<Loading/>)
        else
            return (<View/>)
    }

    render() {
        const top = this.state.searchMove;
        const {navigate} = this.props.navigation;
        const {surveys, isLoading, isRefreshingSurvey} = this.props;
        return (
            <Container style={general.wrapperContainer}>
                <Header title={STRINGS.SURVEY} navigate={navigate} />
                <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFF'}}>
                    {
                        loginStore.user.role == 0
                            ?
                            <Text style={[general.textTitleCard, {textAlign: 'center'}]}>Hiện tại bạn chưa thể truy cập
                                được vào Survey.</Text>
                            :
                            isLoading
                                ?
                                <Loading/>
                                :

                                <FlatList
                                    keyExtractor={(item, key) => key + ''}
                                    ref="listRef"
                                    showsVerticalScrollIndicator={false}
                                    data={surveys}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={isRefreshingSurvey}
                                            onRefresh={
                                                () => this.props.surveyAction.refreshDataSurvey()
                                            }
                                        />
                                    }
                                    onEndReachedThreshold={5}
                                    onEndReached={
                                        () => this.getMoreLisSurvey()
                                    }
                                    ListFooterComponent={
                                        this.loadMore()
                                    }
                                    renderItem={({item}) =>
                                        <TouchableOpacity
                                            key={item.id}
                                            onPress={() => navigate('DetailSurvey', {data: item})}
                                            activeOpacity={1}
                                            style={{paddingHorizontal: 16, marginBottom: 24, width: size.wid - 32}}>
                                            <Image
                                                style={[general.imageFeature]}
                                                source={{uri: item.image_url}}/>
                                            <View style={general.wrapperSpace}/>
                                            <Text style={general.textTitleCard}>{item.name.toUpperCase()}</Text>
                                            <View style={general.wrapperRowCenter}>
                                                <Image style={general.imageCircleTiny}
                                                       source={{uri: item.staff ? item.staff.avatar_url : ''}}
                                                />
                                                <Text
                                                    style={[general.textNameCard, general.paddingLine]}>&nbsp;&nbsp;{item.staff ? item.staff.name.toUpperCase() : ''}<Text
                                                    style={general.textTimeCard}>&nbsp;-&nbsp;{item.created_at}</Text></Text>
                                            </View>
                                            <Text
                                                style={[general.textDescriptionCard, general.marginBottom]}>{item.description}</Text>
                                            <View style={[general.wrapperProcessDark, general.marginTop]}>
                                                <View
                                                    style={[general.process, {width: item.target > item.take ? (size.wid - 80) / item.target * item.take : (size.wid - 80)}]}/>
                                            </View>
                                            <View style={[general.wrapperSpace, general.marginBottom]}/>
                                            <Text style={[general.categoryInImage, general.textDescriptionCardLight,{right: 20}]}>
                                                {item.questions_count} câu hỏi
                                            </Text>
                                            <Text style={[general.textTimeCard, {
                                                position: 'absolute',
                                                bottom: 10,
                                                left: 20,
                                            }]}>
                                                {item.take} / {item.target}
                                            </Text>
                                            <View style={general.wrapperSpace}/>
                                        </TouchableOpacity>
                                    }
                                />
                    }
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.survey.isLoading,
        isRefreshingSurvey: state.survey.isRefreshingSurvey,
        surveys: state.survey.surveys,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        surveyAction: bindActionCreators(surveyAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);