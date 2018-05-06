import React, {Component} from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import IconDefault from '../../commons/IconDefault'
import { Container, Content, Footer,
  FooterTab} from 'native-base';
import { DrawerItems } from 'react-navigation';
import styles from "../../styles/styles";
import * as color from "../../styles/colors";
import {deviceWidth} from "../../styles/sizes";
class DrawerContainer extends Component {


  render () {
      const {navigate} = this.props.navigation;
      const {goBack} = this.props.navigation;
      return (
          <Container style={styles.wrapperContainer}>
              <View
                  style={[styles.wrapperLogoDrawer, styles.wrapperCenter,{backgroundColor: color.MAIN_COLOR}]}
              >
                 <Image
                  source={require("../../../assets/image/colorMe.jpg")}
                  resizeMode={'contain'}
                  style={styles.imageDrawer}
                 />

              </View>
              <Content style={{flex: 1}}>
                  <DrawerItems {...this.props} />
              </Content>
              <Footer style={{ backgroundColor: 'transparent', borderTopWidth: 0, height: 40 }}>
                    <FooterTab>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[customStyles.wrapperButtonLogout, { backgroundColor: color.MAIN_COLOR }]}
                            onPress={() => this.logout()}
                        >
                            <Text style={[customStyles.buttonLogout, styles.textDescriptionLightBold]}>{'Đăng xuất'.toUpperCase()}</Text>
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