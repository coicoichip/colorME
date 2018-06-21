import React, {Component} from 'react';
import {
    FlatList, Image, RefreshControl, Text, TouchableOpacity, View, Animated, Easing, Keyboard,
    Linking,
} from 'react-native';
import {Container, Content, Item, Left, Right, Button, Input, ListItem, CheckBox, Toast, Root} from 'native-base';
import NextButton from '../../commons/NextButton';
import Loading from '../../commons/Loading';
import general from '../../Style/generalStyle';
import * as size from '../../Style/size';
import * as surveyAction from './surveyAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RadioForm from 'react-native-simple-radio-button';
import SelectMultiple from 'react-native-select-multiple'
import styles from '../../styles/styles';
import IconDefault from '../../commons/IconDefault';

class DetailSurveyContainer extends Component {
    constructor() {
        super();
        this.state = {
            index: -1,
            questionNumber: 1,
            answer: '',
            selectedChk: [],
            answerChk: '',
            isLoadingQues: false
        }
    }

    sentAnswerSurveyQuestion(id_question, answer) {
        const {id} = this.props.lesson;
        this.props.surveyAction.sentAnswerSurveyQuestion(id_question, id, answer);
    }

    closeSurveyLesson() {
        const {id} = this.props.lesson;
        this.props.surveyAction.closeSurveyLesson(id);
    }

    answerTextQuestion(value) {
        this.setState({answer: value})
    }

    answerRadioQuestion(value) {
        this.setState({answer: value})

    }

    answerSelectQuestion(value) {
        let result = value.map((item) => {
            return item.value
        })
        result = result.toString();
        this.setState({selectedChk: value})
        this.setState({answer: result})
    }

    resetAnswer() {
        this.setState({
            answer: '',
            answerTxt: '',
            index: -1,
            selectedChk: [],
        })
    }

