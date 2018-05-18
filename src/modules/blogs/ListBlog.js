import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import styles from '../../styles/styles';
import {SIZES} from '../../constants';
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
                <TouchableOpacity activeOpacity={0.8} style={{marginBottom: 30, flex:1, width: SIZES.DEVICE_WIDTH_SIZE}}
                    onPress={() => this.props.navigation.navigate('DetailBlog', { slug: item.slug, kind : this.props.kind})}>
                    <View style={{flex: 1}}>
                        <Image source={{ uri: formatImageLink(item.thumb_url) }} style={{width: SIZES.DEVICE_WIDTH_SIZE, height: '100%'}} resizeMode={"contain"}/>
                        <Text style={[styles.categoryInImage, styles.textDescriptionLightBold]}>
                            {item.category ? item.category : 'Category'}
                        </Text>
                    </View>
                    <View style={styles.contentCardImageInformation}>
                        <Text numberOfLines={2} style={styles.emailNameModuleEmail}>{item.title.trim()}</Text>
                        {/* <Text style={styles.textDescriptionDark}>{item.duration} buổi</Text> */}
                        <View style={{ marginTop: 5, flexDirection : 'row' , alignItems : 'center'}}>
                            <Image
                             style = {{height : 20, width : 20, borderRadius : 10}}
                             source = {{uri : item.author.avatar_url ? formatImageLink(item.author.avatar_url) : ""}}
                             />
                             <Text style = {{fontFamily : 'Roboto-Regular', fontSize : 12 ,marginLeft : 5}}>{item.author.name.trim()}</Text>
                             <Text style = {{fontFamily : 'Roboto-Regular', fontSize : 12 ,marginLeft : 5, color : 'gray'}}>{item.time.trim()}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }
}
export default ListBlog