import React, {Component} from 'react';
import {
    View, StyleSheet
} from 'react-native';
import {Spinner} from 'native-base';

export default class Loading extends Component{
    render(){
        return(
            <View style={[styles.wrapperCenter, this.props.style]}>
                <Spinner color={'gray'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapperCenter:{
        alignItems: 'center',
        justifyContent: 'center',
    },
})
