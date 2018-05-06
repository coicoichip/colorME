import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import styles from '../../styles/styles';
import { Container, Item, Input } from 'native-base';
import Header from '../../commons/Header';
import Icon from "../../commons/Icon"
import IconDefault from "../../commons/IconDefault"
import { formatImageLink } from "../../helper/index"
class ListSubject extends Component {
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
                    style={[styles.contentCardModuleEmail, styles.shadow, { marginLeft: 20, marginRight: 20 }]}>
                    <View style={styles.contentCardImageAvatarModuleEmail}>
                        <Image source={{ uri: formatImageLink(item.image_url) }} style={styles.imageAvatarModuleEmail} />
                    </View>
                    <View style={styles.contentCardImageInformation}>
                        <Text numberOfLines={1} style={styles.emailNameModuleEmail}>{item.name.toUpperCase().trim()}</Text>
                        <Text numberOfLines={2} style={styles.textDescriptionDark}>{item.description.trim()}</Text>
                        <View style={{ marginTop: 2 }}>
                            <Text numberOfLines={2} style={styles.textDescriptionDark}>320 lớp đã học</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Text style={[styles.textDescriptionDark, { color: "#2bff47", fontSize: 11 }]}>{item.num_classes} lớp đã học</Text>
                            <Text style={[styles.textDescriptionDark, { color: "#4796ff", marginLeft: 5, fontSize: 11 }]}>1790 học viên</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
export default ListSubject

