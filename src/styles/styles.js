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
    
}
const styles = StyleSheet.create(style)

export default (styles)