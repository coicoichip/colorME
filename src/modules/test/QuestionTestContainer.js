import React, { Component } from 'react';
import {
    FlatList, Image, RefreshControl, Text, TouchableOpacity, View,

    Alert,
    Linking
} from 'react-native';
import { Container, Content } from 'native-base';
import testStore from './testStore';
import NextButton from '../../commons/NextButton';
import { formatImageLink } from "../../helper"
import BackAnswerButton from '../../commons/BackAnswerButton';
import Loading from '../../commons/Loading';
import general from '../../Style/generalStyle';
import * as size from '../../Style/size';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import styles from '../../styles/styles';
import { observer } from "mobx-react";
import IconDefault from '../../commons/IconDefault';
import { COLORS, FONTS, SIZES } from "../../constants";
@observer
class QuestionTestContainer extends Component {
    constructor() {
        super();
        this.state = {
            questionNumber: 1,
            index: -1,
            isLoadingNextQuestion: false,
            answers: [],
            post_answers: [],

        }
    }

    checkAnswer(correct, i) {
        if (!testStore.checkAnswer) {
            // if(this.state.answers[this.state.questionNumber-1] == undefined) {return null}
            return COLORS.MAIN_COLOR

        }
        else {
            if (correct == 1) { return COLORS.GREEN_COLOR }
            else {
                if (this.state.answers[this.state.questionNumber - 1] == i) { return COLORS.MAIN_COLOR }
                else { return null }
            }
        }
    }
    checkAnswerSelected(correct, i) {
        if (!testStore.checkAnswer) {
            if (this.state.answers[this.state.questionNumber - 1] == i) { return true; }
            else return false;
        }
        else {
            if (this.state.answers[this.state.questionNumber - 1] == i || correct == 1) {
                return true;
            }
            return false;
        }
    }


    answerRadioQuestion(value) {
        const { examDetail } = testStore;
        let answers = this.state.answers;
        let post_answers = this.state.post_answers;
        answers[this.state.questionNumber - 1] = value;
        post_answers[this.state.questionNumber - 1] = {
            question_id: examDetail.questions[this.state.questionNumber - 1].id,
            answer_id: examDetail.questions[this.state.questionNumber - 1].answers[value].id
        }
        this.setState({ answers: answers, post_answers: post_answers })
    }
    // resetAnswer() {
    //     this.setState({
    //         answer: '',
    //         answerTxt: '',
    //         index: -1,
    //     })
    // }

    questionType(type, data, id) {
        const newData = data.map((item, index) => {
            return {
                ...item,
                label: item.content,
                value: index,
            }
        })
        const { isLoadingNextQuestion } = this.state;
        return (
            <View style={{ marginLeft: 4, marginTop : 5 }}>
                {
                    isLoadingNextQuestion
                        ?
                        <Loading />
                        :
                        <RadioForm
                            formHorizontal={false}
                            animation={true}
                            style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: -8 }}
                        >

                            {newData.map((obj, i) => {

                                return (
                                    <RadioButton labelHorizontal={true} key={i} style={{ marginTop: 5 }} >
                                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                        <RadioButtonInput
                                            obj={obj}
                                            index={i}
                                            isSelected={this.checkAnswerSelected(obj.correct, i)}
                                            onPress={(value) => testStore.checkAnswer ? {} : this.answerRadioQuestion(value)}
                                            borderWidth={2}
                                            buttonInnerColor={this.checkAnswer(obj.correct, i)}
                                            buttonOuterColor={this.checkAnswer(obj.correct, i)}

                                            buttonWrapStyle={{ marginLeft: 10 }}
                                        />
                                        <RadioButtonLabel
                                            obj={obj}
                                            index={i}
                                            labelHorizontal={true}
                                            onPress={(value) => testStore.checkAnswer ? {} : this.answerQuestion(value)}
                                            labelStyle={{ fontSize: 15, fontFamily: FONTS.MAIN_FONT }}
                                            labelWrapStyle={{}}
                                        />
                                    </RadioButton>
                                )
                            })}
                        </RadioForm>



                }
            </View>

        )
    }
    isLoading() {
        if(this.state.questionNumber == testStore.examDetail.questions.length){
            this.setState({isLoadingNextQuestion : false})
            return ;
        }
        this.setState({ isLoadingNextQuestion: true });
        setTimeout(() => this.setState({ isLoadingNextQuestion: false }), 200);
    }
    componentWillMount() {
        const { id } = this.props.navigation.state.params;
        testStore.getDetailExam(id);
    }

    answerQuestion(number, type, id_question) {
        const { questions_count, name, description, staff, today, id } = this.props.navigation.state.params;
        if (this.state.answers[this.state.questionNumber - 1] == undefined) {
            Alert.alert("Thông báo", "Bạn chưa điền câu trả lời");
            return;
        }
        this.isLoading()
        // this.resetAnswer();
        if (this.state.questionNumber < questions_count) {
            this.setState({ questionNumber: number + 1 });
        }
        if (this.state.questionNumber == testStore.examDetail.questions.length) {
            this.props.navigation.navigate('FinalTest', {
                // id: id,
                // name: name,
                // description: description,
                // staff: staff,
                // questions_count: questions_count,
                // today: today,
                answers: this.state.answers,
                post_answers: this.state.post_answers,
                questionType : this.questionType.bind(this)
            });
        }
    }
    backAnserQuestion(number, type, id_question) {
        this.isLoading();
        this.setState({ questionNumber: number - 1 })
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
                                                {/* <Image source={{ uri: formatImageLink(examDetail.questions[this.state.questionNumber - 1].image_url) }}
                                                        style={{height : SIZES.DEVICE_HEIGHT_SIZE / 3, width : SIZES.DEVICE_WIDTH_SIZE, marginLeft : -20}} /> */}
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

                {
                    this.state.answers.length == 0
                        ?
                        null
                        :
                        <NextButton
                            displayStatus={this.state.answers.length == 0 ? 'none' : 'flex'}
                            function={
                                () =>
                                    this.answerQuestion(
                                        this.state.questionNumber,
                                        examDetail.questions[questionNumber - 1].type,
                                        examDetail.questions[questionNumber - 1].id
                                    )} />

                }
                {
                    this.state.questionNumber == 1
                        ?
                        null
                        :
                        <BackAnswerButton
                            displayStatus={this.state.questionNumber === 1 ? 'none' : 'flex'}
                            function={
                                () => this.backAnserQuestion(
                                    this.state.questionNumber,
                                    examDetail.questions[questionNumber - 1].type,
                                    examDetail.questions[questionNumber - 1].id
                                )
                            } />
                }

            </Container>
        );
    }
}

export default QuestionTestContainer;