import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';

import styles from '../../styles/styles';

import { Container, Content } from 'native-base';
import Header from '../../commons/Header';
import HamburgerButton from '../../commons/HamburgerButton'
import {STRINGS} from "../../constants"
class NotificationContainer extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.wrapperContainer}>
                <Header title={STRINGS.NOTIFICATION_TITLE_HEADER} navigate={navigate} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Thông báo</Text>
                </View>
            </Container>
        );
    }
}
export default NotificationContainer