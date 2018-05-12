import { Platform } from 'react-native';
export const FONTS = {
    MAIN_FONT: 'Roboto-Regular',
    MAIN_FONT_BOLD: 'Roboto-Bold',
    LOGO_FONT: (Platform.OS === 'ios') ? 'Segoe UI' : 'seguibl'
}    