import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import Header from '../../commons/Header';
import styles from '../../styles/styles';
import {STRINGS} from "../../constants"
class ProfileContainer extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.wrapperContainer}>
                <Header title={STRINGS.PROFILE_TITLE_HEADER} navigate={navigate} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Hồ sơ</Text>
                </View>
            </View>
        );
    }
}
export default ProfileContainer