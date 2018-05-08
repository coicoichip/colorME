import React, {Component} from 'react';
import {
    Text, View, Image, Platform
} from 'react-native';
import {
    Body, CardItem, Header, Container, Button,
    Left, Right, Spinner, Item
} from 'native-base';
import BackButton from '../../commons/BackButton';
import styles from '../../styles/styles';
class LearnRegisterContainer extends Component {
    render() {
        const { goBack, navigate } = this.props.navigation;
        return (
            <Container style={styles.wrapperContainer}>
            <Text style={{height: 100}}/> 
            <BackButton goBack={goBack}/>
                <Text>Xin chào các bạn </Text>
            </Container>
        );
    }
}
export default LearnRegisterContainer;