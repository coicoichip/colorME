import { StyleSheet, Platform } from 'react-native';
import * as color from './colors';
import * as size from './sizes';
const FONT_MAIN = "Helvetica"
const FONT_MAIN_BOLD = FONT_MAIN + "-" + "Bold"
const isIOS = Platform.OS === 'ios';
const wrapperCenter = {
    alignItems: 'center',
    justifyContent: 'center',
};
const style = {
    wrapperCenter :{
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperContainer: {
        flex: 1,
        backgroundColor: color.BACKGROUND_COLOR,
    },
    wrapperHeader: {
        height: isIOS ? 80 : 60,
        paddingTop: isIOS ? 20 : 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color.BACKGROUND_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    textHeaderScreen: {
        color: color.TEXT_COLOR,
        fontFamily: FONT_MAIN,
        fontSize: 25,
    },
    textTitleBlog : {
        color: color.TEXT_COLOR,
        fontFamily: FONT_MAIN_BOLD,
        fontSize: 25,
    },
    wrapperIconTabNavigator: {
        ...wrapperCenter,
        width: size.deviceWidth / 5,
        height: size.TAB_BAR_HEIGHT,
    },
    contentCardModuleEmail: {
        backgroundColor: 'white',
        width: size.deviceWidth - 40,
        borderRadius: 5,

        marginTop: 20,
        flexDirection: 'row',
    },
    shadow: isIOS
        ?
        {
            shadowColor: color.SHADOW_COLOR,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
        }
        :
        {
            elevation: 2,
        },
    contentCardImageAvatarModuleEmail: {
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 13,
        paddingBottom: 13

    },
    imageAvatarModuleEmail: {
        width: size.deviceWidth/3.7,
        height: size.deviceWidth/3.7,
    },
    contentCardImageInformation: {
        flex: 2,
        position: 'relative',
        paddingRight: 10,
        paddingTop : 5,
    },
    emailNameModuleEmail: {
        marginLeft: -3,
        fontSize: 17,
        paddingTop: 12,
        paddingBottom: 7,
    },
    textDescriptionDark: {
        color: '#000',
        fontFamily: 'Helvetica',
        fontSize: 12,

    },
    wrapperLogoDrawer: {
        height: size.deviceHeight / 5,
        alignItems: 'center',
    },
    imageDrawer: {
        width: size.deviceHeight / 5,
        height: size.deviceHeight / 5
    },
    textDescriptionLightBold: {
        color: '#FFF',
        fontFamily: FONT_MAIN_BOLD,
        fontSize: 14,
    },
    categoryInImage:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: color.MAIN_COLOR,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 13,
        overflow: "hidden"
    },
    category:{
        backgroundColor: color.MAIN_COLOR,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 13,
        overflow: "hidden"
    },
    imageFeature: {
        borderRadius: 15,
        height: size.deviceHeight / 3,
        backgroundColor: color.ANDROID_SHADOW,
    },
    titleLargeDarkBold: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Bold',
        fontSize: 30,
        fontWeight: (Platform.OS === 'ios') ? 'bold' : undefined,
        color: color.TEXT_COLOR,
    },
    paddingLineFar: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    noBorder: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },

    //InfomationCourse
    wrapperImageInGetFull: {
        position: 'relative',
        width: size.deviceWidth,
        height: 250,
        justifyContent: 'center',
        backgroundColor: color.BACKGROUND_COLOR,
    },
    cardHeader: {
        margin: 0,
        backgroundColor: color.NONE_COLOR,
    },
    noPaddingTopBottom: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    titlePost: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Bold',
        color: color.GRAY_COLOR,
        fontSize: 20,
        fontWeight: (Platform.OS === 'ios') ? 'bold' : 'normal',

    },
    iconInDrawerNav: {
        width: size.width,
        flexDirection: 'row',
        backgroundColor: color.NONE_COLOR,
        position: 'absolute',
    },
    titleSmallDarkGrayBold: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: size.titleSmall,
        color: color.GRAY_COLOR,
        fontWeight: (Platform.OS === 'ios') ? '600' : 'normal',
    },
    titleNormalLight: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 11,
        color: color.BACKGROUND_COLOR,
        fontWeight: (Platform.OS === 'ios') ? '500' : 'normal',
    },
    parallaxHeaderTitle: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    stickySection: {
        alignItems: 'center',
        height: size.STICKY_HEADER_HEIGHT,
        justifyContent: 'center',
        backgroundColor: color.backGround
    },
    imageCircleBig: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    
}
const styles = StyleSheet.create(style)

export default (styles)