import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import Header from '../../commons/Header';
import styles from '../../styles/styles';

class ProfileContainer extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.wrapperContainer}>
                <Header title={'Hồ sơ'} navigate={navigate} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Hồ sơ</Text>
                </View>
            </View>
        );
    }
}
export default ProfileContainer