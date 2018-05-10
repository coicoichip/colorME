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
import { formatImageLink } from "../../helper/index";

import _ from "lodash";
class ListBlog extends Component {
    constructor() {
        super()
    }
    render() {
        const { item } = this.props;
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('DetailBlog', {slug: item.slug})
                    }}
                    activeOpacity={0.8}
                    style={[styles.marginTopBottom, styles.paddingLeftRight, {marginBottom: 20}]}>
                    <View style={[styles.shadow, styles.imageFeature]}>
                        <Image
                            resizeMode={'cover'}
                            source={{uri: formatImageLink(item.thumb_url)}}
                            style={styles.imageFeature}
                        />
                        <Text style={[styles.categoryInImage, styles.textDescriptionLightBold]}>
                            {item.category ? item.category : 'Category'}
                        </Text>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text numberOfLines={1}
                              style={[styles.textTitleBlog, {fontSize : 15}]}>{item.title.toUpperCase()}</Text>
                        <Text style={styles.textDescriptionCard}>{item.description ? item.description.trim() : "Không có mô tả cho bài viết này"}</Text>
                    </View>

                </TouchableOpacity>

            </View>
        )
    }
}
export default ListBlog

