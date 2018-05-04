import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {StatusBar, View} from 'react-native';
import {addNavigationHelpers} from 'react-navigation';
import AppNav from "./AppNav";
import * as color from '../styles/colors';

class AppWithNavigationState extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {dispatch, nav} = this.props;
        return (
            <View style={{flex: 1}}>

                {/* <StatusBar
                    barStyle="light-content"
                    backgroundColor={color.main}
                /> */}
                <AppNav  nav = {nav} navigation={addNavigationHelpers({dispatch, state: nav})}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});
export default connect(mapStateToProps) (AppWithNavigationState)