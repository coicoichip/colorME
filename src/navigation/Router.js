import React, { Component } from 'react';
import {
    Text, View, Image, StyleSheet
} from 'react-native';
import { STRINGS, COLORS, SIZES } from '../constants';
import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import NewsContainer from '../modules/news/NewsContainer';
import BaseContainer from '../modules/base/BaseContainer';
import NotificationContainer from '../modules/notification/NotificationContainer';
import ProfileContainer from '../modules/profile/ProfileContainer';
import SharingExperiencesContainer from '../modules/sharing-experiences/SharingExperiencesContainer';
import CoursesContainer from '../modules/courses/CoursesContainer';
import LearnRegisterContainer from '../modules/courses/LearnRegisterContainer';
import CourseInformation from '../modules/courses/CourseInFormation';
import IconDefault from '../commons/IconDefault';
import Icon from "../commons/Icon";
import DetailBlogContainer from "../modules/blogs/DetailBlogContainer"
import LoginContainer from '../modules/login/LoginContainer';
import RegisterContainer from '../modules/register/RegisterContainer';
import DrawerContainer from '../modules/drawer/DrawerContainer';
import BlogContainer from '../modules/blogs/BlogContainer';
import ListBlog from "../modules/blogs/ListBlog";
import ScheduleContainer from "../modules/schedule/ScheduleContainer";
import SplashContainer from "../modules/splash/SplashContainer";
import ResourceContainer from "../modules/blogs/ResourceContainer";
import styles from '../styles/styles';
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
        BlogContainer : {screen : BlogContainer},
        DetailBlog : {screen : DetailBlogContainer},
        ListBlog : {screen : ListBlog}
    }, { headerMode: 'none', mode: 'modal', initialRouteParams : {kind : 'blog'}}

);
const Profile = StackNavigator(
    {
        MyProfile: { screen: ProfileContainer },
    }, { initialRouteName: 'MyProfile', headerMode: 'none', mode: 'modal' }
);
const Resource = StackNavigator(
    {
        ResourceContainer : {screen : ResourceContainer},
        DetailBlog : {screen : DetailBlogContainer},
    }, {headerMode: 'none', mode: 'modal', initialRouteParams : {kind : 'resource', title : "TÀI NGUYÊN"}}

);
const Promotion = StackNavigator(
    {
        BlogContainer : {screen : BlogContainer},
        DetailBlog : {screen : DetailBlogContainer},
    }, {headerMode: 'none', mode: 'modal', initialRouteParams : {kind : 'promotion', title : "KHUYẾN MÃI"}}
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
    Resources: {
        screen: Resource,
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
    Blogs: {
        screen: Blog,
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
                            style={{ width:  SIZES.ICON_SIZE, height: SIZES.ICON_SIZE }} />
                    </View>
                )
            }
        },
        
    },
    Notification: {
        screen: NotificationContainer,
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
        initialRouteName: 'Blogs',
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
      navigationOptions: ({ navigation }) => ({
        title: "Tổng Quan"
      })
    },
    Promotion: {
      screen: Promotion,
      navigationOptions: ({ navigation }) => ({
        title: "Khuyến mãi"
      })
    },
    Base: {
      screen: BaseContainer,
      navigationOptions: ({ navigation }) => ({
        title: "Chỉ Đường"
      })
    },
    Schedule: {
      screen: ScheduleContainer,
      navigationOptions: ({ navigation }) => ({
        title: "Lịch Học"
      })
    }
  },
  {
    drawerWidth: SIZES.DEVICE_WIDTH_SIZE * 3 / 4,
    drawerPosition: "right",
    useNativeAnimations: "false",
    disableOpenGesture: false,
    drawerLockMode: "locked-closed",
    contentComponent: props => <DrawerContainer {...props} />
  }
);

export const RootStack = StackNavigator(
    { 
        Splash: { screen: SplashContainer },
        Login: { screen: LoginContainer },
        Register: { screen: RegisterContainer },
        Drawer: { screen: Drawer },
    },
    { headerMode: 'none', mode: 'card' }
);
