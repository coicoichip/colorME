import React, {Component} from 'react';
import {
    Text, View
} from 'react-native';
import * as color from "../styles/colors";
import * as size from "../styles/sizes";
import styles from "../styles/styles";
import IconDefault from '../commons/IconDefault';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import LoginContainer from '../modules/login/LoginContainer';
// import RegisterContainer from '../modules/register/RegisterContainer';
import BlogContainer from "../modules/blog/BlogContainer"
import DetailBlog from '../modules/blog/detailBlog';
import DrawerContainer from "../modules/drawer/DrawerContainer"
import Icon from "../commons/Icon"
import BaseContainer from "../modules/base/BaseContainer"
import ProfileContainer from "../modules/profile/ProfileContainer";
// import HistoryShiftRegisterContainer from "../modules/history-shift-register/HistoryShiftRegisterContainer";

const TAB_BAR_HEIGHT = 50;

        // const Home = TabNavigator(
        //     {
        //         Attendance: {
        //             screen: ClassListAttendanceContainer,
        //             navigationOptions: {
        //                 tabBarIcon: ({ tintColor }) => (
        //                     <View style={styles.wrapperIconTabNavigator}>
        //                         <IconDefault
        //                             name="FontAwesome|qrcode" size={size.ICON_SIZE + 3}
        //                             color={tintColor}
        //                         />
        //                     </View>
        //                 )
        //             }
        //         },
        //         RegisterShift: {
        //             screen: RegisterShiftContainer,
        //             navigationOptions: {
        //                 tabBarIcon: ({ tintColor }) => (
        //                     <View style={styles.wrapperIconTabNavigator}>
        //                         <IconDefault
        //                             name="Feather|check-circle" size={size.ICON_SIZE}
        //                             color={tintColor}
        //                         />
        //                     </View>
        //                 )
        //             }
        //         },
        //         Overview: {
        //             screen: OverviewContainer,
        //             navigationOptions: {
        //                 tabBarIcon: ({ tintColor }) => (
        //                     <View style={styles.wrapperIconTabNavigator}>
        //                         <IconDefault
        //                             name="MaterialCommunityIcons|view-dashboard" size={size.ICON_SIZE + 5}
        //                             color={tintColor}
        //                         />
        //                     </View>
        //                 ),
        //             }
        //         },
        //         Notification: {
        //             screen: NotificationContainer,
        //             navigationOptions: {
        //                 tabBarIcon: ({ tintColor }) => (
        //                     <View style={styles.wrapperIconTabNavigator}>
        //                         <IconDefault
        //                             name="FontAwesome|bell-o" size={size.ICON_SIZE}
        //                             color={tintColor}
        //                         />
        //                         <Icon name={"FontAwesome|circle"} size={10} color={color.MAIN_COLOR} style={{ position: "absolute", backgroundColor: 'transparent', top: 10, right: size.deviceWidth / 15 }} />
        //                     </View>
        //                 ),
        //             }
        //         },
        //         User: {
        //             screen: UserContainer,
        //             navigationOptions: {
        //                 tabBarIcon: ({ tintColor }) => (
        //                     <View style={styles.wrapperIconTabNavigator}>
        //                         <IconDefault
        //                             name="FontAwesome|user-o" size={size.ICON_SIZE}
        //                             color={tintColor}
        //                         />
        //                     </View>
        //                 ),
        //             }
        //         },
        //     },
        //     {
        //         indicatorStyle: {
        //             border: 5,
        //             backgroundColor: color.NONE_COLOR,
        //         },
        //         initialRouteName: 'Overview',
        //         tabBarPosition: 'bottom',
        //         animationEnabled: true,
        //
        //         tabBarOptions: {
        //             indicatorStyle: { backgroundColor: 'transparent' },
        //             showIcon: true,
        //             activeTintColor: color.TEXT_COLOR,
        //             inactiveTintColor: color.DISABLE_COLOR,
        //             style: {
        //                 borderTopWidth: 0.5,
        //                 borderTopColor: color.DISABLE_COLOR,
        //                 backgroundColor: 'rgb(254, 254, 254)',
        //             },
        //             showLabel: false,
        //         }
        //     }
        // );




        const Blogs = StackNavigator({
            Blog: { screen: BlogContainer },
            detailBlog: { screen: DetailBlog }
        }, { headerMode: 'none', initialRouteParams: { idRoute: 88 } }, );

        const Bases = StackNavigator({
            Base: { screen: BaseContainer },
        }, {
                headerMode: 'none', mode: 'modal', initialRouteParams: {
                    idRoute: 22
                }
            }, );






       export const Drawer = DrawerNavigator({


           Blog: {
               screen: Blogs,
               navigationOptions: ({navigation}) => ({
                   title: 'Bài viết',
               })
           },

           Base: {
               screen: Bases,
               navigationOptions: ({navigation}) => ({
                   title: "Cơ sở",
               })
           }
       },{
                contentOptions: {
                    activeTintColor: color.MAIN_COLOR,
                },
                drawerWidth: size.deviceWidth * 3 / 4,
                drawerPosition: 'right',
                useNativeAnimations: 'false',
                disableOpenGesture: false,
                drawerLockMode: 'locked-closed',
                contentComponent: (props, {navigation}) => {
                     return (<DrawerContainer navigation = {navigation}  {...props} />)
                }


            });

           export const Main = StackNavigator(
                {
                    Login: { screen: LoginContainer },
                    // Register: { screen: RegisterContainer },
                    Drawer: { screen: Drawer },
                },
                { headerMode: 'none', mode: 'modal' },
            
            );
