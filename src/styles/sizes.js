import {Dimensions, Platform} from 'react-native';

export let deviceWidth = Dimensions.get('window').width;
export let deviceHeight = Dimensions.get('window').height;

export const ICON_SIZE = 25;
export const NUMBER_CARD = 23;
export const TEXT_DESCRIPTION = 12;
export const TAB_BAR_HEIGHT = 50;
export const HEIGHT_FULL_WIDTH_IMAGE = deviceHeight / 3 + 20;
export const PARALLAX_HEADER_HEIGHT = 250;
export const PARALLAX_HEADER_HEIGHT_USER = 150;
export const STICKY_HEADER_HEIGHT = Platform.OS === 'ios' ? 60 : 40 ;