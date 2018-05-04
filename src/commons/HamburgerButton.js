import React, {Component} from 'react';
import {
    TouchableOpacity
} from 'react-native';
import Icon from './Icon';

class HamburgerButton extends Component{
    render(){
        return(
            <TouchableOpacity
                onPress={() => this.props.navigate('DrawerOpen')}>
                <Icon
                    name="SimpleLineIcons|menu"
                    size={25}
                    style={{marginRight: -3, padding: 5}}
                    color={'gray'}
                />
            </TouchableOpacity>
        );
    }
}

export default HamburgerButton;