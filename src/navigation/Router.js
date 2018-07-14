import React, { Component } from 'react';
import {
    Text, View, Image, StyleSheet
} from 'react-native';
import { STRINGS, COLORS, SIZES } from '../constants';
import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import BaseContainer from '../modules/base/BaseContainer';
import NotificationContainer from '../modules/notification/NotificationContainer';
import ProfileContainer from '../modules/profile/ProfileContainer';
import SharingExperiencesContainer from '../modules/sharing-experiences/SharingExperiencesContainer';
import CoursesContainer from '../modules/courses/CoursesContainer';
import LearnRegisterContainer from '../modules/courses/LearnRegisterContainer';
import CourseInformation from '../modules/courses/CourseInFormation';
import DetailLecture from '../modules/lecture/DetailLecture';
import SurveyContainer from '../modules/survey/SurveyContainer';
import DetailSurveyContainer from '../modules/survey/DetailSurveyContainer';
import HistorySurveyContainer from '../modules/survey/HistorySurveyContainer';
import DetailHistorySurveyContainer from '../modules/survey/DetailHistorySurveyContainer';
import QuestionSurveyContainer from '../modules/survey/QuestionSurveyContainer';
import FinishSurveyContainer from '../modules/survey/FinishSurveyContainer';
import IconDefault from '../commons/IconDefault';
import Icon from "../commons/Icon";
import DetailBlogContainer from "../modules/blogs/DetailBlogContainer"
import LoginContainer from '../modules/login/LoginContainer';
import RegisterContainer from '../modules/register/RegisterContainer';
import DrawerContainer from '../modules/drawer/DrawerContainer';
import BlogContainer from '../modules/blogs/BlogContainer';
import ListBlog from "../modules/blogs/ListBlog";
import ScheduleContainer from "../modules/schedule/ScheduleContainer";
import LectureContainer from '../modules/lecture/LectureContainer';
import SplashContainer from "../modules/splash/SplashContainer";
import ResourceContainer from "../modules/blogs/ResourceContainer";
import styles from '../styles/styles';
import StudyContainer from "../modules/study/StudyContainer";
import SupportContainer from "../modules/support/SupportContainer";
import RequestFunction from "../modules/support/RequestFunction";
import FeedbackTeacher from "../modules/support/FeedbackTeacher";
import ProductsContainer from '../modules/products/ProductsContainer';
import ReplyCommentContainer from '../modules/comment/ReplyCommentContainer';
import TopicContainer from '../modules/notification/TopicContainer';
import TestContainer from '../modules/test/TestContainer';
import TestDetailContainer from '../modules/test/TestDetailContainer';
import QuestionTestContainer from '../modules/test/QuestionTestContainer';
import FinalTestQuestion from "../modules/test/FinalTestQuestion";
import DetailProductsContainer from "../modules/products/DetailProductsContainer";
const StackNavigatorStyle = {
    navigationOptions: {
        header: null,
    },
};
const Courses = StackNavigator(
    {
        CourseList: { screen: CoursesContainer },
        CourseInFormation: { screen: CourseInformation },
        LearnRegister: { screen: LearnRegisterContainer },
    }, { headerMode: 'none', mode: 'modal' }
);
const Blog = StackNavigator(
    {
        BlogContainer: { screen: BlogContainer, path: "blogContainer" },
        DetailBlog: { screen: DetailBlogContainer },
        ListBlog: { screen: ListBlog },
    }, { headerMode: 'none', mode: 'modal', initialRouteParams: { kind: 'blog' } }

);
const Profile = StackNavigator(
    {
        MyProfile: { screen: ProfileContainer, path: "myProfile" },
        DetailBlog: { screen: DetailBlogContainer },
    }, { initialRouteName: 'MyProfile', headerMode: 'none', mode: 'modal' }
);
const Resource = StackNavigator(
    {
        ResourceContainer: { screen: ResourceContainer },
        DetailBlog: { screen: DetailBlogContainer },
    }, { headerMode: 'none', mode: 'modal', initialRouteParams: { kind: 'resource', title: "Tài nguyên" } }

);
const Lecure = StackNavigator(
    {
        LectureContainer: { screen: LectureContainer },
        DetailLecture: { screen: DetailLecture }
    },
    {
        headerMode: "none",
        mode: "modal",
        initialRouteParams: { kind: "lecture", title: "GIÁO TRÌNH" }
    }
);
const Study = StackNavigator(
    {
        StudyContainer: { screen: StudyContainer }
    },
    {
        headerMode: "none",
        mode: "modal",
        initialRouteParams: { kind: "study", title: "HỌC TẬP" }
    }
);
const Promotion = StackNavigator(
    {
        BlogContainer: { screen: BlogContainer },
        DetailBlog: { screen: DetailBlogContainer },
        // ReplyComment: { screen: ReplyCommentContainer},
    }, { headerMode: 'none', mode: 'modal', initialRouteParams: { kind: 'promotion', title: "Khuyến mãi" } }
)
const Notifications = StackNavigator(
    {
        NotificationContainer: { screen: NotificationContainer, path: "notification" },
        DetailBlog: { screen: DetailBlogContainer, path: "product/:id" },
        TopicInNotification: { screen: TopicContainer }
    }, { headerMode: 'none', mode: 'modal' }
)
const Survey = StackNavigator(
    {
        Survey: { screen: SurveyContainer },
        DetailSurvey: { screen: DetailSurveyContainer },
        QuestionSurvey: { screen: QuestionSurveyContainer },
        HistorySurvey: { screen: HistorySurveyContainer },
        DetailHistorySurvey: { screen: DetailHistorySurveyContainer },
        FinishSurvey: { screen: FinishSurveyContainer },
    }, { headerMode: 'none', mode: 'modal', initialRouteParams: { kind: 'promotion', title: "Khảo sát" } }
)

