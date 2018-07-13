import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity, StyleSheet, Platform,
} from 'react-native';
import { STRINGS, COLORS, SIZES, FONTS } from '../../../constants';
import { Container, Item, Input } from 'native-base';

import Icon from "../../../commons/Icon"

import { formatImageLink, dotNumber } from "../../../helper/index"

export default class ListProducts extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const{item, navigate} = this.props;
        return (
        

             <TouchableOpacity activeOpacity={0.8} style={[{ borderRadius : 5, marginBottom: 15, width : SIZES.DEVICE_WIDTH_SIZE / 2, marginLeft : 15 , backgroundColor : COLORS.LIGHT_COLOR}]}
                        onPress = {() => navigate("DetailBlog", {id : item.id})}
                        >
                            <View >
                                <Image source={{ uri: item.thumb_url ? formatImageLink(item.thumb_url) : "" }} style={styles.imageAvatarModuleEmails} />
                            </View>
                            <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                                <Text numberOfLines={2} style={styles.emailNameModuleEmail}>{item.title}</Text>
                                <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 20, width: 20, borderRadius: 10 }}
                                        source={{ uri: item.author ? formatImageLink(item.author.avatar_url) : "" }}
                                    />
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginLeft: 5 }}>{item.author ? item.author.name.trim() : ""}</Text>
                                    
                                </View>
                                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, color: 'gray' }}>{item.created_at ? item.created_at.trim() : ""}</Text>
                            </View>
                        </TouchableOpacity>
      
        )
    }
}
const isIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
    wrapperCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperContainer: {
        flex: 1,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    // coppy blog
    imageAvatarModuleEmails: {
        width: SIZES.DEVICE_WIDTH_SIZE / 2,
        height: SIZES.DEVICE_HEIGHT_SIZE / 3.3,
    },

    contentCardImageInformation: {
        flex: 2,
        position: 'relative',
        paddingRight: 10,
        paddingTop: 5,
    },
    emailNameModuleEmail: {
        fontSize: 15,
        paddingTop: 10,
    },
    footerCard: {
        height: 25,
        backgroundColor: 'rgb(240, 240, 240)'
    },
})
