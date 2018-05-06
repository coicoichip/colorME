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
    wrapperContainer : {
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
}
const styles = StyleSheet.create(style)

export default (styles)