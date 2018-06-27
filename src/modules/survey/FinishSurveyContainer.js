import React, {Component} from 'react';
import {
    FlatList, Image, RefreshControl, Text, TouchableOpacity, View
} from 'react-native';
import {Container} from 'native-base';
import NextButton from '../../commons/NextButton';
import Loading from '../../commons/Loading';
import Icon from '../../commons/Icon';
import general from '../../Style/generalStyle';
import * as surveyAction from './surveyAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import IconDefault from '../../commons/IconDefault';
import styles from '../../styles/styles';
import { FONTS } from '../../constants';

class FinishSurveyContainer extends Component {
    constructor() {
        super();
        this.state = {
            questionNumber: 1,
        }
    }

    render() {
        // const {} = this.props.navigation.state.params;
        const {navigate} = this.props.navigation;
        const {questionNumber} = this.state;
        const {name, description, staff, today} = this.props.navigation.state.params;
        const {isLoadingCloseSurvey} = this.props;
        return (
            <Container style={general.wrapperContainer}>
                {/* <Header title={"Lịch sử khảo sát"} navigate={navigate} /> */}
                <View style={[styles.wrapperHeader, styles.paddingLeftRight, { flexDirection: 'row' }]}>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={[styles.textHeaderScreen, { fontSize: 17, fontFamily : FONTS.MAIN_FONT_BOLD }]} numberOfLines={1}>
                        {"Lịch sử khảo sát"}
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
                <View style={{flex: 1}}>
                    {
                        isLoadingCloseSurvey
                            ?
                            <Loading/>
                            :
                            <View>
                                <View style={general.marginLR}>
                                    <Text style={[general.textTitleBig, general.marginBottom]}>
                                        {name.toUpperCase()}
                                    </Text>
                                    <View style={general.wrapperRowCenter}>
                                        <Image style={general.imageCircleTiny}
                                               source={{uri: staff.avatar_url}}
                                        />
                                        <Text
                                            style={[general.textNameCard, general.paddingLine]}>&nbsp;&nbsp;{staff.name.toUpperCase()}
                                            <Text style={general.textTimeCard}>&nbsp;-&nbsp;
                                                {today}
                                            </Text>
                                        </Text>
                                    </View>
                                    <Text style={[general.textDescriptionCard, general.paddingLine]}>{description}</Text>
                                    <Text/>
                                </View>
                                <View style={general.wrapperCenter}>
                                    <View style={general.wrapperSpace}/>
                                    <View style={[general.buttonDone, general.shadow]}>
                                        <Icon
                                            name="MaterialIcons|done"
                                            size={50}
                                            color={'#FFF'}
                                            style={{backgroundColor: 'transparent'}}
                                        />
                                    </View>
                                    <View style={general.wrapperSpace}/>
                                    <View style={general.wrapperSpace}/>
                                    <Text style={general.textTitleBigThin}>HOÀN THÀNH!</Text>
                                    <View style={general.wrapperSpace}/>
                                    <Text style={general.textDescriptionCard}>Cuộc khảo sát hoàn tất</Text>
                                    <Text style={[general.textDescriptionCard, {textAlign: 'center'}]}>Cảm ơn bạn đã dành thời
                                        gian cho colorME</Text>

                                </View>
                            </View>

                    }

                </View>
                {/* <NextButton function={() => {
                    navigate('Survey')
                }}/> */}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoadingCloseSurvey: state.survey.isLoadingCloseSurvey
    }
}

function mapDispatchToProps(dispatch) {
    return {
        surveyAction: bindActionCreators(surveyAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishSurveyContainer);