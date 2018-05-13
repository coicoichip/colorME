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
import { coursesStore } from './coursesStore';
import { observer } from "mobx-react";
import styles from '../../styles/styles'
import _ from "lodash"
import * as size from '../../styles/sizes';
import * as color from '../../styles/colors';

@observer
export default class ListRegisterCourses extends Component {
    constructor() {
        super()
    }
    render() {
        const { item, buttonRegister } = this.props;
        return (
            <View style={{ marginTop: 20 }}>
                <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 15, marginRight: 20, justifyContent: 'center' }}>
                    <View style={[{ flexDirection: 'row', alignItems: 'center'}, styles.paddingLeftRight]}>
                        <Image
                            style={[styles.avatarUserNormal, styles.marginRightFar ]}
                            source={{ uri: item.icon_url }} />
                            <Text style={[styles.emailNameModuleEmail, {marginRight: 20}]}>Lớp {item.name}</Text>
                    </View>
                    <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                        <Text style={{ height: 7 }}></Text>
                        <Text style={styles.textDescriptionDark}>{item.study_time}</Text>
                        <Text style={{ height: 3 }}></Text>
                        <Text numberOfLines={2} style={styles.textDescriptionDark}>Cơ sở 1 - số 175 chùa Láng - Đống Đa - Hà Nội</Text>
                        <Text style={{ height: 3 }}></Text>
                        <Text style={styles.textDescriptionDark}>Khai giảng ngày : {item.date_start}</Text>
                        <Text style={{ height: 15 }}></Text>
                        {this.props.buttonRegister(item, item.status)}
                    </View>
                </TouchableOpacity>
                <View style={styles.footerCard}>
                </View>
            </View>
        )
    }
}

