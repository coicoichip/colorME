
import React, { Component } from 'react';
import {
    TouchableOpacity, View, Text
} from 'react-native';
import Icon from './Icon';
import styles from '../styles/styles';
import { MAIN_COLOR } from '../styles/colors';
import { TEXT_ISLOADING } from '../constants/text';
import PercentageCircleCustom from './PercentageCircleCustom';

export default class ItemCardLong extends Component {
    render() {
        const { title, value, total, loading, navigate, route } = this.props;
        return (
            <TouchableOpacity
                onPress={() => navigate(route)}
                activeOpacity={0.8}
                style={{ padding: 20 }}>
                <View style={[styles.wrapperRowSpaceBetween, styles.itemCardLong, styles.shadow]}>
                    <View style={[styles.wrapperRowCenterHorizontal, { alignItems: 'center' }]}>
                        <PercentageCircleCustom value={loading ? 0 : parseFloat(value) / parseFloat(total) * 100} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.textDescriptionGray}>{title}</Text>
                            <Text style={[styles.textNumberInItemCard, { marginTop: 5 }]}>{loading ? TEXT_ISLOADING : `${value}/${total}`}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
