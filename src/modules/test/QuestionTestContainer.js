import React, { Component } from 'react';
import {
    FlatList, Image, RefreshControl, Text, TouchableOpacity, View, Animated, Easing, Keyboard,
    Linking,
} from 'react-native';
import { Container, Content, Item, Left, Right, Button, Input, ListItem, CheckBox, Toast, Root } from 'native-base';
import testStore from './testStore';
import NextButton from '../../commons/NextButton';
import BackAnswerButton from '../../commons/BackAnswerButton';
import Loading from '../../commons/Loading';
import general from '../../Style/generalStyle';
import * as size from '../../Style/size';
import RadioForm from 'react-native-simple-radio-button';
import styles from '../../styles/styles';
import { observer } from "mobx-react";
import IconDefault from '../../commons/IconDefault';
@observer
class QuestionTestContainer extends Component {
    constructor() {
        super();
        this.state = {
            questionNumber: 1,
            answer: '',
            index: -1,
            selectedChk: [],
            isLoadingNextQuestion: false,
        }
    }


    answerRadioQuestion(value) {
        this.setState({ answer: value })

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
        const { isLoadingNextQuestion } = this.state;
        return (
            <View style={{ marginLeft: 4 }}>
                {
                    isLoadingNextQuestion
                        ?
                        <Loading />
                        :
                        <RadioForm
                            style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
                            buttonColor={'#000'}
                            radio_props={newData}
                            initial={-1}
                            onPress={(value) => this.answerRadioQuestion(value)}
                        />
                }
            </View>

        )
    }
    isLoading() {
        this.setState({isLoadingNextQuestion: true});
        setTimeout(() => this.setState({isLoadingNextQuestion: false}), 200);
    }
    componentWillMount() {
        const { id } = this.props.navigation.state.params;
        testStore.getDetailExam(id);
    }

    answerQuestion(number, type, id_question) {
        const { questions_count, name, description, staff, today } = this.props.navigation.state.params;
        console.log('ANSWER : ' + this.state.answer);
        this.resetAnswer();
        if (this.state.answer != '') {
            this.isLoading()
            this.resetAnswer();
            if (this.state.questionNumber < questions_count) {
                this.setState({ questionNumber: number + 1 });
            }
            else {
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
    backAnserQuestion(number, type, id_question) {
        this.isLoading();
        this.setState({questionNumber: number - 1 })
    }

    render() {
        const { isLoadingExamDetail, examDetail } = testStore;
        const { questions_count } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        const { questionNumber } = this.state;
        const { name, description, staff, today, id } = this.props.navigation.state.params;
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
                <Content style={{ flex: 1 }}>
                    {
                        isLoadingExamDetail
                            ?
                            <Loading />
                            :
                            <View style={{ flex: 1 }}>
                                <View style={general.marginLR}>
                                    {/* <Text style={[general.textTitleBig, general.marginBottom]}>
                                        {name.toUpperCase()}
                                    </Text> */}
                                    <View style={general.wrapperRowCenter}>
                                        <Image style={general.imageCircleTiny}
                                            source={{ uri: staff.avatar_url }} />
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
                                        style={[general.textDescriptionCard, general.paddingLine]}>{this.state.questionNumber} / {examDetail.questions_count}</Text>
                                    <View style={general.wrapperProcessDark}>
                                        <View style={[general.process, { width: process }]} />
                                    </View>
                                </View>
                                <View style={general.marginLR}>
                                    <View style={general.wrapperSpace} />
                                    {
                                        examDetail.questions
                                            ?
                                            <View style={{ flex: 1 }}>
                                                <View style={[general.wrapperRowCenter, { flex: 1 }]}>
                                                    <View style={general.buttonQuestion}>
                                                        <Text style={general.textDescriptionCardLight}>
                                                            {this.state.questionNumber}
                                                        </Text>
                                                    </View>
                                                    <Text
                                                        style={[general.textTitleCard, general.paddingLR, general.marginRight]}>{examDetail.questions[questionNumber - 1].content.trim()}</Text>
                                                </View>
                                                <View style={general.marginTop}>
                                                    {
                                                        this.questionType(examDetail.questions[questionNumber - 1].type, examDetail.questions[questionNumber - 1].answers, examDetail.questions[questionNumber - 1].id)
                                                    }
                                                </View>
                                            </View>
                                            :
                                            <Text />
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
                                examDetail.questions[questionNumber - 1].type,
                                examDetail.questions[questionNumber - 1].id
                            )} />
                <BackAnswerButton
                    displayStatus={this.state.questionNumber === 1 ? 'none' : 'flex'}
                    function={
                        () => this.backAnserQuestion(
                            this.state.questionNumber,
                            examDetail.questions[questionNumber - 1].type,
                            examDetail.questions[questionNumber - 1].id
                        )
                    } />
            </Container>
        );
    }
}

export default QuestionTestContainer;