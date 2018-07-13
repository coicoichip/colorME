import React, {Component} from 'react';
import {
    FlatList, Image, RefreshControl, Text, TouchableOpacity, View
} from 'react-native';
import {Container} from 'native-base';
;
import Loading from '../../commons/Loading';
import Icon from '../../commons/Icon';
import general from '../../Style/generalStyle';

import IconDefault from '../../commons/IconDefault';
import styles from '../../styles/styles';
import { FONTS } from '../../constants';
import testStore from "./testStore";
import Error from "../../commons/Error";
import { observer } from 'mobx-react';
import getProfileStore from "../../modules/profile/profileStore"
@observer
export default class FinalTestQuestion extends Component {
    constructor() {
        super();
        this.state = {
            questionNumber: 1,
        }
    }

    componentWillMount(){
        const {params} = this.props.navigation.state;
        testStore.postAnswer(params.id, params.post_answers, getProfileStore.user);

    }

    renderScore() {
        const {params} = this.props.navigation.state;
        const {examDetail} = testStore ;
        let score = 0;
        for (let i = 0; i < examDetail.questions.length; i++){
           score += examDetail.questions[i].answers[params.answers[i]].correct;
        }
        return score;
    }

    render() {
        // const {} = this.props.navigation.state.params;
        const {navigate} = this.props.navigation;
        const {name, description, staff, today} = this.props.navigation.state.params;
        const {isLoading, error, examDetail} = testStore;
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
                        isLoading
                            ?
                            <Loading/>
                            :

                            error
                            ?
  <Error onPress = {() => this.componentWillMount()} />
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
                                    <Text style={general.textDescriptionCard}>Bài kiểm tra hoàn tất</Text>
                                    <Text style={general.textDescriptionCard}>{"Số điểm bạn đạt được là: " + this.renderScore() + "/" + examDetail.questions.length}</Text>
                                    <Text style={[general.textDescriptionCard, {textAlign: 'center'}]}> Các bạn có thể quay lại để xem đáp án</Text>

                                </View>
                            </View>

                    }

                </View>
                {/* <NextButton function={() => {
                    
                }}/> */}
            </Container>
        );
    }
}