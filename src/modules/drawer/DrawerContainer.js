import React, { Component } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet, StatusBar
} from 'react-native';
import IconDefault from '../../commons/IconDefault'
import {
    Container, Content, Footer,
    FooterTab
} from 'native-base';
import { DrawerItems } from 'react-navigation';
import { COLORS,SIZES, STRINGS } from '../../constants';
import loginStore from "../login/loginStore";



class DrawerContainer extends Component {
    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        return (
            <Container style={{ backgroundColor: COLORS.LIGHT_COLOR }}>
            <StatusBar
                    barStyle={COLORS.BAR_STYLE_MAIN}
                    backgroundColor={COLORS.LIGHT_COLOR}
                />
                <View style={[styles.wrapperLogoDrawer, styles.wrapperCenter]}>
                </View>
                <Content style={{ flex: 1 }}>
                    <DrawerItems {...this.props} />
                </Content>
                <Footer style={{ backgroundColor: 'transparent', borderTopWidth: 0, height: 40 }}>
                    <FooterTab>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[styles.wrapperButtonLogout, { backgroundColor: COLORS.MAIN_COLOR }]}
                            onPress={() => loginStore.logout(this.props.navigation)}
                        >
                            <Text style={styles.buttonLogout}>{STRINGS.LOGOUT}</Text>
                        </TouchableOpacity>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    wrapperButtonLogout: {
        width: SIZES.DEVICE_WIDTH_SIZE * 0.75,
        position: 'absolute',
        height: 40,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapperLogo: {
        width: SIZES.DEVICE_WIDTH_SIZE * 0.75,
        height: 200,
    }
})

export default (DrawerContainer)