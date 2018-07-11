import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl, StyleSheet, Platform
} from 'react-native';
import { Container, Item, Content } from 'native-base';
import Header from '../../commons/Header';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import Loading from '../../commons/Loading';
import testStore from './testStore';
import { observer } from "mobx-react";
import general from '../../Style/generalStyle';
import Error from '../../commons/Error';
@observer
class TestContainer extends Component {
    componentWillMount() {
        testStore.getExam();
    }
    render() {
        const { navigate } = this.props.navigation;
        const { exams, isLoadingExam } = testStore;
        console.log(isLoadingExam);
        return (
            <Container style={general.wrapperContainer}>
                <Header title={STRINGS.TEST} navigate={navigate} />
                <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFF'}}>
                    {
                        isLoadingExam ? <Loading /> :
                            <FlatList
                                keyExtractor={(item, key) => key + ''}
                                ref="listRef"
                                showsVerticalScrollIndicator={false}
                                data={exams}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={false}
                                    />
                                }
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => navigate('TestDetail', { data: item })}
                                        activeOpacity={1}
                                        style={{ paddingHorizontal: 16, marginBottom: 24, width: SIZES.DEVICE_WIDTH_SIZE - 32 }}>
                                        <Image
                                            style={[general.imageFeature]}
                                            source={{ uri: item.image_url }} />
                                        <View style={general.wrapperSpace} />
                                        <Text style={general.textTitleCard}>{item.name.toUpperCase()}</Text>
                                        <View style={general.wrapperRowCenter}>
                                            <Image style={general.imageCircleTiny}
                                                source={{ uri: item.staff ? item.staff.avatar_url : '' }}
                                            />
                                            <Text
                                                style={[general.textNameCard, general.paddingLine]}>&nbsp;&nbsp;{item.staff ? item.staff.name.toUpperCase() : ''}<Text
                                                    style={general.textTimeCard}>&nbsp;-&nbsp;{item.created_at}</Text></Text>
                                        </View>
                                        <Text
                                            style={[general.textDescriptionCard, general.marginBottom]}>{item.description}</Text>
                                        <View style={[general.wrapperProcessDark, general.marginTop]}>
                                            <View
                                                style={[general.process, { width: item.target > item.take ? (SIZES.DEVICE_WIDTH_SIZE - 80) / item.target * item.take : (SIZES.DEVICE_WIDTH_SIZE - 80) }]} />
                                        </View>
                                        <View style={[general.wrapperSpace, general.marginBottom]} />
                                        <Text style={[general.categoryInImage, general.textDescriptionCardLight, { right: 20 }]}>
                                            {item.questions_count} câu hỏi
                                    </Text>
                                        <Text style={[general.textTimeCard, {
                                            position: 'absolute',
                                            bottom: 10,
                                            left: 20,
                                        }]}>
                                            {item.take} / {item.target}
                                        </Text>
                                        <View style={general.wrapperSpace} />
                                    </TouchableOpacity>
                                }
                            />
                    }
                </View>
            </Container>
        )
    }
}
export default TestContainer;