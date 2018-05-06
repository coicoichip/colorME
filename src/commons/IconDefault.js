import React, {Component} from 'react';
import Icon from './Icon';

class IconDefault extends Component{
    render(){
        return(
            <Icon
                name={this.props.name}
                size={this.props.size ? this.props.size : 30}
                color={this.props.color ? this.props.color : "#3a3a3a"}
                style={[{padding: 5},this.props.style]}
            />
        );
    }
}

export default IconDefault;