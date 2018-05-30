import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity, StyleSheet, Platform, WebView
} from 'react-native';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import { Container, Item, Input } from 'native-base';
import Header from '../../commons/Header';
import Icon from "../../commons/Icon"
import IconDefault from "../../commons/IconDefault"
import { formatImageLink, dotNumber } from "../../helper/index"
class ListNotification extends Component {
    constructor() {
        super()
    }
    convertNotificationContent(text) {
        if (text)
            return text.replace(/<strong>/g, "").replace(/<\/strong>/g, "")
    }

    render() {
        const { navigate } = this.props;
        const { item } = this.props;
        return (
            // <WebView source = {{html : "<h1>chao</h1>"}} />
            <View style = {{ backgroundColor : item.seen == 1 ? COLORS.GRAY_COLOR : "white"}}>
               
                <View style={[styles.paddingLeftRight, { padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgb(242,242,242)'}]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: formatImageLink(item.image_url) }} style={styles.imageIcon} />
                        <View style={{ marginLeft: 10 , marginRight : 20 }}>
                        
                            <Text numberOfLines={2} style={styles.emailNameModuleEmail}>{this.convertNotificationContent(item.message)}</Text>
                            {item.content ?  <Text numberOfLines = {2}>{item.content.trim()} </Text> : null}
                        </View>
                    </View>
                    <View style={{ marginLeft: 40, marginTop: 10 }}><Text style={styles.textName}>{item.created_at}</Text></View>
                </View>
            </View>
        )
    }
}

export default ListNotification
const wrapperCenter = {
    justifyContent: 'center',
    alignItems: 'center',
}
const text = {
    fontFamily: 'Roboto-Regular',
    backgroundColor: 'transparent',
    color: COLORS.DARK_COLOR,
    fontSize: SIZES.TEXT_BUTTON_SIZE,
}
const styles = StyleSheet.create({
    wrapperCenter: {
        ...wrapperCenter
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    imageIcon: {
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    emailNameModuleEmail: {
        fontSize: 14,
        fontFamily: FONTS.MAIN_FONT
    },
    circleGreen: {
        marginRight: 15,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.GREEN_COLOR,
    },
    circleRed: {
        marginRight: 15,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.MAIN_COLOR,
    },
    circleGray: {
        marginRight: 15,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.GRAY_COLOR,
    }, textName: {
        color: 'rgb(182,182,182)',
        fontSize: 13
    }
})