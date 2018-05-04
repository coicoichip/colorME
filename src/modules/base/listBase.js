import React, { Component } from 'react';


import {
    Image,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import styles from '../../styles/styles';
import { GREEN_COLOR, BLUE_COLOR } from "../../styles/colors";


import { formatImageLink } from "../../helper/index"

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
                    onPress={() => this.props.navigation("detailBase", {
                        id: item.id,
                        name: item.name,
                    })}>
                    <View style={styles.contentCardImageAvatarModuleEmail}>
                        <Image source={{ uri: formatImageLink(item.avatar_url) }} style={[styles.imageAvatarModuleEmail, styles.backgroundColorOfImgInBase]} />
                    </View>
                    <View style={[styles.contentCardImageInformation]}>
                        <Text numberOfLines={1} style={styles.emailNameModuleEmail}>{item.name.toUpperCase().trim()}</Text>
                        <Text numberOfLines={2} style={styles.textDescriptionDark}>{item.address.trim()}</Text>
                        <View style={{ marginTop: 2 }}>
                            <Text numberOfLines={2} style={styles.textDescriptionDark}>{item.num_classes_registering + " lớp đang tuyển sinh"}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Text style={[styles.textDescriptionDark, { color: GREEN_COLOR }]}>{item.num_rooms + " Phòng học"}</Text>
                            <Text style={[styles.textDescriptionDark, { color: BLUE_COLOR, marginLeft: 5 }]}>{item.num_employees + " Nhân viên"}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ListBase


