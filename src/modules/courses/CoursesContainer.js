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
import { Container, Item, Content } from 'native-base';
import Header from '../../commons/Header';
import { STRINGS } from "../../constants";
import loginStore from "../login/loginStore"
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
            category: 0,
            categogyArr: [
                { title: "Thiết kế", index: 0, status: "" },
                { title: "Lập trình", index: 1, status: "1" },
            ]
        }
    }
    componentWillMount() {
        coursesStore.getListSubject(1, '', loginStore.token)
    }
    chooseCategory(index, status) {
        this.setState({ id: status })
        this.setState({ category: index })
        // this.refs.__data.scrollTo({ x: deviceWidth * index, y: 0, animated: false })
        // this.props.emailAction.getListEmail(1, this.props.token, status, "search");
    }
    __renderCategory = () => {
        return (
            <View height={40} >
                <Content
                    horizontal={true}
                    style={[styles.paddingLeftRight]}>
                    {
                        this.state.categogyArr.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    activeOpacity={0.9}
                                    onPress={() => this.chooseCategory(item.index, item.status)}
                                >
                                    <View style={{marginRight: 10}}>
                                        <Text style={this.state.category == item.index ? styles.buttonSelected : styles.buttonNotSelect}>{item.title}</Text>
                                        </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </Content>
            </View>
        )
    }
    getMoreSubjects() {
        if (coursesStore.current_page < coursesStore.total_pages && coursesStore.isLoadingSubject == false) {
            coursesStore.getListSubject(coursesStore.current_page + 1, "", loginStore.token)
        }
    }
    loadMore() {
        if (coursesStore.isLoadingSubject && coursesStore.current_page > 1 && coursesStore.subjects.length > 0)
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
                            refreshing={coursesStore.isLoadingSubject}
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
        if (coursesStore.subjects.length == 0 && coursesStore.isLoadingSubject == false && coursesStore.errorSubject == false) {
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
                {this.__renderCategory()}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    {this.renderSubject()}
                </View>
            </Container>
        );
    }
}
export default CoursesContainer