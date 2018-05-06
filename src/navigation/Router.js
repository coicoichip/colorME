import React, {Component} from 'react';
import {
    Text, View
} from 'react-native';
import * as color from "../styles/colors";
import * as size from "../styles/sizes";
import styles from "../styles/styles";
import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import NewsContainer from '../modules/news/NewsContainer';
import NotificationContainer from '../modules/notification/NotificationContainer';
import ProfileContainer from '../modules/profile/ProfileContainer';
import SharingExperiencesContainer from '../modules/sharing-experiences/SharingExperiencesContainer';
import CoursesContainer from '../modules/courses/CoursesContainer';
import IconDefault from '../commons/IconDefault';
import Icon from "../commons/Icon"
import LoginContainer from '../modules/login/LoginContainer';
import RegisterContainer from '../modules/register/RegisterContainer';
import DrawerContainer from '../modules/drawer/DrawerContainer';
const Tab = TabNavigator({
    Course: { 
        screen: CoursesContainer,
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
    News: { 
        screen: NewsContainer,
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
                    <Icon name={"FontAwesome|circle"} size={10} color={color.MAIN_COLOR} style={{ position: "absolute", backgroundColor: 'transparent', top: 10, right: size.deviceWidth / 15 }} />
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
        initialRouteName: 'News',
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
    New: {
        screen: NewsContainer,
        navigationOptions: ({ navigation }) => ({
            title: 'Tin Tuc',
        })
    }
},
    {
        contentOptions: {
            activeTintColor: "red",
        },
        drawerWidth: 300,
        drawerPosition: 'right',
        useNativeAnimations: 'false',
        disableOpenGesture: false,
        drawerLockMode: 'locked-closed',
        // contentComponent: props => (<DrawerContainer {...props} />)
    });

export const RootStack = StackNavigator(
    {
        Login : {screen : LoginContainer},
        Register : {screen : RegisterContainer},
        Drawer: { screen: Drawer },
         
        
    },
    { headerMode: 'none' }
);
