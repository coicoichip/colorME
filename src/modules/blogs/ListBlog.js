import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import * as color from '../../styles/colors';
import * as size from '../../styles/sizes';
import {STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import { Container, Item, Input } from 'native-base';
import Header from '../../commons/Header';
import Icon from "../../commons/Icon"
import { formatImageLink } from "../../helper/index";
import Analytics from 'appcenter-analytics';

import _ from "lodash";
class ListBlog extends Component {
    goDetailBlog = () => {
        const { item, navigation } = this.props;
        Analytics.trackEvent(`${STRINGS.ACTION_GO_DETAIL_BLOG} ->  ${item.title.trim()}`, {})
        navigation.navigate('DetailBlog', { slug: item.slug, kind : this.props.kind, id : item.id})
    }
    render() {
        const { item } = this.props;
        return (
                <View>
                <TouchableOpacity activeOpacity={0.8} style={{marginBottom: 15}}
                    onPress={this.goDetailBlog}>
                    <View >
                        <Image source={{ uri: item.thumb_url? formatImageLink(item.thumb_url) : ""}} style={styles.imageAvatarModuleEmails} />
                        <Text style={[styles.categoryInImages, styles.textDescriptionLightBold, {fontWeight: 'bold'}]}>
                            {item.category!=="" ? item.category : 'Category'}
                        </Text>
                    </View>
                    <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                        <Text numberOfLines={2} style={styles.emailNameModuleEmail}>{item.title.trim()}</Text>
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
                <View style={styles.footerCard}>
                    </View>
            </View>
        )
    }
}
export default ListBlog
const wrapperCenter = {
    alignItems: 'center',
    justifyContent: 'center',
};
const buttonTab = {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 13,
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
    fontFamily: FONTS.FONT_MAIN,
    color: color.BACKGROUND_COLOR,
};

const styles = StyleSheet.create({
    imageAvatarModuleEmails: {
        width: size.deviceWidth,
        height:size.deviceHeight/3.3,
    },
    categoryInImages:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: COLORS.MAIN_COLOR,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 13,
        overflow: "hidden"
    },
    textDescriptionLightBold: {
        color: '#FFF',
        fontFamily: FONTS.FONT_MAIN_BOLD,
        fontSize: 14,
    },
    contentCardImageInformation: {
        flex: 2,
        position: 'relative',
        paddingRight: 10,
        paddingTop : 5,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    emailNameModuleEmail: {
        fontSize: 20,
        paddingTop: 10,
    },
    textDescriptionDark: {
        fontFamily: FONTS.MAIN_FONT,
        color: '#000',
        fontSize: SIZES.DESCRIPTION_SIZE,

    },
    footerCard: {
        height: 25,
        backgroundColor: 'rgb(240, 240, 240)'
    },
});
