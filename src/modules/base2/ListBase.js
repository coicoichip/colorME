import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import styles from '../../styles/styles';
import IconDefault from '../../commons/IconDefault';

import _ from "lodash"

import { formatImageLink } from "../../helper/index";
import * as size from "../../styles/sizes";
import {GREEN_COLOR, BLUE_COLOR, RED_COLOR} from "../../styles/colors";
import {showLocation} from "react-native-map-link";
import Communications from "react-native-communications";


class ListBase extends Component {
    constructor() {
        super()
    }
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.item, this.props.item)
    }

    render() {
        const { item } = this.props;
        console.log(item);
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[, styles.paddingLeftRight, {marginBottom: 15, marginTop:15,}]}>
                    <View style={[styles.shadow, styles.imageFeature]}>
                        <Image
                            resizeMode={'cover'}
                            source={{uri: formatImageLink(item.avatar_url)}}
                            style={styles.imageFeature}
                        />
                        <TouchableOpacity
                            onPress={() => Communications.phonecall('0123456789', true)}
                            activeOpacity={0.8}
                            style={[styles.categoryInImage]}>

                            <IconDefault
                                name="FontAwesome|phone" size={size.ICON_SIZE-5}
                                color="#FFF"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={
                                () => showLocation({
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                })
                            }
                            activeOpacity={0.8}
                            style={[styles.categoryInImage,{right: 6, backgroundColor: BLUE_COLOR,}]}>
                            <IconDefault
                                name="Entypo|direction" size={size.ICON_SIZE-5}
                                color="#FFF"
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{marginTop: 15}}>
                        <Text numberOfLines={1}
                              style={styles.textTitleCard}>{item.name.toUpperCase()}</Text>
                        <Text style={styles.textDescriptionCard}>{item.address !== null ? item.address.trim() : "Không có mô tả cho bà viết này"}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
}
export default ListBase