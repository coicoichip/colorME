import { observable, action, computed } from "mobx";
import { notificationApi } from "./notificationApi";
import { Alert, AsyncStorage } from "react-native";
export const notificationStore = new class NotificationStore {
    @observable isLoading = false;
    @observable data = [];
    @observable error = false;
    @observable testData = [];
    @observable isLoadingRefresh = false;
    @observable page = 1;

    @action
    getListNotification(page) {
        this.isLoading = true;
        notificationApi(page).then(res => {
            this.isLoading = false;
            this.data = res.data.data.notifications;
            this.error = false;
        })
            .catch(err => {
                console.log(err);
                this.isLoading = false;
                this.error = true;
            })
    }
}