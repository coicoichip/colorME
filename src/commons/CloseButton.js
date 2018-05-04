import React, {Component} from 'react';
import {
    TouchableOpacity, StyleSheet
} from 'react-native';
import IconDefault from './IconDefault';

export default class CloseButton extends Component{
    render(){
        return(
            <TouchableOpacity
                onPress={() => this.props.goBack(null)}
            >
                <IconDefault
                    name={'Ionicons|md-close'}
                    style={{paddingLeft :0}}
                    color={this.props.color ? this.props.color : null}
                />
            </TouchableOpacity>
        );
    }
}
