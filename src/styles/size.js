import {Dimensions} from 'react-native';
import {
    Platform,
} from 'react-native';
export const iconNormal         = 15;
export const iconBig            = 20;
export const iconInDrawer            = 12;
export const iconGiant          = Platform.OS === 'ios' ? 25 : 20;
export const iconNewFeed        = 30 ;
export const title              = 14;
export const titleNormal        = 13;
export const titleSmall         = 12;
export const describe           = 12;
export const profileProgressWidth           = Dimensions.get('window').width - 40;
export const PARALLAX_HEADER_HEIGHT = 250;
export const PARALLAX_HEADER_HEIGHT_USER = 150;
export const PARALLAX_HEADER_HEIGHT_COURSE_INFORMATION = Dimensions.get('window').height * 0.3;
export const STICKY_HEADER_HEIGHT = 60;
export let wid = Dimensions.get('window').width;
export let hei = Dimensions.get('window').height;
