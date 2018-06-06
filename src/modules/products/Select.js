import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl, StyleSheet
} from 'react-native';
import { ActionSheet } from 'native-base';
import { observer } from "mobx-react";
import { observable } from 'mobx';
import { productsStore } from './productsStore';
import Icon from '../../commons/Icon';
let info_value = null;
let date_value = null;

export let returnInfo = (value) => {
    value(info_value)
}
export let returnDate = (value) => {
    value(date_value)
}
@observer
class Select extends Component {

    constructor(props) {
        super(props)
        this.state = {
            info: [{ name: 'Nổi bật', id: 1, filter: 7 }, { name: 'Mới nhất', id: 2, filter: 0 }],
            date: [{ name: 'Hôm nay', id: 1, filter: 1 }, { name: '7 ngày qua', id: 2, filter: 7 }, { name: '30 ngày qua', id: 3, filter: 30 }]
        }
    }
    UNSAFE_componentWillMount() {
        productsStore.info_name = "Nổi bật";
        productsStore.date_name = "7 ngày qua";
        productsStore.data_id = 7;
        productsStore.info_id = 7;
    }
    pickInfo() {
        let OPTIONS = this.state.info;
        let OPTIONS_NEW = OPTIONS.map((item) => {
            return item.name;
            Console.log(this.state.info.name)
        });
        let OPTIONS_RENDER = [...OPTIONS_NEW, "Thoát"];
        let CANCEL_INDEX = OPTIONS_RENDER.length - 1;
        ActionSheet.show(
            {
                options: OPTIONS_RENDER,
                cancelButtonIndex: CANCEL_INDEX,

            },
            buttonIndex => {
                if (buttonIndex < OPTIONS_RENDER.length - 1) {
                    productsStore.info_name = OPTIONS_NEW[buttonIndex]
                    info_value = OPTIONS[buttonIndex].filter;
                    this.props.functionInfo()
                }
            }
        )
    }
    pickDate() {
        let OPTIONS = this.state.date;
        let OPTIONS_NEW = OPTIONS.map((item) => {
            return item.name;
        });
        let OPTIONS_RENDER = [...OPTIONS_NEW, "Thoát"];
        let CANCEL_INDEX = OPTIONS_RENDER.length - 1;
        ActionSheet.show(
            {
                options: OPTIONS_RENDER,
                cancelButtonIndex: CANCEL_INDEX,

            },
            buttonIndex => {
                if (buttonIndex < OPTIONS_RENDER.length - 1) {
                    productsStore.date_name = OPTIONS_NEW[buttonIndex]
                    info_value = OPTIONS[buttonIndex].filter;
                    this.props.functionDate()
                }
            }
        )
    }
    render() {
        return (
            <View>
                {this.props.haveInfo?
                <TouchableOpacity
                    onPress={() => this.pickInfo()}
                >
                    <View style={{ paddingLeft: 20, paddingVertical: 10}}>
                        <View style={{ backgroundColor: 'black', borderRadius: 13, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5, flexDirection: 'row', paddingHorizontal: 15 }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>{productsStore.info_name}</Text>
                            <Text></Text>
                            <Icon name={"Entypo|triangle-down"} size={15} color={'white'} />
                        </View>
                    </View>
                </TouchableOpacity>
                : null
                }
                {this.props.haveDate == 'haveDate' ?
                    <TouchableOpacity
                        onPress={() => this.pickDate()}
                    >
                        <View style={{ paddingLeft: 20, paddingVertical: 10}}>
                            <View style={{ backgroundColor: 'black', borderRadius: 13, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5, flexDirection: 'row', paddingHorizontal: 15 }}>
                                <Text style={{ color: 'white', fontSize: 10 }}>{productsStore.date_name}</Text>
                                <Text></Text>
                                <Icon name={"Entypo|triangle-down"} size={15} color={'white'} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    : null
                        }
            </View>

        )
    }

}
export default Select