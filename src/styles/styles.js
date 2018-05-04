import { StyleSheet, Platform } from 'react-native';
import * as color from './colors';
import * as size from './sizes';
const FONT_MAIN = "Helvetica"
const FONT_MAIN_BOLD = FONT_MAIN + "-" + "Bold"
const isIOS = Platform.OS === 'ios';

const buttonTab = {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: "hidden",
    borderRadius: 13,
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
    fontFamily: FONT_MAIN,
    color: color.BACKGROUND_COLOR,
};

const buttonFull = {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 10,
};
const wrapperCenter = {
    alignItems: 'center',
    justifyContent: 'center',
};

const shadowOpt = {
    width:160,
    height:170,
    color:"#000",
    border:2,
    radius:3,
    opacity:0.2,
    x:0,
    y:3,
    style:{marginVertical:5}
};


const style = {
    wrapperContainer: {
        flex: 1,
        backgroundColor: color.BACKGROUND_COLOR,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    imageFullWidth: {
        height: size.deviceHeight / 3,
        backgroundColor: color.BACKGROUND_COLOR
    },
    wrapperSpace: {
        height: 10,
        backgroundColor: color.NONE_COLOR,
    },
    wrapperRowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    wrapperRowCenterVertical: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    wrapperRowCenterHorizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    wrapperBottom: {
        bottom: -15, justifyContent: 'center', alignItems: 'center'
    },
    wrapperRowCenter: {
        ...wrapperCenter,
        flexDirection: 'row',
    },
    itemInputInBox: {
        ...wrapperCenter,
        padding: 0,
        marginLeft: 30,
        marginRight: 30,
    },
    marginLeftRight: {
        marginLeft: 20,
        marginRight: 20,
    },
    wrapperLogin: {
        flex: 10,
        width: size.deviceWidth * 0.9,
        borderRadius: 20,
        marginBottom: 0,
        alignItems: 'center',
        backgroundColor: color.NONE_COLOR
    },
    wrapperFormLogin: {
        // flex: 1,
        marginTop: -size.deviceHeight*0.1, 
        padding: 20,
        width: size.deviceWidth * 0.8,
        maxWidth: 500,
        borderRadius: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.BACKGROUND_COLOR
    },
    wrapperInput: {
        width: size.deviceWidth * 0.9,
        maxWidth: 500,

    },
    buttonCheckin: {
        ...buttonFull,
        borderRadius: 5,
        height: 40,
        marginTop: 20,
        width: size.deviceWidth * 0.9,
        backgroundColor: color.MAIN_COLOR,
    },
    buttonLogin: {
        ...buttonFull,
        borderRadius: 5,
        height: 40,
        marginTop: 20,
        //maxHeight: 460,
        maxWidth: 460,
        width: size.deviceWidth * 0.9 - 60,
        backgroundColor: color.MAIN_COLOR,
    },
    wrapperHeader: {
        height: isIOS ? 80 : 60,
        paddingTop: isIOS ? 20 : 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color.BACKGROUND_COLOR,
    },
    wrapperButtonBottom: {
        width: size.deviceWidth,
        marginTop: 20,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.NONE_COLOR,
    },
    wrapperCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBottom: {
        ...wrapperCenter,
        borderRadius: 5,
        width: size.deviceWidth * 0.9,
        padding: 10,
        backgroundColor: color.MAIN_COLOR,
    },
    wrapperIconTabNavigator: {
        ...wrapperCenter,
        width: size.deviceWidth / 5,
        height: size.TAB_BAR_HEIGHT,
    },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 1,
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderColor: 'rgba(0, 122, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    marker: {
        height: 20,
        width: 20,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 5,
        backgroundColor: '#007AFF',
        borderColor: 'white'
    },

    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonOrderInModal: {
        height: 30,
        borderRadius: 15,
        width: size.deviceWidth * 0.8,
        padding: 20,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: color.MAIN_COLOR,
        alignItems: 'center',
        flexDirection: 'row',
    },
    wrapperAlwayOnTop: {
        top: 0,
        position: 'absolute',
        margin: 0,
        padding: 0,
        backgroundColor: 'red'
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
    shadowLV2: isIOS
        ?
        {
            shadowColor: color.SHADOW_COLOR,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
        }
        :
        {
            elevation: 1,
        },

    wrapperLogoDrawer: {
        height: size.deviceHeight / 3
    },
    imageCircleBig: {
        borderRadius: 20,
        width: 40,
        height: 40
    },
    modalCart: {
        padding: 20,
        borderRadius: 10,
        width: size.deviceWidth * 0.9,
        backgroundColor: 'rgb(255,255,255)',
    },
    wrapperModal: {
        ...wrapperCenter,
        flex: 1,
        backgroundColor: 'rgba(0, 0,0, 0.7)',
    },
    headerModal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textHeaderScreen: {
        color: color.TEXT_COLOR,
        fontFamily: FONT_MAIN,
        fontSize: 25,
    },
    spaceHeight: {
        height: 20,
        backgroundColor: 'transparent'
    },

    textDescriptionGray: {
        color: color.TEXT_DESCRIPTION_COLOR,
        fontFamily: FONT_MAIN,
        fontSize: 12,
    },
    textDescriptionDarkBold: {
        color: color.TEXT_COLOR,
        fontFamily: FONT_MAIN_BOLD,
        fontSize: 14,
    },
    imageLogin: {
        width: size.deviceHeight / size.deviceWidth > 1.6 ? size.deviceWidth / 1.8 : size.deviceWidth / 3,
        maxWidth: 50,
        height: size.deviceHeight / 4,
        marginTop: size.deviceHeight/6,
    },
    itemCardShort: {
        padding: 10,
        width: 200,
        backgroundColor: color.BACKGROUND_COLOR,
        borderRadius: 10,
        height: 110,
    },
    itemCardLong: {
        padding: 10,
        backgroundColor: color.BACKGROUND_COLOR,
        borderRadius: 10,
    },
    textNumberInItemCard: {
        color: color.TEXT_COLOR,
        fontFamily: FONT_MAIN,
        fontSize: size.NUMBER_CARD,
    },
    wrapperProcessDark: {
        height: 5,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    process: {
        height: 5,
        borderRadius: 5,
        backgroundColor: color.MAIN_COLOR
    },

    //code cuong
    cardItem: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: color.BACKGROUND_COLOR
    },
    avatarUserImage: {
        height: size.deviceHeight / 16,
        width: size.deviceHeight / 16,
        borderRadius: 16,
    },
    avatarSubjectImage: {
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    avatarUserModalCollect: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    avatarCircleSmall: {
        height: 20,
        width: 20,
        borderRadius: 10,
    },
    avatarCircleTiny: {
        height: 16,
        width: 16,
        borderRadius: 8,
    },
    textNumberPhone: {
        color: "#498fff",
        fontFamily: FONT_MAIN,
        fontSize: 12,
    },
    textDescriptionDark: {
        color: '#000',
        fontFamily: 'Helvetica',
        fontSize: 12,

    },
    textSelectDark: {
        color: '#000',
        fontFamily: 'Helvetica',
        fontSize: 11,
    },
    textDescriptionLight: {
        color: '#FFF',
        fontFamily: FONT_MAIN,
        fontSize: 14,
    },
    textButtonLight: {
        color: '#FFF',
        fontFamily: FONT_MAIN,
        fontSize: 12,
    },
    textDescriptionLightBold: {
        color: '#FFF',
        fontFamily: FONT_MAIN_BOLD,
        fontSize: 14,
    },
    inputTheme02: {
        fontFamily: FONT_MAIN,
        height: 30,
        padding: 0,
        margin: 0,
        fontSize: 14,
        lineHeight: 15,
        color: color.TEXT_COLOR,
    },

    textDescriptionCard: {
        color: color.TEXT_COLOR,
        fontFamily: FONT_MAIN,
        fontSize: 12,
        backgroundColor: color.NONE_COLOR,
    },
    imageDrawer: {
        width: size.deviceHeight / 5,
        height: size.deviceHeight / 5
    },
    itemInput: {
        width: size.deviceWidth * 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cardItemExpand: {
        height: size.deviceHeight / 6 + 5,
        borderRadius: 5,
        backgroundColor: color.BACKGROUND_COLOR
    },

    iconInTopCard: {
        top: 0,
        alignItems: "flex-end"
    },

    wrapperImageFullWidth: {
        backgroundColor: color.NONE_COLOR,
        marginLeft: -20,
        marginRight: -20,
        height: size.HEIGHT_FULL_WIDTH_IMAGE
    },

    textTitleCard: {
        color: color.TEXT_COLOR,
        fontFamily: FONT_MAIN_BOLD,
        fontSize: 16,
    },
    textAuthor: {
        color: color.TEXT_COLOR,
        fontFamily: FONT_MAIN_BOLD,
        fontSize: 12,
    },
    wrapperIconFixedHeader: {
        width: size.deviceWidth,
        flexDirection: 'row',
        backgroundColor: color.NONE_COLOR,
        position: 'absolute',
    },
    buttonSelected: {
        ...buttonTab,
        backgroundColor: color.MAIN_COLOR,
        fontFamily: FONT_MAIN_BOLD
    },
    buttonFullCardDisable: {
        ...buttonFull,
        height: 40,
        backgroundColor: color.DISABLE_COLOR,
    },
    buttonFullCardUnActive: {
        ...buttonFull,
        height: 40,
        backgroundColor: color.RED_COLOR,
    },
    buttonFullCardActive: {
        ...buttonFull,
        height: 40,
        backgroundColor: color.GREEN_COLOR,
    },

    wrapperRowRightToLeft: {
        backgroundColor: color.NONE_COLOR,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    buttonNotSelect: {
        ...buttonTab,
        backgroundColor: color.NONE_COLOR,
        color: color.TEXT_COLOR
    },
    textPupa: {
        ...buttonTab,
        borderRadius: 10,
        padding: 10,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: color.GREEN_COLOR,
        fontSize: 12,
        fontFamily: FONT_MAIN,
    },
    wrapperModalBig: {
        backgroundColor: color.BACKGROUND_COLOR,
        borderRadius: 5,
        width: size.deviceWidth * 0.8,
        maxHeight: size.deviceHeight * 0.8
    },
    wrapperModalBody: {
        backgroundColor: color.BACKGROUND_COLOR,
        borderRadius: 5,
        width: size.deviceWidth * 0.8,
        height: size.deviceHeight * 0.8 - 30
    },
    buttonCollectMoney: {
        ...buttonTab,
        ...wrapperCenter,
        borderRadius: 5,
        padding: 5,
        paddingTop: 3,
        paddingBottom: 3,
        fontFamily: FONT_MAIN,

    },
    textTitleCardBlue: {
        color: color.BLUE_COLOR,
        fontFamily: FONT_MAIN_BOLD,
        fontSize: 14,
    },
    line: {
        height: 0.75,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    textTitleBoldNormal: {
        backgroundColor: color.noneColor,
        fontFamily: FONT_MAIN_BOLD,
        fontSize: 12,
        color: color.textColor,
    },

    // tạo style mới của Dũng 
    wrapperHeaderModuleEmail: {
        paddingBottom: 10,
        fontFamily: FONT_MAIN,
    },
    buttonTabInColumnModuleEmail: {
        overflow: "hidden",
        borderRadius: 13,
        padding: 15,
        paddingTop: 6,
        paddingBottom: 6,
        backgroundColor: '#e01916',
        color: '#FFF',
        fontSize: 10,
        fontFamily: FONT_MAIN_BOLD ,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTabInColumnDisableModuleEmail: {
        overflow: "hidden",
        borderRadius: 10,
        padding: 15,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: color.noneColor,

        fontSize: 10,
        fontFamily: FONT_MAIN_BOLD ,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentCardModuleEmail: {
        backgroundColor: 'white',
        width: size.deviceWidth - 40,
        borderRadius: 5,
       
        marginTop: 20,
        flexDirection: 'row',
    },

    contentCardModuleEmails: {
        fontSize: 12,
        backgroundColor: 'white',
        width: size.deviceWidth - 50,
        // height: size.deviceHeight / 5,
        borderRadius: 5,
       
        marginTop: 20,
        flexDirection: 'row',
    },
    contentCardModuleEmailPerson: {
        height: size.deviceHeight / 4 + 3,
    },
    contentCardImageAvatarModuleEmail: {
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 13,
        paddingBottom: 13

    },
    contentCardImageAvatarModuleEmails: {
        // width: 100,
        width: (size.deviceWidth - 50)/3,
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 13,
        paddingBottom: 13
    },
    contentCardImageInformations: {
        width: (size.deviceWidth - 50)*2/3,
        position: 'relative',
        paddingLeft: 10,
        paddingRight: 10,
        // padding: 5,
    },
    itemInCollect: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: size.deviceWidth * 0.8 - 40,
        alignItems:'center',
    },
    contentCardImageInformation: {
        flex: 2,
        position: 'relative',
        paddingRight: 10,
        paddingTop : 5,
    },
    contentCardIconModuleEmail: {
        height: 20,
        position: 'absolute',
        right: 10,
        top: 10,
        transform: [{ 'translate': [0, 0, 1] }],

    },
    wrapperButtonHeaderList: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonHeaderList:{
        ...wrapperCenter,
        borderRadius: 5,
        backgroundColor: color.MAIN_COLOR,
        padding: 5,
        flex: 1,
    },
    iconStyleModuleEmail :{
        width: 15,
        height:15
    },
    imageAvatarModuleEmails: {
        width: (size.deviceWidth-50)/3-10,
        height: (size.deviceWidth-50)/3-10,

    },
    imageAvatarModuleEmail: {
        width: size.deviceWidth/3.7,
        height: size.deviceWidth/3.7,
    },
    emailNameModuleEmail: {
        marginLeft: -3,
        fontSize: 17,
        paddingTop: 12,
        paddingBottom: 7,
    },

    emailNameModuleEmails: {
        fontSize: 17,
        paddingTop: 25,
        paddingBottom: 7,

    },
    percenModuleEmail: {
        height: 5,
        flexDirection: 'row',
        // marginRight: 9,
        borderRadius: 5,
        backgroundColor: '#e3e5e3',
    },
    percenActiveModuleEmail: {
        backgroundColor: color.GREEN_COLOR,
        borderRadius: 5,
    },
    timeModuleEmail: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 5,
    },
    timeLeftModuleEmail: {
        flex: 1,
        fontFamily: FONT_MAIN,
        fontSize: 10,
    },
    timeCenterModuleEmail: {
        flex: 1,
        fontFamily: FONT_MAIN,
        fontSize: 10,
    },
    timeRightModuleEmail: {
        flex: 1,
        fontFamily: FONT_MAIN,
        color: 'gray',
    },
    fullNameModuleEmail: {
        marginBottom: 20,
        marginTop: 15,
        fontFamily: FONT_MAIN,
        color: color.BLUE_COLOR,
        fontSize: 12,
    },
    contentCardModulDetailMail: {
        padding: 15,
        marginTop: -25,
        flex: 1,
    },
    timeLeftModuleDetailEmail: {
       flex: 2,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    timeRightModuleDetailEmail: {
        alignItems: 'flex-end',
    },
    fullNameModuleDetailEmail: {
        color: color.BLUE_COLOR,
    },

    backgroundColorOfImgInBase: {
        backgroundColor: '#D3D3D3'
    },
    baseHeaderOfListBase: {
        marginLeft: 0,
        color: "#000",
        fontSize: 17,
        fontFamily: FONT_MAIN_BOLD,
        marginTop: 10,
    },
    textInCardBase: {
        ...buttonTab,
        borderRadius: 10,
        padding: 10,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: color.GREEN_COLOR,
        fontFamily: FONT_MAIN,
    },
    haveBorderBottom: {
        borderBottomWidth: 1.5,
        borderColor: 'rgba(214,214,214, 0.6)',
    },
    wrapperModalUpdate : {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalUpdate : {
        borderRadius: 10,
        width: size.deviceWidth * 0.75,
        height: size.deviceHeight / 4,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textUpdate: {
        fontSize: 14,
        color: 'gray',
        fontFamily: "Helvetica",
    },
    imageFeature: {
        borderRadius: 15,
        height: size.deviceHeight / 3,
        backgroundColor: "#FFF",
    },
    iconBack: {
        height: 40,
        position: 'absolute',
        right: -size.deviceWidth/2 + 30,
        top: -size.deviceHeight/15,
    }
}

const styles = StyleSheet.create(style)

export default (styles)