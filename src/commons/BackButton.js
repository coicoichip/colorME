import React, { Component } from 'react';
import {
    TouchableOpacity, View
} from 'react-native';
import IconDefault from './IconDefault';
import { SIZES, COLORS } from '../constants';

class BackButton extends Component {
    render() {
        const { color } = this.props;
        return (
            <TouchableOpacity style={{ position: 'absolute', top: 20, left: 0, paddingHorizontal: 30 }}
                activeOpacity={SIZES.ACTIVE_OPACITY}
                onPress={() => this.props.goBack(null)}
            >
                <IconDefault
                    name={'Ionicons|ios-arrow-back'}
                    style={{ paddingLeft: 0 }}
                    size={SIZES.ICON_SIZE}
                    color={color ? color : COLORS.GRAY_COLOR}

                />
            </TouchableOpacity>
        );
    }
}

export { BackButton };
