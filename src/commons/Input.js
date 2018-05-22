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
    havestackedLabel(){
        if(this.props.havestackedLabel == 0) return null
        else return stackedLabel
    }
    render() {
        const { value } = this.state;
        const { label, size, fontsize } = this.props;
        const havestackedLabel = this.props.havestackedLabel ? false : true
        return (
            <Item stackedLabel = {havestackedLabel} style={size}>
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
                    value={this.props.value}
                    onChangeText={this.onChangeText}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize : fontsize ? fontsize : SIZES.SUBTITLE_SIZE,
                    }}
                />
            </Item>
        );
    }
}

export { InputCommon }

