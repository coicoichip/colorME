import React, {Component} from 'react';
import {
    FlatList, Image, RefreshControl, Text, TouchableOpacity, View, Animated, Easing, Keyboard,
    Platform
} from 'react-native';
import {Container, Content, Item, Left, Right, Button, Input, ListItem} from 'native-base';
import HamburgerButton from '../../commons/HamburgerButton';
import Loading from '../../commons/Loading';
import NextButton from '../../commons/NextButton';
import Icon from '../../commons/Icon';
import general from '../../Style/generalStyle';
import * as surveyAction from './surveyAction';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import parallaxStyle from '../../Style/parallaxStyle';
import * as color from "../../Style/color";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class DetailHistorySurveyContainer extends Component {
    constructor() {
        super();
        this.state = {
            historyAnswerQuestion: {},
            page: 1,
            isLoadingNextQuestion: false
        }
    }

    isLoading() {
        this.setState({isLoadingNextQuestion: true});
        setTimeout(() => this.setState({isLoadingNextQuestion: false}), 200);
    }

    componentWillMount() {
        const {index} = this.props.navigation.state.params.data;
        this.setState({historyAnswerQuestion: this.props.historySurvey[index], page: index});
    }

    nextQuestion() {
        let page = 0;
        if (this.state.page == this.props.historySurvey.length - 1)
            page = 0;
        else
            page = this.state.page + 1;
        this.setState({page: page});
        this.setState({historyAnswerQuestion: this.props.historySurvey[page]});
        this.isLoading();
    }

    typeAnswer(type, item) {
        switch (type) {
            case 0: {
                return (
                    <View style={{marginLeft: 50}}>
                        <Text style={general.textDescriptionCard}>{item.answer}</Text>
                    </View>
                )

            }
            case 1: {
                return (
                    <View style={{marginLeft: 50}}>
                        <Text style={general.textDescriptionCard}>{item.answer}</Text>
                    </View>
                )
            }
            case 2: {
                return (
                    <View style={{marginLeft: 50}}>
                        <Text style={general.textDescriptionCard}>{item.answer}</Text>
                    </View>
                )
            }
        }
    }


    render() {
        const {goBack} = this.props.navigation;
        const {navigate} = this.props.navigation;
        const {isLoadingNextQuestion, historyAnswerQuestion} = this.state;
        return (
            <Container style={general.wrapperContainer}>
                <ParallaxScrollView
                    backgroundColor={'#FFF'}
                    showsVerticalScrollIndicator={false}
                    headerBackgroundColor={'#FFF'}
                    stickyHeaderHeight={Platform.OS === 'ios' ? 70 : 60}
                    parallaxHeaderHeight={200}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View style={general.wrapperImageFullWidth}>
                            <View key="background">
                            </View>
                        </View>
                    )}
                    renderForeground={() => (
                        <View key="parallax-header" style={[parallaxStyle.parallaxHeaderTitle, {alignItems: 'flex-start',}]}>
                            <View style={general.paddingLR}>
                                <Text numberOfLines={2}
                                    style={[general.textTitleBig, general.marginBottom]}>{historyAnswerQuestion.survey.name.toUpperCase()}</Text>
                                <Text numberOfLines={4}
                                    style={general.textDescriptionCard}>{historyAnswerQuestion.survey.description}</Text>
                            </View>
                        </View>
                    )}
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={parallaxStyle.stickySection}>
                            <View
                                style={[general.wrapperCenter, Platform.OS === 'ios' ? {marginTop: 30} : {marginTop: 20}]}>
                                <Text style={[general.textTitleBig, {paddingLeft: 50, paddingRight: 50}]}
                                      numberOfLines={1}>
                                    {historyAnswerQuestion.survey.name}
                                </Text>
                            </View>
                        </View>
                    )}
                    renderFixedHeader={() => (
                        <View key="fixed-header" style={general.wrapperIconFixedHeader}>
                            <Left style={Platform.OS === 'ios' ? {marginTop: 20} : {marginTop: 10}}>
                                <TouchableOpacity
                                    onPress={() => navigate('HistorySurvey')}
                                    activeOpacity={1}
                                    style={[general.padding, general.wrapperBackButton]}
                                >
                                    <Icon name="entypo|chevron-thin-left"
                                          size={25}
                                          color={color.iconColor}
                                    />
                                </TouchableOpacity>
                            </Left>
                        </View>
                    )}
                >
                    <View style={general.paddingLR}>
                        {
                            isLoadingNextQuestion
                                ?
                                <Loading/>
                                :
                                historyAnswerQuestion.questions.length != 0
                                    ?
                                    <FlatList
                                        keyExtractor={(item, key) => key + ''}
                                        showsVerticalScrollIndicator={false}
                                        data={historyAnswerQuestion.questions}
                                        renderItem={({item}) =>
                                            <View key={item.id} style={{marginTop: 10, marginBottom: 10}}>
                                                <View style={[general.wrapperRowCenter, {flex: 1}]}>
                                                    <View style={general.buttonQuestion}>
                                                        <Text style={general.textDescriptionCardLight}>
                                                            {item.question.order}
                                                        </Text>
                                                    </View>
                                                    <Text
                                                        style={[general.textTitleCard, general.paddingLR, general.marginRight]}>{item.question.content.trim()}</Text>
                                                </View>
                                                {
                                                    this.typeAnswer(item.question ? item.question.type : '', item)
                                                }
                                            </View>
                                        }
                                    />
                                    :
                                    <View>
                                        <Text style={general.textTitleCard}>Bạn chưa trả lời câu hỏi nào cho cuộc khảo sát này.</Text>
                                    </View>
                        }

                    </View>
                    <View style={general.wrapperBottomModule}/>
                    <View style={general.wrapperSpace}/>
                </ParallaxScrollView>
                <NextButton function={() => this.nextQuestion()}/>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        historySurvey: state.survey.historySurvey,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        surveyAction: bindActionCreators(surveyAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailHistorySurveyContainer);