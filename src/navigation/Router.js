import React, {Component} from 'react';
import {
    Text, View
} from 'react-native';
import * as color from "../styles/colors";
import * as size from "../styles/sizes";
import styles from "../styles/styles";
import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import BlogContainer from '../modules/blogs/BlogContainer';
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
const StackNavigatorStyle = {
    navigationOptions: {
        header: null,
    },
};
const Courses = StackNavigator(
    {
        CourseList: {screen: CoursesContainer},
        CourseInFormation: {screen: CourseInformation, navigationOptions: {tabBarVisible: false,}},
        LearnRegister: {screen: LearnRegisterContainer, navigationOptions: {tabBarVisible: false,}},
    }, StackNavigatorStyle, { initialRouteName: 'CourseList',}
);
const Blog = StackNavigator({
    BlogContainer : {screen : BlogContainer},
    DetailBlog : {screen : DetailBlogContainer}
} , StackNavigatorStyle, { initialRouteName: 'BlogContainer'})
const Tab = TabNavigator({
    Course: { 
        screen: Courses,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View style={styles.wrapperIconTabNavigator}>
                    <IconDefault
                        name="FontAwesome|graduation-cap" size={size.ICON_SIZE + 3}
                        color={tintColor}
                    />
                </View>
            )
        }
    },
    SharingExperiences: { 
        screen: SharingExperiencesContainer,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View style={styles.wrapperIconTabNavigator}>
                    <IconDefault
                        name="FontAwesome|qrcode" size={size.ICON_SIZE + 3}
                        color={tintColor}
                    />
                </View>
            )
        }
    },
    Blog: { 
        screen: Blog,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View style={styles.wrapperIconTabNavigator}>
                    <IconDefault
                        name="FontAwesome|bandcamp" size={size.ICON_SIZE + 3}
                        color={tintColor}
                    />
                </View>
            )
        } 
    },
    Notification: { 
        screen: NotificationContainer,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View style={styles.wrapperIconTabNavigator}>
                    <IconDefault
                        name="FontAwesome|bell-o" size={size.ICON_SIZE}
                        color={tintColor}
                    />
                    <Icon name={"FontAwesome|circle"} size={10} color={color.MAIN_COLOR} style={{ position: "absolute", backgroundColor: 'transparent', top: 13, right: size.deviceWidth / 14 }} />
                </View>
            ),
        }
    },
    Profile: { 
        screen: ProfileContainer,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View style={styles.wrapperIconTabNavigator}>
                    <IconDefault
                        name="FontAwesome|user-o" size={size.ICON_SIZE + 3}
                        color={tintColor}
                    />
                </View>
            )
        } 
    },
},
    {
        indicatorStyle: {
            border: 5,
            backgroundColor: color.NONE_COLOR,
        },
        initialRouteName: 'Blog',
        tabBarPosition: 'bottom',
        animationEnabled: true,

        tabBarOptions: {
            indicatorStyle: { backgroundColor: 'transparent' },
            showIcon: true,
            activeTintColor: color.TEXT_COLOR,
            inactiveTintColor: color.DISABLE_COLOR,
            style: {
                borderTopWidth: 0.5,
                borderTopColor: color.DISABLE_COLOR,
                backgroundColor: 'rgb(254, 254, 254)',
            },
            showLabel: false,
        }

    });
const Drawer = DrawerNavigator({
    OverView: {
        screen: Tab,
        navigationOptions: ({ navigation }) => ({
            title: 'Tổng Quan',
        })

    },
    Blog: {
        screen: BlogContainer,
        navigationOptions: ({ navigation }) => ({
            title: 'Tin Tuc',
        })
    }
},
    {
        contentOptions: {
            activeTintColor: "red",
        },
        drawerWidth: size.deviceWidth*3/4,
        drawerPosition: 'right',
        useNativeAnimations: 'false',
        disableOpenGesture: false,
        drawerLockMode: 'locked-closed',
        contentComponent: props => (<DrawerContainer {...props} />)
    });

export const RootStack = StackNavigator(
    {
        Login : {screen : LoginContainer},
        Register : {screen : RegisterContainer},
        Drawer: { screen: Drawer },
    },
    { headerMode: 'none' }
);
