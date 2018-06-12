import React, { Component } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet, StatusBar
} from 'react-native';
import Icon from '../../commons/Icon';
import {
    Container, Content, Footer,
    FooterTab
} from 'native-base';
import { observer } from "mobx-react";
import getProfileStore from "../profile/profileStore";
import { DrawerItems } from 'react-navigation';
import { COLORS, SIZES, STRINGS } from '../../constants';
import { formatImageLink } from "../../helper/index";


@observer
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
                <View style={styles.wrapperLogoDrawer}>
                    <Image
                        resizeMode={"cover"}
                        source={getProfileStore.user.avatar_url ? { uri: formatImageLink(getProfileStore.user.avatar_url) } : require("../../../assets/image/colorMe.jpg")}
                        style={styles.imageFeature}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{getProfileStore.user.name || ''}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name={'FontAwesome|edit'} style={{ marginRight: 5 }} />
                            <TouchableOpacity activeOpacity={.8} 
                                onPress={() => {
                                    navigate('Profile')
                                }}
                            >
                                <Text>{STRINGS.EDIT_USER.trim()}</Text>

                            </TouchableOpacity>

                        </View>
                    </View>


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
                            <Text style={{ fontFamily: 'Roboto-Bold', color: '#fff', fontSize: 14 }}>{STRINGS.LOGOUT.toUpperCase()}</Text>
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
        position: "absolute",
        height: 40,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    wrapperLogo: {
        width: SIZES.DEVICE_WIDTH_SIZE * 0.75,
        height: 200
    },
    wrapperLogoDrawer: {
        flexDirection: 'row',
        height: 200,
        // justifyContent: "",
        alignItems: "center",
        marginLeft: 15,

    },
    imageFeature: {
        width: 80,
        height: 80,
        borderRadius: 40,
    }
});

export default (DrawerContainer)