const Products = StackNavigator({
    Products: { screen: ProductsContainer },
    DetailProducts: { screen: DetailProductsContainer},
    DetailBlog: { screen: DetailBlogContainer, path: "product/:id" },
    ListBlog: { screen: ListBlog },
    // ReplyComment: { screen: ReplyCommentContainer},
}, { headerMode: 'none', mode: 'modal', initialRouteParams: { kind: 'post' } })

const Exam = StackNavigator(
    {
        Test: { screen: TestContainer, path: "test" },
        TestDetail: { screen : TestDetailContainer},
        QuestionTest: { screen : QuestionTestContainer},
        FinalTest : {screen : FinalTestQuestion}
    }, { headerMode: 'none', mode: 'modal' }
)
const Tab = TabNavigator({
    Course: {
        screen: Courses,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                let source;
                if (tintColor == 1) {
                    source = require('../../assets/icons/add_enable.png')
                } else {
                    source = require('../../assets/icons/add_disable.png');
                }
                return (
                    <View style={styles.wrapperIconTabNavigator}>
                        <Image
                            source={source}
                            style={{ width: SIZES.ICON_SIZE, height: SIZES.ICON_SIZE }} />
                    </View>
                )
            }

        }
    },
    Study: {
        screen: Study,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {

                let source;
                if (tintColor == 1) {
                    source = require('../../assets/icons/goal_enable.png')
                } else {
                    source = require('../../assets/icons/goal_disable.png');
                }
                return (
                    <View style={styles.wrapperIconTabNavigator}>
                        <Image
                            source={source}
                            style={{ width: SIZES.ICON_SIZE, height: SIZES.ICON_SIZE }} />
                    </View>
                )
            }
        }
    },
    Products: {
        screen: Products,
        path: "products",
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {

                let source;
                if (tintColor == 1) {
                    source = require('../../assets/icons/news_enable.png')
                } else {
                    source = require('../../assets/icons/news_disable.png');
                }
                return (
                    <View style={styles.wrapperIconTabNavigator}>
                        <Image
                            source={source}
                            style={{ width: SIZES.ICON_SIZE, height: SIZES.ICON_SIZE }} />
                    </View>
                )
            }
        },

    },
    Notification: {
        screen: Notifications,
        path: "notifications",
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                let source;
                if (tintColor == 1) {
                    source = require('../../assets/icons/bell_enable.png')
                } else {
                    source = require('../../assets/icons/bell_disable.png');
                }
                return (
                    <View style={styles.wrapperIconTabNavigator}>
                        <Image
                            source={source}
                            style={{ width: SIZES.ICON_SIZE, height: SIZES.ICON_SIZE }} />
                    </View>
                )
            }
        }
    },
    Profile: {
        screen: Profile,
        path: "profile",
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {

                let source;
                if (tintColor == 1) {
                    source = require('../../assets/icons/user_enable.png')
                } else {
                    source = require('../../assets/icons/user_disable.png');
                }
                return (
                    <View style={styles.wrapperIconTabNavigator}>
                        <Image
                            source={source}
                            style={{ width: SIZES.ICON_SIZE, height: SIZES.ICON_SIZE }} />
                    </View>
                )
            }
        }
    },
},
    {
        initialRouteName: 'Products',
        tabBarPosition: 'bottom',
        animationEnabled: false,
        tabBarOptions: {
            indicatorStyle: { backgroundColor: COLORS.NONE_COLOR },
            showIcon: true,
            activeTintColor: 1,
            style: {
                borderTopWidth: 0.3,
                borderTopColor: COLORS.BORDER_COLOR,
                backgroundColor: COLORS.BACKGROUND_GRAY,
            },
            showLabel: false,
        }

    });

