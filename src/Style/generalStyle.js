import {Platform, StyleSheet} from 'react-native';
import * as colorLight from './color';
import * as size from './size';
import {hei, wid} from './size';
// import { STRINGS, COLORS, SIZES } from "../../constants";
import { FONTS } from '../constants';

let color = colorLight;

export const style = {
    wrapperContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    wrapperBackButton: {
        width: 50,
    },
    iconInfoUp: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 30,
        width: wid / 2,
        borderRadius: 30,
        backgroundColor: color.background,
        bottom: -wid / 10,
        right: -5
    },
    iconInNews: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: color.mainColor,
        bottom: 50,
        right: 50,

    },

    wrapperLogin: {
        height: 9.5/10 * hei,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.background,

    },
    itemInput: {
        width: size.wid * 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitleInput: {
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,
        backgroundColor: color.none,
        paddingLeft: 25,
        marginTop: (Platform.OS === 'ios') ? 25 : 20,
        color: color.darkGray,
    },
    inputTheme02: {
        fontFamily: FONTS.MAIN_FONT,
        padding: 0,
        margin: 0,
        fontSize: 13,
        lineHeight: 10,
        color: color.darkGray,

    },
    wrapperHeader: {
        height: Platform.OS === 'android' ? 70 : 90,
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.background,

    },
    wrapperCenterLeftToRightRow: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    wrapperCenterLeftToRightColumn: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    wrapperCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperBottomLogin: {
        height: hei * 0.05
    },
    wrapperNotificationCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 16,
        borderRadius: 8,
        backgroundColor: color.textColor
    },
    wrapperCenterRow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    wrapperLogoInDrawer: {
        width: wid * 3 / 4 - 20,
        height: hei / 3,
        justifyContent: 'center',
    },
    imageInDrawer: {
        width: hei/wid > 1.6 ? (0.75*wid) / 1.5  : (0.75*wid) / 2,
        height: hei / 3,
    },
    wrapperButtonPlay: {
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: color.buttonPlay
    },
    wrapperProgress: {
        flex: 1
    },
    wrapperRowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    wrapperRowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    wrapperSearchForm: {
        width: wid - 40,
        borderWidth: 1,
        borderColor: color.textColorNotActive,
        height: 50,
    },
    wrapperIconDrawer: {
        height: 30,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperFeatureBook: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    wrapperCardBook: {
        borderWidth: 1,
        borderColor: color.textColorNotActive,
        flexDirection: 'row',
        flex: 1,


    },
    wrapperPeople: {
        height: 70,
    },
    wrapperModalStaff: {
        width: wid * 0.9,
        height: hei * 0.8,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    wrapperModalClass: {
        width: wid * 0.9,
        height: hei * 0.8,
        borderRadius: 10,
        backgroundColor: 'rgba(47, 24, 71, 0.8)'
    },
    textTitleHeader: {
        fontFamily: FONTS.MAIN_FONT_BOLD,
        fontSize: size.titleHeader,
        color: color.textColor,
    },

    textTitleBoldNormal: {
        backgroundColor: color.none,
        fontFamily: FONTS.MAIN_FONT_BOLD,
        fontSize: 12,
        color: color.textColor,
    },
    textNotActive: {
        color: color.textColorNotActive,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.defaultText,
    },
    textIsActive: {
        color: color.textColor,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.defaultText,
    },
    textTitleCard: {
        color: color.textColor,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.defaultText,
    },
    wrapperIconFixedHeader: {
        width: wid,
        flexDirection: 'row',
        backgroundColor: color.none,
        position: 'absolute',
    },
    textTitleCardLight: {
        color: '#FFFFFF',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.defaultText,
    },
    textTitleCardDark: {
        color: '#000000',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.defaultText,
    },
    textTitleCardBlue: {
        color: color.blue,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.defaultText,
    },
    textTitleBig: {
        color: color.textColor,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.titleBig,
    },
    textTitleBigLight: {
        color: '#FFFFFF',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.titleBig,
    },
    textTitleBigBlue: {
        color: color.blue,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.titleBig,
    },
    textTitleGiant: {
        color: color.textColor,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.titleGiant,
    },
    textAlign: {
        textAlign: 'center'
    },
    textTitleBigThin: {
        color: color.textColor,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 25
    },
    textDescriptionCard: {
        color: color.textColor,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.titleNormal,
        backgroundColor: color.none,
    },
    textNameCard: {
        color: color.gray,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.titleNormal,
        backgroundColor: color.none,
    },
    textTimeCard: {
        color: color.textColorNotActive,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.titleNormal,
        backgroundColor: color.none,
    },
    textDescriptionCardLight: {
        color: '#FFFFFF',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.titleNormal,
    },
    textDescriptionCardDark: {
        color: '#000000',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.titleNormal,
    },
    textNoteCard: {
        color: color.textColorNotActive,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.titleSmall,
    },
    textSmallDarkGray: {
        color: color.darkGray,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 11,
    },
    textInDrawer: {
        fontFamily: FONTS.MAIN_FONT,
        fontSize: size.titleNormal,
        color: 'black',
    },
    textNumberChart: {
        color: color.textColor,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 35,
    },
    textNotification: {
        color: color.textColorReverse,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,
    },
    iconGray: {
        color: '#a5a5a5',
    },
    colorTextLight: {
        color: '#FFFFFF'
    },
    iconStarStyle: {
        color: color.star,
        paddingLeft: 3
    },

    wrapperImageSquareBig: {
        height: wid - 40,
    },
    wrapperImageSquare: {
        height: wid / 2,
        width: wid / 2,
    },
    wrapperTextInImage: {
        padding: 10,
        flex: 1,
        position: 'absolute',
        bottom: 0

    },
    wrapperBottomChart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.none,
        paddingTop: 5,
        paddingRight: 5,
        paddingLeft: 5
    },
    line: {
        height: 1,
        backgroundColor: color.textColorNotActive,
    },
    wrapperImageRectangle: {
        width: wid / 3,
        height: hei / 3,
    },
    wrapperTextInCardBook: {
        width: wid * 2 / 3 - 40,
        paddingRight: 20,
        marginBottom: 30
    },
    imageFeature: {
        height: hei / 3,
        borderRadius: 15,
    },
    imageFeatureInCol: {
        height: hei / 5,
        borderRadius: 15,
        backgroundColor: color.background
    },
    imageFeatureHeightLow: {
        height: hei / 5,
        borderRadius: 10,
        backgroundColor: color.background
    },
    wrapperFeatureHeightLow: {
        height: hei / 6,
        borderRadius: 10,
        backgroundColor: color.mainColor
    },
    imageLogin: {
        width: hei/wid > 1.6 ? wid / 1.5  : wid / 2,
        height: hei / 3,
    },
    imageFullWidth: {
        height: hei / 3,
        backgroundColor: color.background

    },
    wrapperModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperModalBottom: {
        width: wid,
        height: hei / 2,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    wrapperModalTypeBottom: {
        width: wid,
        padding: 20,
        height: 30,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
    wrapperBadge: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        position: 'absolute',
        backgroundColor: 'red',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapperRevenue: {
        justifyContent: 'flex-end',
        backgroundColor: color.blueDashboard,
        height: hei / 3,
        borderRadius: 15,
    },
    wrapperRevenueSquare: {
        justifyContent: 'space-between',
        backgroundColor: color.blueDashboard,
        borderRadius: 15,
        width: wid / 2 - 30,
        height: wid / 2 - 30
    },
    wrapperImageFullWidth: {
        backgroundColor: color.none,
        marginLeft: -20,
        marginRight: -20,
        height: size.HEIGHT_FULL_WIDTH_IMAGE
    },
    wrapperFullWidth: {
        flex: 1,
    },
    wrapperBuyNowButton: {
        width: wid,
        height: 50,
        position: 'absolute',
        bottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.none,
    },
    wrapperSurvey: {
        width: wid - 40,
        borderRadius: 15,
        backgroundColor: '#FFF'
    },
    wrapperLoginButton: {
        marginTop: 50,
        width: wid * 0.9,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.none,
    },
    buttonBuyNowFullSize: {
        borderRadius: 50,
        width: size.wid * 0.8,
        padding: 8,
        backgroundColor: color.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonDownload: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: color.blue,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonDone: {
        borderRadius: 40,
        width: 80,
        height: 80,
        backgroundColor: '#33cc00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperTextDownImage: {
        height: 70,
    },
    wrapperTabInImage: {
        position: 'absolute',
        width: wid * 2 / 5,
        height: 30,
        backgroundColor: color.mainColor,
        borderRadius: 50,
        bottom: 10,
        right: 5,
    },
    wrapperRevenueLine: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: color.blueDashboard,
        borderRadius: 15,
        height: 40,
    },
    columnChart: {
        width: 5,
        borderRadius: 5,
        backgroundColor: color.textColor,
    },
    imageSquareBig: {
        height: wid - 40,
        borderRadius: 15,
        backgroundColor: color.background
    },
    imageCircleTiny: {
        height: 16,
        width: 16,
        borderRadius: 8,
        backgroundColor: color.background
    },
    imageCircleNormal: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: color.background
    },
    imageCircleBig: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: color.background
    },
    imageSquare: {
        height: wid / 2,
        width: wid / 2,
        borderRadius: 15,
        backgroundColor: color.background
    },
    textBigLight: {
        paddingBottom: 0,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 13,
        color: color.navTitle,
    },
    textLogin: {
        paddingBottom: 0,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 13,
        color: color.darkGray,
    },
    imageSquareSmall: {
        height: (wid - 60) / 3,
        width: (wid - 60) / 3,
        borderRadius: 15,
        backgroundColor: color.background
    },
    imageRectangleSmall: {
        width: wid / 5,
        height: wid / 5 * 1.5,
        backgroundColor: color.background
    },
    imageSquareAvatar: {
        height: wid / 5,
        width: wid / 5,
        borderRadius: 10,
        backgroundColor: color.background
    },
    imageRectangle: {
        width: wid / 3,
        height: hei / 3 - 30,
        backgroundColor: color.background
    },

    linearGradient: {
        paddingBottom: 0,
        paddingTop: 0,
        flex: 1
    },
    contentModal: {
        flex: 1,
    },
    topModal: {
        height: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCart: {
        borderRadius: 10,
        width: wid * 0.9,
        height: hei * 0.5,
        backgroundColor: 'rgb(255,255,255)',
    },
    linearGradientInDrawer: {
        paddingBottom: 0,
        paddingTop: 0,
        height: hei / 3,
        width: wid,
    },
    paddingBorder: {
        padding: 20,
    },
    padding: {
        padding: 10
    },
    paddingFar: {
        padding: 20
    },
    paddingTopBottom: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    paddingLeft: {
        paddingLeft: 10
    },
    paddingLR: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    paddingLRFar: {
        paddingLeft: 50,
        paddingRight: 50,
    },
    paddingLine: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    paddingRight: {
        paddingRight: 10
    },
    paddingTop: {
        paddingTop: 10
    },
    paddingBottom: {
        paddingBottom: 10
    },
    noPaddingLeft: {
        paddingLeft: 0
    },
    noPadding: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
    noPaddingRight: {
        paddingRight: 0
    },
    noPaddingTop: {
        paddingTop: 0
    },
    noPaddingBottom: {
        paddingBottom: 0
    },
    marginLeft: {
        marginLeft: 10
    },
    margin: {
        marginLeft: 10,
        marginRight: 10
    },
    marginLeftFar: {
        marginLeft: 20
    },
    marginLR: {
        marginLeft: 20,
        marginRight: 20,
    },
    marginRight: {
        marginRight: 10
    },
    marginRightFar: {
        marginRight: 20
    },
    marginTop: {
        marginTop: 10
    },
    marginTopFar: {
        marginTop: 20
    },
    marginBottom: {
        marginBottom: 10
    },
    marginBottomFar: {
        marginBottom: 20
    },
    noMarginLeft: {
        marginLeft: 0
    },
    noMarginRight: {
        marginRight: 0
    },
    noMarginTop: {
        marginTop: 0
    },
    noMarginBottom: {
        marginBottom: 0
    },
    marginTopBottom: {
        marginTop: 10,
        marginBottom: 10
    },
    shadow: Platform.OS === 'ios' ? {
        shadowColor: color.shadowColor,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
    } : {
        elevation: 2,
        },
    itemTabInDrawer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        backgroundColor: color.none,
        borderBottomWidth: 0,
    },
    lineProgress: {
        height: 5,
        backgroundColor: color.textColorNotActive,
    },
    categoryInImage: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: color.mainColor,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 13,
        overflow: "hidden"
    },
    categoryAbsolute: {
        position: 'absolute',
        backgroundColor: color.mainColor,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 13,
        overflow: "hidden"
    },

    category: {
        backgroundColor: color.mainColor,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 13,
        overflow: "hidden"
    },
    wrapperDeadline: {
        width: wid - 40,
        height: 5,
        borderRadius: 5,
        backgroundColor: color.textColorNotActive,
    },
    wrapperProcessDark: {
        height: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    process: {
        height: 3,
        backgroundColor: color.mainColor
    },
    wrapperSearch: {
        height: 40,
        position: 'absolute',
        width: wid - 40,
        backgroundColor: '#FFF',
        zIndex: 100,
    },

    wrapperA: {
        height: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    noBackground: {
        backgroundColor: color.none
    },
    headerModal: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    bottomModal: {
        height: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
    },
    haveBorderBottom: {
        borderBottomWidth: 0.5,
        borderColor: 'rgba(214,214,214, 0.6)',
    },
    haveBorderTop: {
        borderTopWidth: 0.5,
        borderColor: 'rgba(214,214,214, 0.6)',
    },

    wrapperBottomModule: {
        height: 50,
    },
    wrapperSpace: {
        height: 20,
    },
    wrapperBackButtonAbsolute: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 20 : 0,
        left:5,
        backgroundColor: color.background
    },
    inputTheme: {
        fontSize: size.titleNormal,
        width: wid * 0.7,
    },
    buttonSearchInSearchInput: {
        width: 40,
        height: 40,
        backgroundColor: color.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonQuestion: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: color.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonUser: {
        padding: 3,
        borderRadius: 5,
    },
    buttonOrder: {
        backgroundColor: color.mainColor,
        height: 30,
        borderRadius: 20,
    },
    buttonSearch: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        backgroundColor: color.mainColor,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonSelect: {
        width: wid / 2,
        height: 48,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    buttonSmall: {
        backgroundColor: color.mainColor,
        height: 30,
        borderRadius: 5,
    }
};

const general = StyleSheet.create(style);

export default general
