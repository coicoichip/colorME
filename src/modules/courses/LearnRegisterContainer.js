import React, { Component } from 'react';
import {
    Text, View, Image, Platform, PanResponder
} from 'react-native';
import {
    Body, CardItem, Header, Container, Button,
    Left, Right, Spinner, Item
} from 'native-base';
import BackButton from '../../commons/BackButton';
import styles from '../../styles/styles';
import ListRegisterCourses from './ListRegisterCourses'
class LearnRegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            modalRegister: false,
            name: '',
            study_time: '',
            description: '',
            address: '',
            avatar_url: this.props.navigation.state.params.avatar_url,
            isEnrolled: [],
            classes: [],
            status: [],
            key: '',
            isLoading : false
        }
        // this.buttonRegister = this.buttonRegister.bind(this)
    }
    isLoading(){
        this.setState({isLoading : true})
        setTimeout(() => this.setState({isLoading : false}), 500)
    }

    componentWillMount() {
        this.isLoading()
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            // onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
        let classes = [];
        let isEnrolled = [];
        let status = [];
        let i = 0;
        let data = this.props.navigation.state.params.classes;
        console.log(data + '>>>');
        // let data = this.props.navigation.state.params.classes;
        // while (i < data.length) {
        //     let key = {key: i};
        //     let arr2 = data[i].status;
        //     let arr1 = data[i].isEnrolled;
        //     let arr = Object.assign(data[i], key);
        //     classes.push(arr);
        //     isEnrolled.push(arr1);
        //     status.push(arr2);
        //     i++;
        // }
        this.setState({classes: classes, isEnrolled: isEnrolled, status: status});
    }
    render() {
        const { goBack, navigate } = this.props.navigation;
        return (
            <Container style={styles.wrapperContainer}>
                <Text style={{ height: 100 }} />
                <BackButton goBack={goBack} />
                <ListRegisterCourses />
            </Container>
        );
    }
}
export default LearnRegisterContainer;