const Drawer = DrawerNavigator(
    {
        OverView: {
            screen: Tab,
            path: "overview",
            navigationOptions: ({ navigation }) => ({
                title: "Tổng Quan"
            })
        },
        Blogs: {
            screen: Blog,
            path: "blogs",
            navigationOptions: ({ navigation }) => ({
                title: "Bài viết"
            })
        },
        Lectures: {
            screen: Lecure,
            navigationOptions: ({ navigation }) => ({
                title: "Giáo trình"
            })

        },
        Survey: {
            screen: Survey,
            navigationOptions: ({ navigation }) => ({
                title: "Khảo sát"
            })
        },
        HistorySurveys: {
            screen: HistorySurveyContainer,
            navigationOptions: ({ navigation }) => ({
                title: "Lịch sử khảo sát"
            })
        },
        Promotion: {
            screen: Promotion,
            navigationOptions: ({ navigation }) => ({
                title: "Khuyến mãi"
            })
        },
        Resource: {
            screen: Resource,
            navigationOptions: ({ navigation }) => ({
                title: "Tài nguyên"
            })
        },
        Base: {
            screen: BaseContainer,
            navigationOptions: ({ navigation }) => ({
                title: "Chỉ Đường"
            })
        },
        Exam: {
            screen: Exam,
            navigationOptions: ({ navigation }) => ({
                title: "Kiểm tra"
            })
        },
        Support: {
            screen: SupportContainer,
            navigationOptions: ({ navigation }) => ({
                title: "Hỗ trợ - Báo lỗi"
            })
        },
        RequestFunction: {
            screen: RequestFunction,
            navigationOptions: ({ navigation }) => ({
                title: "Yêu cầu tính năng"
            })
        },
        FeedbackTeacher: {
            screen: FeedbackTeacher,
            navigationOptions: ({ navigation }) => ({
                title: "Nhận xét giảng viên"
            })
        }
    },
    {
        drawerWidth: SIZES.DEVICE_WIDTH_SIZE * 3 / 4,
        drawerPosition: "right",
        useNativeAnimations: "false",
        disableOpenGesture: false,
        drawerLockMode: "locked-closed",
        contentOptions: {
            activeTintColor: COLORS.MAIN_COLOR,
        },

        contentComponent: props => <DrawerContainer {...props} />
    }
);

export const RootStack = StackNavigator(
    {
        Splash: { screen: SplashContainer },
        Login: { screen: LoginContainer, path: "login" },
        Register: { screen: RegisterContainer },
        ReplyComment: { screen: ReplyCommentContainer },
        Drawer: { screen: Drawer, path: "main" },
    },
    { headerMode: 'none', mode: 'card' }
);
