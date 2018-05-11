import React, { Component } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import IconDefault from '../../commons/IconDefault'
import {
    Container, Content, Footer,
    FooterTab
} from 'native-base';
import { DrawerItems } from 'react-navigation';
import { COLORS,SIZES, STRINGS } from '../../constants';

class DrawerContainer extends Component {
    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        return (
            <Container style={{backgroundColor: COLORS.LIGHT_COLOR}}>
                <View
                    style={styles.wrapperLogo}
                >
                    {/* <Image
                  source={require("../../../assets/image/colorMe.jpg")}
                  resizeMode={'contain'}
                  style={styles.imageDrawer}
                 /> */}

                </View>
                <Content style={{ flex: 1 }}>
                    <DrawerItems {...this.props} />
                </Content>
                    
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
        backgroundColor: COLORS.SHADOW_COLOR,
      
    }
})

export default (DrawerContainer)