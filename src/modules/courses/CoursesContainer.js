import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl
} from 'react-native';
import styles from '../../styles/styles';
import { Container } from 'native-base';
import Header from '../../commons/Header';
import { STRINGS } from "../../constants";
import loginStore  from "../login/loginStore"
import Loading from '../../commons/Loading';
import { coursesStore } from './coursesStore';
import { observer } from "mobx-react";
import ListSubject from './ListCourses';
import Error from '../../commons/Error';
import TextNullData from '../../commons/TextNullData';
@observer
class CoursesContainer extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentWillMount() {
        coursesStore.getListSubject(1, '', loginStore.token)
    }
    getMoreSubjects() {
        if (coursesStore.current_page < coursesStore.total_pages && coursesStore.isLoading == false) {
            coursesStore.getListSubject(coursesStore.current_page + 1, "", loginStore.token)
        }
    }
    loadMore() {
        if (coursesStore.isLoading && coursesStore.current_page > 1 && coursesStore.subjects.length > 0)
            return (<Loading />)
        else
            return null
    }
    renderSubject() {
        if (coursesStore.subjects.length == 0) {
            return <Loading />
        }
        if (coursesStore.errorSubject) {
            return (
                <Error onPress={() => this.componentWillMount()} />
            )
        }
        if (coursesStore.subjects.length !== 0) {
            return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={coursesStore.subjects}
                    onEndReached={() => this.getMoreSubjects()}
                    refreshControl={
                        <RefreshControl
                            refreshing={coursesStore.isLoading}
                            onRefresh={
                                () => this.componentWillMount()
                            }
                        />
                    }
                    ListFooterComponent={
                        this.loadMore()
                    }
                    renderItem={({ item }) =>
                        <ListSubject item={item} navigation={this.props.navigation} />
                    }
                />
            )
        }
        if (coursesStore.subjects.length == 0 && coursesStore.isLoading == false && coursesStore.errorSubject == false) {
            return (
                <TextNullData text={NULL_DATA} />
            )
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={STRINGS.COURSE_TITLE_HEADER} navigate={navigate} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {this.renderSubject()}
                </View>
            </Container>
        );
    }
}
export default CoursesContainer