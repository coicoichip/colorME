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
const buttonTab = {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 13,
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
    fontFamily: FONT_MAIN,
    color: color.BACKGROUND_COLOR,
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
    imageAvatarModuleEmails: {
        width: size.deviceWidth,
        height:size.deviceHeight/3.3,
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
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 5,
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


    wrapperRowCenter: {
        ...wrapperCenter,
        flexDirection: 'row',
    },
    backgroundColorOfImgInBase: {
        backgroundColor: '#D3D3D3'
    },

    //test base
    imageFeature: {
        borderRadius: 15,
        height: size.deviceHeight / 3,
        backgroundColor: "#FFF",
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
    categoryInImages:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgb(0, 241, 53)',
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
    textDescriptionCard: {
        color: "#2d2d2d",
        fontFamily: FONT_MAIN,
        fontSize: 12,
        backgroundColor: color.NONE_COLOR,
    },
    titleLargeDarkBold: {
        fontFamily: (Platform.OS === 'ios') ? 'Roboto' : 'Roboto-Bold',
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
    buttonSelected: {
        ...buttonTab,
        backgroundColor: 'black',
        fontFamily: FONT_MAIN_BOLD
    },
    buttonNotSelect: {
        ...buttonTab,
        backgroundColor: color.NONE_COLOR,
        color: color.TEXT_COLOR
    },
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
        fontFamily: (Platform.OS === 'ios') ? 'Roboto' : 'Roboto-Bold',
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
        fontFamily: (Platform.OS === 'ios') ? 'Roboto' : 'Roboto-Medium',
        fontSize: size.titleSmall,
        color: color.GRAY_COLOR,
        fontWeight: (Platform.OS === 'ios') ? '600' : 'normal',
    },
    titleNormalLight: {
        fontFamily: (Platform.OS === 'ios') ? 'Roboto' : 'Roboto-Medium',
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
        backgroundColor: color.BACKGROUND_COLOR
    },
    imageCircleBig: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    //learn register
    padding: {
        padding: 10,
    },
    haveBorderBottom: {
        borderBottomWidth: 0.5,
        borderColor: 'rgb(214, 214, 214)',
    },
    cardCmt: {
        flexDirection: 'row',
        flex: 1,
    },
    avatarUserNormal: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
    },
    marginRightFar: {
        marginRight: 15,
    },
    titleSmallBlue: {
        fontFamily: (Platform.OS === 'ios') ? 'Roboto' : 'Roboto-Medium',
        fontSize: 12,
        color: 'rgb(0, 128, 214)',
        fontWeight: (Platform.OS === 'ios') ? '600' : 'normal',
    },
    titleSmallDarkGrayThin: {
        fontFamily: (Platform.OS === 'ios') ? 'Roboto' : 'Roboto-Medium',
        fontSize: 12,
        color: 'rgb(109, 109, 109)',
        fontWeight: (Platform.OS === 'ios') ? '400' : 'normal',

    },
    buttonLeftRegisterGray: {
        borderRadius: 100,
        marginTop: 5,
        backgroundColor: 'rgb(214, 214, 214)',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,

    },
    buttonLeftRegisterMain: {
        borderRadius: 100,
        marginTop: 5,
        backgroundColor: color.MAIN_COLOR ,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,

    },
    footerCard: {
        height: 25,
        backgroundColor: 'rgb(240, 240, 240)'
    },
    //Modal
    wrapperModalComment: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalRegister: {
        borderRadius: 5,
        width: size.deviceWidth * 0.9,
        backgroundColor: color.BACKGROUND_COLOR,
    },
    titleGrayThin: {
        fontFamily: (Platform.OS === 'ios') ? 'Roboto' : 'Roboto-Medium',
        fontSize: 13,
        color: 'rgb(178, 178, 178)',
        fontWeight: (Platform.OS === 'ios') ? '400' : 'normal',

    },
    paddingLine: {
        paddingTop: 3,
        paddingBottom: 3,
    },
    textButton: {
        fontFamily: (Platform.OS === 'ios') ? 'Roboto' : 'Roboto-Medium',
        marginTop: -2,
        fontSize: 12,
        color: '#fff',
        fontWeight: (Platform.OS === 'ios') ? '600' : 'normal',

    },
    buttonRegister: {
        width: size.deviceWidth * 0.6,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 15,
        marginTop: 0,
        borderRadius: 17,
        backgroundColor: 'rgba(197, 0, 0, 1)',
    },

}
const styles = StyleSheet.create(style)

export default (styles)