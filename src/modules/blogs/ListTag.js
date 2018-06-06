import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl
} from 'react-native';
import { Content } from 'native-base'
import { STRINGS } from '../../constants';
import styles from '../../styles/styles';
import { observer } from 'mobx-react';
import blogStore from "./blogStore";
import Analytics from 'appcenter-analytics';

@observer
class ListTag extends Component {

    render() {
        return (
            <View height={40} >
                <Content
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}

                    style={[styles.paddingLeftRight]}>
                    {
                        this.props.top_tags.length == 0
                            ?
                            null
                            :
                            this.props.top_tags.map((item, i) => {
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            this.props.changeTag(item);
                                            Analytics.trackEvent(`${STRINGS.ACTION_CHOOSE_TAG} : [${item.tag.trim()}] `, {});
                                        }}
                                    >
                                        <View style={{ marginRight: 10 }}>
                                            <Text style={this.props.tag.trim() == item.tag.trim() ? styles.buttonSelected : styles.buttonNotSelect}>{item.tag}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                    }
                </Content>
            </View>
        )
    }
}
export default ListTag