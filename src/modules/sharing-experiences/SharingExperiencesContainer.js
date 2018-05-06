import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import Header from '../../commons/Header';
import styles from '../../styles/styles';
import {STRINGS} from "../../constants"
class SharingExperienceseContainer extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.wrapperContainer}>
                <Header title={STRINGS.SHARING_EXPERIENCES_TITLE_HEADER} navigate={navigate} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Chia sẻ khinh nghiệm</Text>
                </View>
            </View>
        );
    }
}
export default SharingExperienceseContainer