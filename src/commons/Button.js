import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { Text, Button } from 'native-base';

class ButtonCommon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { label, onPress, isLoading } = this.props;
        return (
            <Button onPress={onPress} full warning style={{ backgroundColor: COLORS.MAIN_COLOR, borderRadius: 50, marginTop: 20 }}>
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
                        <Text>{label}</Text>
                }
            </Button>
        );
    }
}

export { ButtonCommon }

