import * as React from 'react';
import {
    Text, View
} from 'react-native';
import * as color from "../styles/colors";
import * as size from "../styles/sizes";
import styles from "../styles/styles";
import IconDefault from '../commons/IconDefault';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import DrawerContainer from '../modules/drawer/DrawerContainer';
import LoginContainer from '../modules/login/LoginContainer';
import RegisterContainer from '../modules/register/RegisterContainer';
import OverviewContainer from '../modules/overview/OverviewContainer';
import NotificationContainer from '../modules/notification/NotificationContainer';
import ClassListCurrentContainer from '../modules/class-list-current/ClassListCurrentContainer';
import DetailClassContainer from '../modules/detail-class/DetailClassContainer';
import RegisterCalendarContainer from '../modules/register-calendar/RegisterCalendarContainer';
import RegisterShiftContainer from '../modules/register-shift/RegisterShiftContainer';
import UserContainer from '../modules/user-profile/UserContainer';
import ClassListContainer from '../modules/class-list/ClassListContainer';
import TranferMoneyContainer from '../modules/tranfer-money/TranferMoneyContainer';
import StudentContainer from "../modules/student/StudentContainer"
import FinanceContainer from '../modules/finance/FinanceContainer';
import SupportContainer from '../modules/support/SupportContainer';
import BlogContainer from "../modules/blog/BlogContainer"
import DetailBlog from '../modules/blog/detailBlog';
import PaidStudentContainer from '../modules/paid-student/PaidStudentContainer';
import PaidStudentZeroContainer from '../modules/paid-student/PaidStudentZeroContainer';
import EmailContainer from '../modules/email/EmailContainer';
import DetailEmail from '../modules/email/DetailEmail';
import SubjectContainer from '../modules/subject/SubjectContainer';
import StaffContainer from "../modules/staff/StaffContainer"
import Icon from "../commons/Icon"
import BaseContainer from "../modules/base/BaseContainer"
import CollectionContainer from '../modules/collection/CollectionContainer';
import EmailPerson from '../modules/email/EmailPerson';
import CheckInContainer from "../modules/check-in/CheckInContainer";
import CheckOutContainer from "../modules/check-in/CheckOutContainer";
import QRCodeContainer from '../modules/attendance/qrcode/QrCodeContainer';
import ClassListAttendanceContainer from '../modules/attendance/class-current-attendace/ClassListAttendanceContainer';
import AttendanceContainer from "../modules/attendance/AttendanceContainer";
import ClassRoomContainer from '../modules/class-room/ClassRoomContainer';
import DetailClassRoom from '../modules/class-room/DetailClassRoom';
import StaffModal from "../modules/tranfer-money/StaffModal";
import ProfileContainer from "../modules/profile/ProfileContainer";
import WorktimeHistoryContainer from "../modules/worktime-history/WorktimeHistoryContainer";
// import HistoryShiftRegisterContainer from "../modules/history-shift-register/HistoryShiftRegisterContainer";
import ClassStartDateContainer from "../modules/class-start-date/ClassStartDateContainer";
import RegisterShiftHistoryContainer from "../modules/register-shift-history/RegisterShiftHistoryContainer";
import PersonalCollectionContainer from "../modules/personal-collection/PersonalCollectionContainer";
import DetailStudentContainer from "../modules/detail-student/DetailStudentContainer";
import StudentInClassContainer from "../modules/student-in-class/StudentInClassContainer";

import StaffKeepMoneyContainer from "../modules/staff-keep-money/StaffKeepMoneyContainer";
import TransactionStaffContainer from "../modules/staff-keep-money/TransactionStaffContainer";
const TAB_BAR_HEIGHT = 50;
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getTabs } from "../modules/drawer/drawerAction";

class MainConfigRouterContainer extends React.Component {
    componentWillMount() {
        this.props.getTabs(this.props.token)
    }

