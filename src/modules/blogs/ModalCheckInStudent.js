import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { SIZES, COLORS, STRINGS } from '../../constants';
import { NetworkInfo } from 'react-native-network-info';
import { observer } from "mobx-react";
import blogStore from './blogStore';
import splashStore from '../splash/splashStore';
import loginStore from '../login/loginStore';

@observer
export default class ModalCheckInStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mac_id: ''
        }
    }

    componentDidMount() {
        console.log(blogStore.attendanceData)
        NetworkInfo.getBSSID(bssid => {
            if (bssid && bssid != 'error' && bssid.indexOf("bssid") == -1) {
                this.state.mac_id = bssid
            } else {

            }
        });
    }

    attendance = () => {
        const {mac_id} = this.state;
        blogStore.attendance(
            blogStore.attendanceData.id, 
            (Array.isArray(blogStore.attendanceData) && blogStore.attendanceData.length > 0) ? blogStore.attendanceData.length - 1 : null,
            mac_id,
            splashStore.token || loginStore.token
        )
    }

    render() {
        return (
            <View style={{
                height: SIZES.DEVICE_HEIGHT_SIZE * 0.8,
                width: SIZES.DEVICE_WIDTH_SIZE * 0.8,
                backgroundColor: COLORS.LIGHT_COLOR,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text> {blogStore.attendanceData.name} </Text>
                <Button onPress={this.attendance} title="Diem dnah" />
            </View>
        );
    }
}
