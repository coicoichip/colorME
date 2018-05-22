import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { Text, Button } from 'native-base';

class ButtonCommon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { label, onPress, isLoading, style } = this.props;
        return (
            <Button
                onPress={() => isLoading ? {} : onPress()}
                full
                warning
                style={[{
                    backgroundColor: this.props.haveColorGreen? COLORS.GREEN : COLORS.MAIN_COLOR,
                    borderRadius: 50,
                    elevation: 6, shadowColor: COLORS.SHADOW_COLOR,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.4,
                }, style]}
            >
                {
                    isLoading
                        ?
                        <ActivityIndicator
                            animated={true}
                            color={COLORS.LIGHT_COLOR}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            size='small'
                        />
                        :
                        <Text  style={this.props.text}>{label}</Text>
                }
            </Button>
        );
    }
}

export { ButtonCommon }

