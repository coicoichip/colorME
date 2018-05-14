import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl,StyleSheet
} from 'react-native';
import { ActionSheet } from 'native-base';
import {observer} from "mobx-react";
import { observable } from 'mobx';
import store from "../base/baseStore";
import Icon from '../../commons/Icon';
import {coursesStore} from "./coursesStore";
let base_value = null;

export let returnBase = (value) => {
    value(base_value)
}
@observer
class SelectBase extends Component {
    
    constructor(props){
        super(props)
    }
    UNSAFE_componentWillMount(){
       store.getListBase();
       coursesStore.base_name = "";
    }
    pickBase() {
        let OPTIONS = [{name : "Tất cả cơ sở" ,address : "", id : ""}, ...store.bases];
        let OPTIONS_NEW = OPTIONS.map((item) => {
            if(item.name == "Tất cả cơ sở") return item.name;
            else return item.name + "-" + item.address
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
                    coursesStore.base_name = OPTIONS_NEW[buttonIndex]
                    base_value = OPTIONS[buttonIndex].id;
                    this.props.functionBase()
                }
            }
        )
    }
    render(){
        return (
            <View>
                {
             store.isLoading
             ?
             null
             :
            <TouchableOpacity 
             onPress = {() => this.pickBase()}
            >
            <View style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: 'rgb(240, 240, 240)' }}>
                <View style={{ backgroundColor: 'black', borderRadius: 13, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5, flexDirection: 'row', paddingHorizontal: 15 }}>
                    <Text style={{ color: 'white', fontSize: 10 }}>{coursesStore.base_name == ""? "Tất cả cơ sở" : coursesStore.base_name}</Text>
                    <Text></Text>
                    <Icon name={"Entypo|triangle-down"} size={15} color={'white'} />
                </View>
            </View>
        </TouchableOpacity>
                }
        </View>
            
        )
    }
    
}
export default SelectBase