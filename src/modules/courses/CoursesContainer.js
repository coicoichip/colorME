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
            isLoading: false,
            subjects: [],
            category: 0,
            categogyArr: [
                { title: "Thiết kế", index: 0 },
                { title: "Lập trình", index: 1 },
            ]
        }
    }
    componentWillMount() {
        coursesStore.getListSubject(1, '', loginStore.token)
        if (coursesStore.subjects.length > 0) this.setState({
            subjects: coursesStore.subjects.filter(e =>
                e.type_id === 1
            )
        })
    }
    chooseCategory(index) {
        this.setState({ category: index })
        if (index === 0) {
            this.setState({ isLoading: true })
            setTimeout(() => this.setState({ isLoading: false }), 500)
            coursesStore.data = coursesStore.subjects.filter(e =>
                e.type_id === 1
            )
        }
        else {
            this.setState({ isLoading: true })
            setTimeout(() => this.setState({ isLoading: false }), 500)
            coursesStore.data = coursesStore.subjects.filter(e =>
                e.type_id === 2
            )
        }
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
                                    onPress={() => this.chooseCategory(item.index)}
                                >
                                    <View style={{ marginRight: 10 }}>
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
        if (coursesStore.data.length == 0 || this.state.isLoading) {
            return <Loading />
        }
        if (coursesStore.errorSubject) {
            return (
                <Error onPress={() => this.componentWillMount()} />
            )
        }
        if (coursesStore.data.length !== 0) {
            return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={coursesStore.data}
                    onEndReached={() => this.getMoreSubjects()}
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