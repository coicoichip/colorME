import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

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
        const { value } = this.setState
        const { label} = this.props
        return (
            <Form>
                <Item fixedLabel>
                    <Label>{label}</Label>
                    <Input
                        value={value}
                        onChangeText={this.onChangeText}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                </Item>
            </Form>
        );
    }
}

export {InputCommon}