    // check items in drawer
    drawerItem(items) {
        console.log(items)
        const { isLoadingTabs, tabs } = this.props;
        let drawerItems = [items[0], items[2], items[3], items[4]];
        if (isLoadingTabs == false && tabs.length !== 0) {
            for (let i = 0; i < tabs.length; i++) {
                for (let j = 0; j < items.length; j++) {
                    if(items[j].hasOwnProperty('routes') && items[j].routes[0].params !== undefined){
                    if ( items[j].routes[0].params.idRoute == tabs[i].id) { drawerItems.push(items[j]); continue; }
                }
            }
            }
            return drawerItems;
        } else { return items }
    }
    render() {
        const { isLoadingTabs, tabs } = this.props;
        console.log(tabs);
        const Home = TabNavigator(
            {
                Attendance: {
                    screen: ClassListAttendanceContainer,
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
                RegisterShift: {
                    screen: RegisterShiftContainer,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <View style={styles.wrapperIconTabNavigator}>
                                <IconDefault
                                    name="Feather|check-circle" size={size.ICON_SIZE}
                                    color={tintColor}
                                />
                            </View>
                        )
                    }
                },
                Overview: {
                    screen: OverviewContainer,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <View style={styles.wrapperIconTabNavigator}>
                                <IconDefault
                                    name="MaterialCommunityIcons|view-dashboard" size={size.ICON_SIZE + 5}
                                    color={tintColor}
                                />
                            </View>
                        ),
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
                User: {
                    screen: UserContainer,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <View style={styles.wrapperIconTabNavigator}>
                                <IconDefault
                                    name="FontAwesome|user-o" size={size.ICON_SIZE}
                                    color={tintColor}
                                />
                            </View>
                        ),
                    }
                },
            },
            {
                indicatorStyle: {
                    border: 5,
                    backgroundColor: color.NONE_COLOR,
                },
                initialRouteName: 'Overview',
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
            }
        );


        const StaffKeepMoney = StackNavigator({
            StaffKeepMoneyContainer: { screen: StaffKeepMoneyContainer },
            TransactionStaff: { screen: TransactionStaffContainer }
        }, {
            headerMode: 'none', mode: "modal", initialRouteParams: {
                idRoute: 17
            }
            })

        const Blogs = StackNavigator({
            Blog: { screen: BlogContainer },
            detailBlog: { screen: DetailBlog }
        }, { headerMode: 'none', initialRouteParams: { idRoute: 88 } }, );

        const ClassRooms = StackNavigator({
            ClassRoom: { screen: ClassRoomContainer },
            detailClassRoom: { screen: DetailClassRoom },
        }, { headerMode: 'none', mode: 'modal' }, );

        const Bases = StackNavigator({
            Base: { screen: BaseContainer },
            detailBase: { screen: ClassRooms }
        }, {
                headerMode: 'none', mode: 'modal', initialRouteParams: {
                    idRoute: 22
                }
            }, );

        const Email = StackNavigator({
            EmailContainer: { screen: EmailContainer },
            EmailDetail: {
                screen: DetailEmail,
            },

        }, { headerMode: 'none', mode: 'modal', initialRouteParams: { idRoute: 28 } }, )
        const CheckIn = StackNavigator({
            CheckIn: {
                screen: CheckInContainer,
            }
        }, {
                ...{
                    headerMode: "none",
                    initialRouteName: 'CheckIn',
                    initialRouteParams: {
                        type: 'checkin'
                    }
                }
            }, );
        const CheckOut = StackNavigator({
            CheckOut: {
                screen: CheckOutContainer,
            }
        }, {
                ...{
                    headerMode: "none",
                    initialRouteName: 'CheckOut',
                    initialRouteParams: {
                        type: 'checkout'
                    }
                }
            }, );
        const RegisterCalendar = StackNavigator({
            RegisterCalendar: {
                screen: RegisterCalendarContainer,
            }
        }, {
                ...{
                    headerMode: "none",
                    initialRouteParams: {
                        idRoute: 111
                    }
                }
            }, );
        const Subject = StackNavigator({
            screen: SupportContainer,
        }, { headerMode: 'none', initialRouteParams: { idRoute: 7 } })

        const TranferMoney = StackNavigator({
            screen: TranferMoneyContainer,
        }, { headerMode: 'none', initialRouteParams: { idRoute: 16 } })
        const Staff = StackNavigator({
            screen: StaffContainer
        }, { headerMode: 'none', initialRouteParams: { idRoute: 2 } })
        const Finance = StackNavigator({
            screen: FinanceContainer
        }, { headerMode: 'none', initialRouteParams: { idRoute: 14 } })
        const Collect = StackNavigator({
            screen: CollectionContainer
        }, { headerMode: 'none', initialRouteParams: { idRoute: 15 } })
        const Expenditure = StackNavigator({
            screen: PersonalCollectionContainer
        }, { headerMode: 'none', initialRouteParams: { idRoute: 30 } })



        const Drawer = DrawerNavigator({
            Overview: {
                screen: Home,
                navigationOptions: ({ navigation }) => ({
                    title: 'Tổng quan',
                })

            },
            RegisterCalendar: {
                screen: RegisterCalendar,
                navigationOptions: ({ navigation }) => ({
                    title: 'Đăng ký làm',
                }),
            },
            Checkin: {
                screen: CheckIn,
                navigationOptions: ({ navigation }) => ({
                    title: "Check In"
                })

            },
            Checkout: {
                screen: CheckOut,
                navigationOptions: ({ navigation }) => ({
                    title: "Check Out"
                })
            },
            Support: {
                screen: SupportContainer,
                navigationOptions: ({ navigation }) => ({
                    title: 'Hỗ trợ - tư vấn',
                })
            },

            // Blog: {
            //         id : 88,
            //     screen: Blogs,
            //     navigationOptions: ({ navigation }) => ({
            //         title: 'Bài viết',
            //     })
            // },
            Email: {
                screen: Email,
                navigationOptions: ({ navigation }) => ({
                    title: 'Email',
                })
            },
            Subject: {
                screen: Subject,
                navigationOptions: ({ navigation }) => ({
                    title: "Môn học"
                }),
            },
            TranferMoney: {
                screen: TranferMoney,
                navigationOptions: ({ navigation }) => ({
                    title: "Chuyển tiền"
                }),
            },

            Base: {
                screen: Bases,
                navigationOptions: ({ navigation }) => ({
                    title: "Cơ sở",
                }),

            },
            Staff: {
                screen: Staff,
                navigationOptions: ({ navigation }) => ({
                    title: "Nhân sự"

                }),
            },
            Finance: {
                screen: Finance,
                navigationOptions: ({ navigation }) => ({
                    title: "Tài chính"
                })
            },
            Collect: {
                screen: Collect,
                navigationOptions: ({ navigation }) => ({
                    title: "Thu tiền"

                }),
            },
            ClassStartDate: {
                screen: ClassStartDateContainer,
                navigationOptions: ({ navigation }) => ({
                    title: 'Lịch khai giảng',
                })
            },
            Expenditure: {
                screen: Expenditure,
                navigationOptions: ({ navigation }) => ({
                    title: "Thu chi cá nhân"
                }),
            },
            StaffKeepMoney: {
                screen: StaffKeepMoney,
                navigationOptions: ({ navigation }) => ({
                    title: "Nhân viên thu tiền"
                }),
            }
        }, {
                contentOptions: {
                    activeTintColor: color.MAIN_COLOR,
                },
                drawerWidth: size.deviceWidth * 3 / 4,
                drawerPosition: 'right',
                useNativeAnimations: 'false',
                disableOpenGesture: false,
                drawerLockMode: 'locked-closed',
                contentComponent: props => {
                    const clonedProps = {
                        ...props,
                        items: this.drawerItem(props.items),
                    }; return (<DrawerContainer navigation = {this.props.navigation} isLoadingTabs={isLoadingTabs} {...clonedProps} />)
                }
            });


        return (<Drawer  />)
    }

}
function mapStateToProps(state) {
    return {
        isLoadingTabs: state.drawer.isLoadingTabs,
        errorTabs: state.drawer.errorTabs,
        token: state.login.token,
        tabs: state.drawer.tabs
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getTabs: bindActionCreators(getTabs, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainConfigRouterContainer)