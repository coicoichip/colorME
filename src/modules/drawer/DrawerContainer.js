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
import styles from "../../styles/styles";
import { COLORS, STRINGS } from '../../constants';
import { deviceWidth } from "../../styles/sizes";
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
                            style={[customStyles.wrapperButtonLogout, { backgroundColor: COLORS.MAIN_COLOR }]}
                            onPress={() => loginStore.logout(this.props.navigation)}
                        >
                            <Text style={[customStyles.buttonLogout, styles.textDescriptionLightBold]}>{STRINGS.LOGOUT.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
const customStyles = StyleSheet.create({
    wrapperButtonLogout: {
        width: deviceWidth * 3 / 4,
        position: 'absolute',
        height: 40,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

})

export default (DrawerContainer)