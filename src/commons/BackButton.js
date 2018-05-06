import React, {Component} from 'react';
import {
    TouchableOpacity, View
} from 'react-native';
import IconDefault from './IconDefault';

export default class BackButton extends Component {
    render() {
        return (
            <TouchableOpacity style={{flexDirection: 'row'}}
                              onPress={() => this.props.goBack(null)}
            >
                <IconDefault
                    name={'Ionicons|ios-arrow-back'}
                    style={{paddingLeft: 0}}
                    size={20}

                />
            </TouchableOpacity>
        );
    }
}
