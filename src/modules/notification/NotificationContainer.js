import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, FlatList} from 'react-native';
import { Container, Content } from 'native-base';
import Header from '../../commons/Header';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import Loading from '../../commons/Loading';
import { notificationStore } from './notificationStore';
import HamburgerButton from '../../commons/HamburgerButton';
import { observer } from "mobx-react";
import Error from '../../commons/Error';
import TextNullData from '../../commons/TextNullData';
import ListNotification from './ListNotification';
@observer
class NotificationContainer extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentWillMount() {
        notificationStore.getListNotification(1);
    }
    renderNotification() {
        if (notificationStore.data.length == 0) {
            return <Loading />
        }
        if (notificationStore.error) {
            return (
                <Error onPress={() => this.componentWillMount()} />
            )
        }
        if (notificationStore.data.length !== 0) {
            return (
                <FlatList
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={notificationStore.data}
                    // onEndReached={() => this.getMoreSubjects()}
                    // ListFooterComponent={
                    //     this.loadMore()
                    // }
                    renderItem={({ item }) =>
                        <ListNotification item={item} navigation={this.props.navigation} />
                    }
                />
            )
        }

    }
render() {
    const { navigate } = this.props.navigation;
    return (
        <Container style={styles.wrapperContainer}>
            <Header title={STRINGS.NOTIFICATION_TITLE_HEADER} navigate={navigate} />
            {this.renderNotification()}
        </Container>
    );
}
}
export default NotificationContainer

const wrapperCenter = {
    alignItems: 'center',
    justifyContent: 'center',
};
const styles = StyleSheet.create({
    wrapperContainer: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND_GRAY,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
});