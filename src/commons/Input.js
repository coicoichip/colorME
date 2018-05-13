import React, { Component } from 'react';
import { COLORS, SIZES } from '../constants';
import { Form, Item, Input, Label } from 'native-base';
import {TextInput} from 'react-native'
class InputCommon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
        }
    }

    onChangeText = (value) => {
        this.setState({ value: value });
        this.props.onChangeText(value);
    }

    render() {
        const { value } = this.state;
        const { label, size } = this.props;
        return (
            <Item stackedLabel style={size}>
                {
                    label
                        ?
                        <Label style={{
                            color: COLORS.MAIN_COLOR,
                            fontFamily: 'Roboto-Bold',
                            fontSize: SIZES.DESCRIPTION_SIZE
                        }}>
                            {label}
                        </Label>
                        :
                        null
                }
                <Input
                    {...this.props}
                    // autoFocus = {true}
                    
                    autoCorrect={false}
                    onSubmitEditing = {this.props.onSubmitEditing ? this.props.onSubmitEditing : () => {}}
                    value={value || this.props.value}
                    onChangeText={this.onChangeText}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize : SIZES.SUBTITLE_SIZE
                    }}
                />
            </Item>
        );
    }
}

export { InputCommon }

