import React, { Component } from 'react';
import {
    FlatList, Image, RefreshControl, Text, TouchableOpacity, View
} from 'react-native';
import { Container } from 'native-base';
;
import Loading from '../../commons/Loading';
import Icon from '../../commons/Icon';
import general from '../../Style/generalStyle';

import IconDefault from '../../commons/IconDefault';
import styles from '../../styles/styles';
import { FONTS, SIZES, COLORS } from '../../constants';
import testStore from "./testStore";
import Error from "../../commons/Error";
import { observer } from 'mobx-react';
import getProfileStore from "../../modules/profile/profileStore";
import PercentageCircle from 'react-native-percentage-circle';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import {  NavigationActions } from 'react-navigation';
@observer
export default class FinalTestQuestion extends Component {
    constructor() {
        super();
        this.state = {
            questionNumber: 0,
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        testStore.postAnswer(params.id, params.post_answers, getProfileStore.user);
    }
    renderScore() {
        const { params } = this.props.navigation.state;
        const { examDetail } = testStore;
        let score = 0;
        for (let i = 0; i < examDetail.questions.length; i++) {
            score += examDetail.questions[i].answers[params.answers[i]].correct;
        }
        return score;
    }
    scroll(index) {
        if (testStore.examDetail.questions.length > 5) {
            this.refs.__list_questions.scrollToIndex({ index: index })
        }
        
        this.refs.__data.scrollToIndex({ index: index })

        this.setState({ questionNumber: index })

    }
    checkAnswer(correct, i, index) {
        const { params } = this.props.navigation.state;

        if (correct == 1) { return COLORS.GREEN_COLOR }
        else {
            if (params.answers[index] == i) { return COLORS.MAIN_COLOR }
            else { return null }
        }
    }
    checkAnswerSelected(correct, i, index) {
        const { params } = this.props.navigation.state;

        if (params.answers[index] == i || correct == 1) {
            return true;
        }
        return false;

    }

    questionType(type, data, id, index) {
        const newData = data.map((item) => {
            return {
                ...item,
                label: item.content,
            }
        })

        return (
            <View style={{ marginLeft: 4, marginTop: 5 }}>

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
                                    isSelected={this.checkAnswerSelected(obj.correct, i, index)}
                                    onPress={() => { }}
                                    borderWidth={2}
                                    buttonInnerColor={this.checkAnswer(obj.correct, i, index)}
                                    buttonOuterColor={this.checkAnswer(obj.correct, i, index)}

                                    buttonWrapStyle={{ marginLeft: 10 }}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    labelHorizontal={true}
                                    onPress={() => { }}
                                    labelStyle={{ fontSize: 15, fontFamily: FONTS.MAIN_FONT }}
                                    labelWrapStyle={{}}
                                />
                            </RadioButton>
                        )
                    })}
                </RadioForm>
            </View>

        )
    }
    renderData() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        const { isLoading, error, examDetail } = testStore;
        if (isLoading) return <Loading />
        if (error) return <Error onPress={() => this.componentWillMount()} />
        return (
            <View style={{ flex: 1, marginBottom: 20 }}>
                <View style={{ justifyContent: "center", alignItems: "center", height: SIZES.DEVICE_HEIGHT_SIZE / 4 }}>
                    {
                        this.renderScore() < examDetail.questions.length ?
                            <PercentageCircle
                                children={<Text style={{ fontSize: 13, fontFamily: FONTS.MAIN_FONT }}>{this.renderScore() + "/" + examDetail.questions.length}</Text>}
                                radius={50}
                                borderWidth={10}
                                bgcolor = {"rgb(221, 219, 219)"}
                                percent={parseInt(this.renderScore() / examDetail.questions.length * 100)}
                                color={ parseInt(this.renderScore() / examDetail.questions.length * 100) == 0 ? "rgb(221, 219, 219)" : "#c50000"}>
                            </PercentageCircle>
                            :
                            <View style={[general.buttonDone, general.shadow]}>
                                <Icon
                                    name="MaterialIcons|done"
                                    size={50}
                                    color={'#FFF'}
                                    style={{ backgroundColor: 'transparent' }}
                                />
                            </View>

                    }

                    {this.renderScore() < examDetail.questions.length ?
                    <View style = {{ marginTop: 10}}>
                        <Text style={{ fontSize: 15, fontFamily: FONTS.MAIN_FONT_BOLD , color : "#000" }}>{"Bạn cần phải cố gắng hơn !!"}</Text>
                        </View>
                        :
                        <View style = {{ marginTop: 10}}>
                        <Text style={{ fontSize: 15, fontFamily: FONTS.MAIN_FONT_BOLD, color : "#000"}}>{"Bạn thật xuất sắc !!"}</Text>
                        </View>
                    }
                </View>
                <FlatList
                    horizontal={true}
                    ref="__list_questions"
                    style={{ marginTop: 20, marginLeft: 10 }}
                    data={examDetail.questions}
                    getItemLayout={(data, index) => (
                        { length: SIZES.DEVICE_WIDTH_SIZE / 5, offset: SIZES.DEVICE_WIDTH_SIZE / 5 * index, index }
                    )}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={{ width: SIZES.DEVICE_WIDTH_SIZE / 5, height: 40 }}
                            onPress={() => this.scroll(index)}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 15, fontFamily: this.state.questionNumber == index ? FONTS.MAIN_FONT_BOLD : FONTS.MAIN_FONT }}>{"Câu " + (index + 1)}</Text>
                                </View>
                                {item.answers[params.answers[index]].correct !== 1 ?
                                     <Icon
                                     name="FontAwesome|circle"
                                     size={8}
                                     color={"#c50000"}
                                     style={{ backgroundColor: 'transparent', marginLeft : 5 }}
                                 />
                                    : null
                                }
                            </View>

                            {
                                this.state.questionNumber == index
                                    ?
                                    <View style={{ width: SIZES.DEVICE_WIDTH_SIZE / 5, borderWidth: 1, borderColor: COLORS.BLUE_COLOR }}></View>
                                    : null
                            }
                        </TouchableOpacity>
                    )}
                />

                <FlatList
                    horizontal={true}
                    scrollEnabled={false}
                    ref={'__data'}
                    showsHorizontalScrollIndicator = {false}
                    style={{ marginTop: -SIZES.DEVICE_HEIGHT_SIZE / 5, marginLeft: 20 }}
                    data={examDetail.questions}
                    getItemLayout={(data, index) => (
                        { length: SIZES.DEVICE_WIDTH_SIZE, offset: SIZES.DEVICE_WIDTH_SIZE * index, index }
                    )}
                    renderItem={({ item, index }) => (
                        <View style={{ width: SIZES.DEVICE_WIDTH_SIZE, marginTop: 10 }}>
                            <View style={[general.wrapperRowCenter]}>
                                <View style={general.buttonQuestion}>
                                    <Text style={general.textDescriptionCardLight}>
                                        {"" + (index + 1)}
                                    </Text>
                                </View>
                                <Text
                                    style={[general.textTitleCard, general.paddingLR, general.marginRight]}>{examDetail.questions[index].content.trim()}</Text>


                            </View>
                            <View style={{ marginTop: 10 }}>
                                {
                                    this.questionType(item.type, item.answers, item.id, index)
                                }
                            </View>
                        </View>
                    )}
                />




            </View>

        )
    }


    render() {
        // const {} = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        const { questionNumber } = this.state;
        const { isLoading, error, examDetail } = testStore;
        return (
            <Container style={general.wrapperContainer}>
                <View style={[styles.wrapperHeader, styles.paddingLeftRight, { flexDirection: 'row' }]}>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Text numberOfLines={1} style={[styles.textHeaderScreen, { fontSize: 17, fontFamily: FONTS.MAIN_FONT_BOLD }]} numberOfLines={1}>
                            {examDetail.name}
                        </Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
                        onPress={() => {
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Test' })],

                            });
                            this.props.navigation.dispatch(resetAction);

                        }}
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

                {this.renderData()}
            </Container>
        );
    }
}