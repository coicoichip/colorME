import { observable, action, computed } from "mobx";
import { notificationApi } from "./notificationApi";
import { Alert, AsyncStorage } from "react-native";
export const notificationStore = new class NotificationStore {
    @observable isLoading = false;
    @observable data = [];
    @observable testData = [];
    @observable isLoadingRefresh = false;

    @action
    getListNotification(page, token) {
        this.isLoading = true;
        notificationApi(page, token).then(res => {
            this.isLoading = false;
            this.subjects = res.data.courses ? res.data.courses : [res.data.courses, this.subjects];
            this.data =  res.data.data.notifications ? res.data.data.notifications : [res.data.data.notifications, this.data],
            this.total_pages = res.data.paginator.total_pages;
            this.current_page = res.data.paginator.current_page;
            this.errorSubject = false;
            console.log(res);
        })
            .catch(err => {
                console.log(err);
                this.isLoading = false;
                this.errorSubject = true;
            })
    }
}