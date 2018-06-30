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
import * as size from '../../styles/sizes';
import loginStore from "../login/loginStore"
import Loading from '../../commons/Loading';
import { coursesStore } from './coursesStore';
import { drawerStore } from "../drawer/drawerStore"
import { observer } from "mobx-react";
import ListSubject from './ListCourses';
import Error from '../../commons/Error';
import TextNullData from '../../commons/TextNullData';
import Analytics from 'appcenter-analytics';

@observer
class CoursesContainer extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            category: 0,
            categogyArr: [
                { title: STRINGS.DESIGN, index: 0 },
                { title: STRINGS.PROGRAM, index: 1 },
            ]
        }
    }
    componentDidMount() {
        drawerStore.getProfile();
        coursesStore.getListSubject();
        Analytics.trackEvent(STRINGS.ACTION_ROOT_TAB_COURSE, {});
    }
    chooseCategory(index) {
        const { categogyArr } = this.state;
        this.setState({ category: index })
        if (index === 0) {
            this.setState({ isLoading: true })
            setTimeout(() => this.setState({ isLoading: false }), 500)
            coursesStore.data = coursesStore.subjects.filter(e =>
                e.categories[0].id === 1
            )
        Analytics.trackEvent(`${STRINGS.ACTION_CHOOSE_TAG_REGISTER_STUDY} : [${STRINGS.PROGRAM}]`, {});
            
        }
        else {
            this.setState({ isLoading: true })
            setTimeout(() => this.setState({ isLoading: false }), 500)
            coursesStore.data = coursesStore.subjects.filter(e =>
                e.categories[0].id === 2
            )
        }
        Analytics.trackEvent(`${STRINGS.ACTION_CHOOSE_TAG_REGISTER_STUDY} : [${STRINGS.DESIGN}]`, {});
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
    // getMoreSubjects() {
    //     if (coursesStore.current_page < coursesStore.total_pages && coursesStore.isLoadingSubject == false) {
    //         coursesStore.getListSubject()
    //     }
    // }
    // loadMore() {
    //     if (coursesStore.isLoadingSubject && coursesStore.current_page > 1 && coursesStore.subjects.length > 0)
    //         return (<Loading />)
    //     else
    //         return null
    // }
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
                    ref={'listSubject'}
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={coursesStore.data}
                    // onEndReached={() => this.getMoreSubjects()}
                    // ListFooterComponent={
                    //     this.loadMore()
                    // }
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
    scrollListCourses() {
        this.refs.listSubject.scrollToOffset({ x: 0, y: 0, animated: true })
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={STRINGS.COURSE_TITLE_HEADER} navigate={navigate} onPress={() => this.scrollListCourses()} />
                {this.__renderCategory()}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    {this.renderSubject()}
                </View>
            </Container>
        );
    }
}
export default CoursesContainer
const wrapperCenter = {
    alignItems: 'center',
    justifyContent: 'center',
};
const textLogo = {
    fontFamily: FONTS.LOGO_FONT,
    backgroundColor: COLORS.NONE_COLOR,
    color: COLORS.LIGHT_COLOR,
}
const buttonTab = {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 13,
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: SIZES.DESCRIPTION_SIZE,
    fontFamily: FONTS.FONT_MAIN,
    color: color.BACKGROUND_COLOR,
};

const styles = StyleSheet.create({
    wrapperContainer: {
        flex: 1,
        backgroundColor: color.BACKGROUND_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonSelected: {
        ...buttonTab,
        backgroundColor: 'black',
        fontFamily: FONTS.FONT_MAIN_BOLD
    },
    buttonNotSelect: {
        ...buttonTab,
        backgroundColor: color.NONE_COLOR,
        color: color.TEXT_COLOR
    },
});