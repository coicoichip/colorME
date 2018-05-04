import React, { Component } from 'react';


import {
    Button,
    Image,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import styles from '../../styles/styles';
import {GREEN_COLOR, BLUE_COLOR, RED_COLOR} from "../../styles/colors";
import { formatImageLink } from "../../helper/index"
import {showLocation} from "react-native-map-link";
import Communications from 'react-native-communications';




class ListBase extends Component {
    constructor() {
        super()

    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.item !== this.props.item) {
            return true
        }
        return false;
    }




    render() {
        const { item } = this.props;
        return (
            <View>
                <TouchableOpacity activeOpacity={0.8}
                    style={[styles.contentCardModuleEmail, styles.shadow, { marginLeft: 20, marginRight: 20, marginBottom : 10 }]}
                    >
                    <View style={styles.contentCardImageAvatarModuleEmail}>
                        <Image source={{ uri: formatImageLink(item.avatar_url) }} style={[styles.imageAvatarModuleEmail, styles.backgroundColorOfImgInBase]} />
                    </View>
                    <View style={[styles.contentCardImageInformation]}>
                        <Text numberOfLines={1} style={styles.emailNameModuleEmail}>{item.name.toUpperCase().trim()}</Text>
                        <Text numberOfLines={2} style={styles.textDescriptionDark}>{item.address.trim()}</Text>
                        <View style={{ marginTop: 2 }}>

                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                            {/*<Text style={[styles.textDescriptionDark, { color: GREEN_COLOR }]}>{item.num_rooms + " Phòng học"}</Text>*/}
                            <TouchableOpacity
                                //onPress={}
                                activeOpacity={0.8}
                                //title="Chỉ đường"
                                style={[styles.wrapperRowCenter,{backgroundColor: GREEN_COLOR,fontSize: 12, fontFamily: 'Helvetica', color: "white",width:70,height:30,borderRadius: 5,}]}
                                //accessibilityLabel="Learn more about this purple button"
                                onPress={
                                    () => showLocation({
                                         latitude: item.latitude,
                                         longitude: item.longitude,
                                    })
                                }
                            >
                                <Text  style={[{fontSize: 12, fontFamily: 'Helvetica', color: "white"}]} > Chỉ đường </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                //onPress={}
                                activeOpacity={0.8}
                                //title="Chỉ đường"
                                style={[styles.wrapperRowCenter,{backgroundColor: BLUE_COLOR,fontSize: 12, fontFamily: 'Helvetica', color: "white",width:70,height:30,borderRadius: 5, marginLeft: 10,}]}
                                //accessibilityLabel="Learn more about this purple button"
                                onPress={() => Communications.phonecall('0123456789', true)}
                            >
                                <Text  style={[{fontSize: 12, fontFamily: 'Helvetica', color: "white"}]} > Liên hệ </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ListBase


