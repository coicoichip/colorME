import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, FlatList, RefreshControl} from 'react-native';
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
import Analytics from 'appcenter-analytics';

@observer
class NotificationContainer extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentWillMount() {
        Analytics.trackEvent(STRINGS.ACTION_ROOT_TAB_NOTIFICATION, {});
        notificationStore.getListNotification(1);
    }
    getMoreNotifications() {
        if (notificationStore.current_page < notificationStore.total_pages && notificationStore.isLoading == false) {
            notificationStore.getListNotification(notificationStore.current_page + 1)
        }
    }
    loadMore() {
        if (notificationStore.isLoading && notificationStore.current_page >= 1)
            return (<Loading />)
        else
            return null
    }

    renderNotification() {
        if (notificationStore.isLoading && notificationStore.data.length == 0) {
            return <Loading />
        } else {
            if (notificationStore.error) {
                return (
                    <Error onPress={() => notificationStore.getListNotification(1)} />
                )
            }
            if (notificationStore.data.length !== 0) {
                return (
                    <FlatList
                        keyExtractor={item => item.id + ''}
                        showsVerticalScrollIndicator={false}
    
                        data={notificationStore.data}
                        onEndReached={() => this.getMoreNotifications()}
                        ListFooterComponent={
                            this.loadMore()
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={notificationStore.isLoading && notificationStore.data.length == 0}
                                onRefresh={
                                    () => this.componentWillMount()
                                }
                            />
                        }
                        renderItem={({ item }) =>
                            <ListNotification item={item} navigation={this.props.navigation} />
                        }
                    />
                )
            }
            else {
                return (
                <TextNullData text = {"Bạn không có thông báo nào"} />
                )
            }
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