import {StyleSheet} from 'react-native';
import * as size from './size';

const parallaxStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: size.wid,
        height: size.PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        alignItems: 'center',
        height: size.STICKY_HEADER_HEIGHT,
        backgroundColor: '#fff'
    },
    parallaxHeader: {
        marginTop: 20,
        height: size.PARALLAX_HEADER_HEIGHT_USER,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    parallaxHeaderPost: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    parallaxHeaderTitle: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        bottom: 20
    },
});

export default parallaxStyle;