    questionType(type, data, id) {
        const newData = data.map((item) => {
            return {
                ...item,
                label: item.content,
                value: item.content,
            }
        })
        switch (type) {
            case 0 : {
                const {isLoadingNextQuestion} = this.state;
                return (
                    <Item>
                        {
                            isLoadingNextQuestion
                                ?
                                <Loading/>
                                :
                                <Input
                                    placeholder="Nhập câu trả lời"
                                    style={general.inputTheme02}
                                    onChangeText={(value) => this.answerTextQuestion(value)}
                                />
                        }
                    </Item>
                )
            }
            case 1 : {
                const {isLoadingNextQuestion} = this.state;
                return (
                    <View style={{marginLeft: 4}}>
                        {
                            isLoadingNextQuestion
                                ?
                                <Loading/>
                                :
                                <RadioForm
                                    style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}
                                    buttonColor={'#000'}
                                    radio_props={newData}
                                    initial={-1}
                                    onPress={(value) => this.answerRadioQuestion(value)}
                                />
                        }
                    </View>

                )
            }
            case 2 : {
                const {isLoadingNextQuestion} = this.state;
                return (
                    <View style={[general.wrapperRowCenter, general.marginTop]}>
                        {
                            isLoadingNextQuestion
                                ?
                                <Loading/>
                                :
                                <SelectMultiple
                                    items={newData}
                                    selectedItems={this.state.selectedChk}
                                    onSelectionsChange={(value) => this.answerSelectQuestion(value)}/>
                        }
                    </View>
                )
            }
        }
    }

    isLoading() {
        this.setState({isLoadingNextQuestion: true});
        setTimeout(() => this.setState({isLoadingNextQuestion: false}), 200);
    }

    componentWillMount() {
        const {id} = this.props.navigation.state.params;
        this.props.surveyAction.getDataSurveyQuestion(id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({index: -1})
    }

    answerQuestion(number, type, id_question) {
        const {questions_count, name, description, staff, today} = this.props.navigation.state.params;
        const {id} = this.props.lesson;
        console.log('ANSWER : ' + this.state.answer);

        if(this.state.answer != ''){
            this.isLoading()
            this.resetAnswer();
            if (this.state.questionNumber < questions_count) {
                this.sentAnswerSurveyQuestion(id_question, this.state.answer);
                this.setState({questionNumber: number + 1});
            }
            else {
                this.sentAnswerSurveyQuestion(id_question, this.state.answer);
                this.closeSurveyLesson();
                this.props.navigation.navigate('FinishSurvey', {
                    name: name,
                    description: description,
                    staff: staff,
                    questions_count: questions_count,
                    today: today
                });
            }
        } else {
            alert('Bạn chưa nhập câu trả lời')
        }
        


    }

    render() {
        const {questions_count} = this.props.navigation.state.params;
        const {navigate} = this.props.navigation;
        const {isLoadingQuestion, questions} = this.props;
        const {questionNumber} = this.state;
        const {name, description, staff, today, id} = this.props.navigation.state.params;
        let process = (size.wid - 40) / questions_count * questionNumber;
        return (
            <Container style={general.wrapperContainer}>
                 <View style={[styles.wrapperHeader, styles.paddingLeftRight, { flexDirection: 'row' }]}>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={[styles.textHeaderScreen, { fontSize: 17 }]} numberOfLines={1}>
                        {name.toUpperCase()}
                        </Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <View style={{ alignItems: 'flex-end' }}>
                            <IconDefault
                                name={'Ionicons|md-close'}
                                style={{ padding: 0 }}
                                color={"gray"}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <Content style={{flex: 1}}>
                    {
                        isLoadingQuestion
                            ?
                            <Loading/>
                            :
                            <View style={{flex: 1}}>
                                <View style={general.marginLR}>
                                    {/* <Text style={[general.textTitleBig, general.marginBottom]}>
                                        {name.toUpperCase()}
                                    </Text> */}
                                    <View style={general.wrapperRowCenter}>
                                        <Image style={general.imageCircleTiny}
                                               source={{uri: staff.avatar_url}}/>
                                        <Text
                                            style={[general.textNameCard, general.paddingLine]}>&nbsp;&nbsp;{staff.name.toUpperCase()}
                                            <Text style={general.textTimeCard}>&nbsp;-&nbsp;
                                                {today}
                                            </Text>
                                        </Text>
                                    </View>
                                    <Text
                                        style={[general.textDescriptionCard, general.paddingLine]}>{description}</Text>
                                    <Text
                                        style={[general.textDescriptionCard, general.paddingLine]}>{this.state.questionNumber} / {questions.questions_count}</Text>
                                    <View style={general.wrapperProcessDark}>
                                        <View style={[general.process, {width: process}]}/>
                                    </View>
                                </View>
                                <View style={general.marginLR}>
                                    <View style={general.wrapperSpace}/>
                                    {
                                        questions.questions
                                            ?
                                            <View style={{flex: 1}}>
                                                <View style={[general.wrapperRowCenter, {flex: 1}]}>
                                                    <View style={general.buttonQuestion}>
                                                        <Text style={general.textDescriptionCardLight}>
                                                            {this.state.questionNumber}
                                                        </Text>
                                                    </View>
                                                    <Text
                                                        style={[general.textTitleCard, general.paddingLR, general.marginRight]}>{questions.questions[questionNumber - 1].content.trim()}</Text>
                                                </View>
                                                <View style={general.marginTop}>
                                                    {
                                                        this.questionType(questions.questions[questionNumber - 1].type, questions.questions[questionNumber - 1].answers, questions.questions[questionNumber - 1].id)
                                                    }
                                                </View>
                                            </View>
                                            :
                                            <Text/>
                                    }
                                </View>
                            </View>
                    }
                </Content>
                <NextButton
                    displayStatus={this.state.answer == '' ? 'none' : 'flex'}
                    function={
                        () =>
                            this.answerQuestion(
                                this.state.questionNumber,
                                questions.questions[questionNumber - 1].type,
                                questions.questions[questionNumber - 1].id
                            )}/>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        questions: state.survey.questions,
        isLoadingQuestion: state.survey.isLoadingQuestion,
        isLoadingAnswer: state.survey.isLoadingAnswer,
        lesson: state.survey.lesson
    }
}

function mapDispatchToProps(dispatch) {
    return {
        surveyAction: bindActionCreators(surveyAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailSurveyContainer);