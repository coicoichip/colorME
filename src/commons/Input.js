import React, { Component } from 'react';
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
        const { label } = this.props;
        return (
            <Item fixedLabel>
                <Label>{label}</Label>
                <Input
                    {...this.props}
                    value={value}
                    onChangeText={this.onChangeText}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
            </Item>
        );
    }
}

export { InputCommon }

