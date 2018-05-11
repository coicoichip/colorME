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
import { formatImageLink, dotNumber } from "../../helper/index"
class ListSubject extends Component {
    constructor() {
        super()
    }
    render() {
        const { item } = this.props;
        const { navigate } = this.props;
        return (
            <View>
                <TouchableOpacity activeOpacity={0.8} style={{marginBottom: 15}}>
                    // onPress={() => this.props.navigation.navigate('CourseInFormation', { linkId: item.id })}>
                    <View >
                        <Image source={{ uri: formatImageLink(item.image_url) }} style={styles.imageAvatarModuleEmails} />
                        <Text style={[styles.categoryInImages, styles.textDescriptionLightBold]}>
                            {item.price ? dotNumber(item.price) + ' đ' : 'Price'}
                        </Text>
                    </View>
                    <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                        <Text numberOfLines={1} style={styles.emailNameModuleEmail}>{item.name.trim()}</Text>
                        <Text style={styles.textDescriptionDark}>{item.duration} buổi</Text>
                        <View style={{ marginTop: 5 }}>
                            <Text numberOfLines={2} style={styles.textDescriptionDark}>{item.description.trim()}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.footerCard}>
                    </View>
            </View>
        )
    }
}
export default ListSubject

