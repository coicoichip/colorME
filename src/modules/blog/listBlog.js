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


import * as text from '../../constants/text';
import _ from "lodash"

import { formatImageLink } from "../../helper/index";

class ListBlog extends Component {
    constructor() {
        super()
    }
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.item, this.props.item)
    }

    render() {
        const { item } = this.props;
        return (
            <View>
                {/* <TouchableOpacity activeOpacity={0.8}
                    onPress={() => this.props.navigation.navigate("detailBlog", { id: item.id })} style={[styles.contentCardModuleEmail, styles.shadow, { marginLeft: 20, marginRight: 20 }]}>
                    <View style={styles.contentCardImageAvatarModuleEmail}>
                        <Image source={{ uri: formatImageLink(item.url) }} style={styles.imageAvatarModuleEmail} />
                    </View>
                    <View style={styles.contentCardImageInformation}>
                        <Text numberOfLines={1} style={[styles.emailNameModuleEmail, { color: "#000" }]}>{item.title.toUpperCase().trim()}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.textPupa, { fontSize: 12, backgroundColor: color.MAIN_COLOR }]}>{item.category_name!= "" ? item.category.name : "chưa phân loại"}</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Text numberOfLines={2} style={[styles.textDescriptionDark, { fontSize: 12 }]}>{item.description !== null ? item.description.trim() : "Không có mô tả cho bài viết này"}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Text style={[styles.textDescriptionDark, { color: color.GREEN_COLOR }]}>220 Views</Text>
                            <Text style={[styles.textDescriptionDark, { color: color.BLUE_COLOR, marginLeft: 5 }]}>11 Comments</Text>
                        </View>
                    </View>
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('detailBlog', {id: item.id})
                    }}
                    activeOpacity={0.8}
                    style={[styles.marginTopBottom, styles.paddingLeftRight, {marginBottom: 20}]}>
                    <View style={[styles.shadow, styles.imageFeature]}>
                        <Image
                            resizeMode={'cover'}
                            source={{uri: formatImageLink(item.url)}}
                            style={styles.imageFeature}
                        />
                        <Text style={[styles.categoryInImage, styles.textDescriptionLight]}>
                            {item.category !== "" ? item.category : 'Category'}
                        </Text>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text numberOfLines={1}
                              style={styles.textTitleCard}>{item.title.toUpperCase()}</Text>
                        <Text style={styles.textDescriptionCard}>{item.description !== null ? item.description.trim() : "Không có mô tả cho bà viết này"}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
}
export default ListBlog

