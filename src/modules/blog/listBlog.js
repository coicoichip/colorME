import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import styles from '../../styles/styles';
import { Container, Item, Input } from 'native-base';
import Header from '../../commons/Header';
import Icon from "../../commons/Icon"
import IconDefault from "../../commons/IconDefault"
import * as text from '../../constants/text';
import * as size from "../../styles/sizes";
import * as color from "../../styles/colors";
import { formatImageLink } from "../../helper/index"
class ListBlog extends Component {
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
                    onPress={() => this.props.navigation.navigate("detailBlog", { id: item.id })} style={[styles.contentCardModuleEmail, styles.shadow, { marginLeft: 20, marginRight: 20 }]}>
                    <View style={styles.contentCardImageAvatarModuleEmail}>
                        <Image source={{ uri: formatImageLink(item.url) }} style={styles.imageAvatarModuleEmail} />
                    </View>
                    <View style={styles.contentCardImageInformation}>
                        <Text numberOfLines={1} style={[styles.emailNameModuleEmail, { color: "#000" }]}>{item.title.toUpperCase().trim()}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.textPupa, { fontSize: 12, backgroundColor: color.MAIN_COLOR }]}>{item.category.name}</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Text numberOfLines={2} style={[styles.textDescriptionDark, { fontSize: 12 }]}>{item.description.trim()}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Text style={[styles.textDescriptionDark, { color: color.GREEN_COLOR }]}>220 Views</Text>
                            <Text style={[styles.textDescriptionDark, { color: color.BLUE_COLOR, marginLeft: 5 }]}>11 Comments</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
export default ListBlog

