import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import Header from '../../commons/Header';
import styles from '../../styles/styles';

class CoursesContainer extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.wrapperContainer}>
                <Header title={'Khoá học'} navigate={navigate} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                    <Text> DrawerOpen </Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Khoá Học</Text>
                </View>
            </View>
        );
    }
}
export default CoursesContainer