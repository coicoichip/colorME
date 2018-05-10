import React, { Component } from 'react';
import { COLORS, SIZES } from '../constants';
import { Form, Item, Input, Label } from 'native-base';

class InputCommon extends Component {
    constructor(props) {
        super(props);
        state = {
            value: this.props.value || '',
        }
    }

    onChangeText = (value) => {
        this.setState({ value: value });
        this.props.onChangeText(value);
    }

    render() {
        const { value } = this.setState;
        const { label, size } = this.props;
        return (
            <Item stackedLabel style={size}>
                {
                    label
                        ?
                        <Label style={{
                            color: COLORS.MAIN_COLOR,
                            // fontFamily: 'Segoe UI Bold',
                            fontSize: SIZES.SUBTITLE_SIZE
                        }}>
                            {label}
                        </Label>
                        :
                        null
                }
                <Input
                    {...this.props}
                    autoCorrect={false}
                    value={value}
                    onChangeText={this.onChangeText}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    style={{
                        fontFamily: 'Roboto-Regular',

                    }}
                />
            </Item>
        );
    }
}

export { InputCommon }

