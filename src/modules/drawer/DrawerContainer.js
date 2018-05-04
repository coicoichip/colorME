import React, { Component } from 'react';
import {
    Image,
    Text, AsyncStorage,
    TouchableOpacity,
    View,
    StyleSheet,

} from 'react-native';
import IconDefault from '../../commons/IconDefault'
import {
    Container, Content, Footer,
    FooterTab
} from 'native-base';
import Loading from "../../commons/Loading"
import { DrawerItems } from 'react-navigation';
import styles from "../../styles/styles";
import * as color from "../../styles/colors";
import { deviceWidth } from "../../styles/sizes";
import { logout } from "../login/logoutAction";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';

class DrawerContainer extends Component {
    componentWillMount(){
  //      this.props.getTabs(this.props.token)
    }
    logout() {
        this.props.logout();
       
    }
    // drawerItem(items) {
    //     const { isLoadingTabs, tabs } = this.props;
    //     let drawerItems = [items[0], items[2], items[3], items[4], items[5]];
    //     if (isLoadingTabs == false && tabs.length !== 0) {
    //         for (let i = 0; i < tabs.length; i++) {
    //             for (let j = 0; j < items.length; j++) {
    //                 if(items[j].hasOwnProperty('routes') && items[j].routes[0].params !== undefined){
    //                 if ( items[j].routes[0].params.idRoute == tabs[i].id) { drawerItems.push(items[j]); continue; }
    //             }
    //         }
    //         }
    //         return drawerItems;
    //     } else { return items }
    // }

    // resetTo(route) {
    //     const actionToDispatch = NavigationActions.reset({
    //        index : 0,
    //        key : null,
    //         actions: [NavigationActions.navigate({ routeName: route })],
    //     });
    //     this.props.navigation.dispatch(actionToDispatch);
    // }


    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        // const clonedProps = {
        //     ...this.props,
        //     items: this.drawerItem(this.props.items),
        // };
        return (
            <Container>
                <View
                    style={[styles.wrapperLogoDrawer, styles.wrapperCenter]}
                >
                    <Image
                        source={require("../../../assets/image/colorMe.jpg")}
                        resizeMode={'contain'}
                        style={styles.imageDrawer}
                    />

                </View>
                <Content style={{ flex: 1 }}>
                    {this.props.isLoadingTabs ? <Loading/> : <DrawerItems {...this.props} />}
                    
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
function mapStateToProps(state) {
    return {
    }
}
function mapDisptachToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),

    }
}
export default connect(mapStateToProps,mapDisptachToProps) (DrawerContainer);


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

