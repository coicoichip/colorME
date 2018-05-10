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
                        // source={{ uri: this.props.avatar_url }} />
                        source={{ uri: 'http://i.9mobi.vn/cf/images/2015/03/nkk/nhung-hinh-anh-dep-3.jpg' }} />
                    <View style={styles.noBorder}>
                        {/* <Text style={styles.titleSmallBlue}>Lớp {item.name}</Text>
                            <Text style={styles.titleSmallDarkGrayThin}>{item.study_time}</Text>
                            <Text style={styles.titleSmallDarkGrayThin}>{item.address}</Text>
                            <Text style={styles.titleSmallDarkGrayThin}>{item.description}</Text> */}
                        <Text style={styles.titleSmallBlue}>Lớp Photoshop</Text>
                        <Text style={styles.titleSmallDarkGrayThin}>thứ 3 - thứ 5 - thứ 7</Text>
                        <Text style={styles.titleSmallDarkGrayThin}>Đại học bách khoa Hà Nội</Text>
                        <Text style={styles.titleSmallDarkGrayThin}>Lớp học rất hay và thú vị</Text>
                        {/* {this.props.buttonRegister(item, status, isEnrolled)} */}
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                            <TouchableOpacity
                                style={styles.buttonLeftRegisterGray}>
                                <Text style={styles.titleNormalLight}>Đã đăng ký</Text>
                            </TouchableOpacity>
                        </View>   
                    </View>
                </View>
            </TouchableOpacity>
            // </CardItem>
        )
    }
}

