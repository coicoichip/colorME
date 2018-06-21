import React, {Component} from 'react';
import {
    TouchableOpacity
} from 'react-native';
import Icon from './Icon';
import general from '../Style/generalStyle';

export default class SearchButton extends Component{
    constructor(){
        super();
        this.state = {
            text: '',
        }
    }
    render(){
        return(
            <TouchableOpacity
                activeOpacity={1}
                style={[general.buttonSearch, general.shadow, {display: 'flex'}]}
                onPress={this.props.function}
            >
                <Icon name={'fontawesome|search'} size={20} color={'#FFF'}/>
            </TouchableOpacity>
        );
    }
}