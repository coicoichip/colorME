import React, { Component } from 'react';
import { Platform, StatusBar, Modal, Image, PanResponder, Text, TouchableOpacity, View, ScrollView } from 'react-native';

import {
    List,
    ListItem,
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Input,
    Item,
    Left,
    Right,
    Spinner,
    Thumbnail
} from 'native-base';

import styles from '../../styles/styles'
import _ from "lodash"
import * as size from '../../styles/sizes';
import * as color from '../../styles/colors';


export default class ListRegisterCourses extends Component {
    constructor() {
        super()
    }

    // shouldComponentUpdate(nextProps , nextState){
    //     return !_.isEqual((nextProps.item, this.props.item) || (nextProps.status, this.props.status) || (nextProps.isEnrolled, this.props.isEnrolled) )
    // }


    render() {
        // const{item, avatar_url, status, isEnrolled} = this.props;
        const { item, avatar_url, status, isEnrolled } = this.props;
        return (
            // <CardItem
            //     avatar
            //     style={[styles.padding, styles.haveBorderBottom]}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={[{ flex: 1 }, styles.padding]}
            >
                <View style={styles.cardCmt}>
                    <Image
                        style={[styles.avatarUserNormal, styles.marginRightFar]}
                        // source = {require('../../../assets/icons/bell_disable.png')}/>
                        source={{ uri: this.props.avatar_url }} />
                    <View style={styles.noBorder}>
                        {/* <Text style={styles.titleSmallBlue}>Lớp {item.name}</Text>
                            <Text style={styles.titleSmallDarkGrayThin}>{item.study_time}</Text>
                            <Text style={styles.titleSmallDarkGrayThin}>{item.address}</Text>
                            <Text style={styles.titleSmallDarkGrayThin}>{item.description}</Text> */}
                        <Text style={styles.titleSmallBlue}>Lớp {item.name}</Text>
                        <Text style={styles.titleSmallDarkGrayThin}>{item.study_time}</Text>
                        {/* <Text style={styles.titleSmallDarkGrayThin}>{item.address}</Text> */}
                        <Text style={styles.titleSmallDarkGrayThin}>{item.description}</Text>
                        {/* {this.props.buttonRegister(item, status, isEnrolled)} */}
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            {this.props.buttonRegister(item, status, isEnrolled)}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            // </CardItem>
        )
    }
}

