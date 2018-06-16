import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl, StyleSheet
} from 'react-native';
import { Container, Item, Content } from 'native-base';
import Header from '../../commons/Header';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import * as color from '../../styles/colors';
import Loading from '../../commons/Loading';
import { lectureStore } from './lectureStore';
import { observer } from "mobx-react";
import ListLeture from './ListLeture';
import Error from '../../commons/Error';
import TextNullData from '../../commons/TextNullData';

@observer
class LectureContainer extends Component {

    constructor() {
        super();
    }
    componentDidMount() {
        lectureStore.getAllLecture();
    }

    renderSubject() {
        if (lectureStore.isLoading ) {
            return <Loading />
        }
        if (lectureStore.data && lectureStore.data.length > 0) {
            return (
                <FlatList
                    ref={'allLecture'}
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={lectureStore.data}
                    renderItem={({ item }) =>
                        <ListLeture item={item} navigation={this.props.navigation} />
                    }
                />
            )
        }
    }
    scrollListCourses() {
        this.refs.allLecture.scrollToOffset({ x: 0, y: 0, animated: true })
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={STRINGS.LECTURE_HEADER} navigate={navigate} onPress={() => this.scrollListCourses()} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    {this.renderSubject()}
                </View>
            </Container>
        );
    }
}
export default LectureContainer;

const styles = StyleSheet.create({
    wrapperContainer: {
        flex: 1,
        backgroundColor: color.BACKGROUND_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
});