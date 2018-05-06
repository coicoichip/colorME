import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';

const ICON_SET_MAP = {
    FontAwesome: FontAwesome,
    Foundation: Foundation,
    Ionicons: Ionicons,
    MaterialIcons: MaterialIcons,
    Zocial: Zocial,
    SimpleLineIcons: SimpleLineIcons,
    MaterialCommunityIcons: MaterialCommunityIcons,
    Entypo: Entypo,
    EvilIcons: EvilIcons,
    Octicons: Octicons,
    Feather: Feather,
};

// This is a composition is a drop in replacement for users migrating from the
// react-native-icons module. Please don't use this component for new apps/views.
export default class Icon extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        size: PropTypes.number,
        color: PropTypes.string,
    };

    setNativeProps(nativeProps) {
        if (this.iconRef) {
            this.iconRef.setNativeProps(nativeProps);
        }
    }

    iconRef = null;

    handleComponentRef = (ref) => {
        this.iconRef = ref;
    };

    render() {
        const nameParts = this.props.name.split('|');
        const setName = nameParts[0];
        const name = nameParts[1];

        const IconSet = ICON_SET_MAP[setName];
        if (!IconSet) {
            throw new Error(`Invalid icon set "${setName}"`);
        }

        return (
            <IconSet
                allowFontScaling={false}
                ref={this.handleComponentRef}
                {...this.props}
                name={name}
            />
        );
    }
}
