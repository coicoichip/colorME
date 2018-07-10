import React, {Component} from 'react';
import {
    FlatList, Image, RefreshControl, Text, TouchableOpacity, View, Animated, Easing, Keyboard,
    Linking
} from 'react-native';
import {Container, Content, Item, Left, Right, Button, Input} from 'native-base';
import Icon from '../../commons/Icon';
import general from '../../Style/generalStyle';
import { STRINGS } from "../../constants";
import styles from '../../styles/styles';
import IconDefault from '../../commons/IconDefault';

class TestDetailContainer extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            today: '',
        }
    }

    componentWillMount() {
        this.getToday();
    }

    getToday() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = mm + '/' + dd + '/' + yyyy;
        return (this.setState({today: today}));
    }

    render() {
        const {navigate} = this.props.navigation;
        const {data} = this.props.navigation.state.params;
        return (
            <Container style={general.wrapperContainer}>
                <View style={[styles.wrapperHeader, styles.paddingLeftRight, { flexDirection: 'row' }]}>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={[styles.textHeaderScreen, { fontSize: 17 }]} numberOfLines={1}>
                        {data.name.toUpperCase()}
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
                    <View style={general.marginLR}>
                        <Text style={general.textDescriptionCard}>{data.description}</Text>
                    </View>
                    <View style={general.wrapperRowCenter}>
                        <Image style={general.imageCircleTiny}
                               source={{uri: data.user || ''}}
                        />
                    </View>
                    <View style={general.wrapperSpace}/>
                    <Image
                        style={general.imageFullWidth}
                        source={{uri: data.image_url}}
                    />
                    <View style={general.wrapperSpace}/>
                    <View style={general.marginLR}>
                        <Text style={[general.textTitleBig, general.marginBottom]}>NGƯỜI THỰC HIỆN KIỂM TRA</Text>
                        <View style={general.wrapperRowCenter}>
                            <Image style={general.imageCircleTiny}
                                   source={{uri: data.staff.avatar_url}}
                            />
                            <Text
                                style={[general.textNameCard, general.paddingLine]}>&nbsp;&nbsp;{data.staff.name.toUpperCase()}
                                <Text style={general.textTimeCard}>&nbsp;-&nbsp;
                                    {this.state.today}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </Content>
                <TouchableOpacity
                    // onPress={() => navigate('QuestionSurvey', {
                    //     id: data.id,
                    //     name: data.name,
                    //     description: data.description,
                    //     staff: data.staff,
                    //     questions_count: data.questions_count,
                    //     today: this.state.today
                    // })}
                    activeOpacity={0.9}
                    style={[general.buttonDownload, {backgroundColor: '#c50000', borderRadius: 0}]}>
                    <Text style={[general.textTitleCardLight, {fontSize: 16}]}
                          numberOfLines={1}>Bắt đầu</Text>
                    <Icon name="Feather|arrow-right" style={{paddingHorizontal: 16,}} color={"#FFF"} size={24}/>
                </TouchableOpacity>
            </Container>
        );
    }
}


export default (TestDetailContainer);