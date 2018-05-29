import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,StyleSheet, Platform
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
    convertNotificationContent(text){
        if(text)
            return text.replace(/<strong>/g, "").replace(/<\/strong>/g, "").toUpperCase()
    }

    render() {
        const {navigate} = this.props;
        const { item } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.cardItem,styles.shadow,
                    { margin: 20, marginBottom: 10, marginTop: 10, paddingLeft: 15, paddingTop: 15, backgroundColor: item.seen == 2 ? COLORS.GREEN : COLORS.LIGHT_COLOR }]} onPress={() => {}}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Image
                            style={styles.avatarCircleSmall}
                            source={{ uri: item.image_url ? formatImageLink(item.image_url) : "" }}
                        />
                    </View>
                    <View style={{ alignItems: 'flex-start', marginLeft: 10, backgroundColor:'transparent', width: SIZES.DEVICE_WIDTH_SIZE - 110 }}>
                        <Text style={[styles.textDescriptionDark, { fontSize: 12 }]}>
                        {this.convertNotificationContent(item.message ? item.message : "")}
                        </Text>
                        <Text style={{ height: 3 }} />
                        <Text style={[styles.textDescriptionGray, { fontSize: 12}]}>{item.created_at}</Text>
                        <Text style={{ height: 3 }} />
                    </View>
                    {
                        item.seen == 2 
                        ?
                        null
                        :
                        <Icon name={"FontAwesome|circle"} size={10} color={COLORS.GREEN_COLOR} style={{ position: "absolute", left: -10 , top: -10, backgroundColor: 'transparent' }} />
                    }
                </View>
            </TouchableOpacity>
        )
    }
}
export default ListNotification
const wrapperCenter = {
    alignItems: 'center',
    justifyContent: 'center',
};

const styles = StyleSheet.create({
    cardItem: {
        padding: 10,
        borderRadius: 5,
    },
    avatarCircleSmall: {
        height: 20,
        width: 20,
        borderRadius: 10,
    },
     textDescriptionDark: {
        color: '#000',
        fontFamily: 'Roboto-Regular',
        fontSize: 12,

    },
    textDescriptionGray: {
        color: '#8c8c8c',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 12,
    },
    shadow: Platform.OS === 'ios'
    ?
    {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
    }
    :
    {
        elevation: 2,
    },
});

