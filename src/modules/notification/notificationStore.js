import { observable, action, computed } from "mobx";
import { notificationApi, getTopicApi } from "./notificationApi";
import { Alert, AsyncStorage } from "react-native";
export const notificationStore = new class NotificationStore {
    @observable isLoading = false;
    @observable data = [];
    @observable error = false;
    @observable current_page = 0;
    @observable total_pages = 1;
    @observable isLoadingRefresh = false;
    @observable page = 1;
    
    @observable topicData = {};
    @observable isLoadingTopic = false;
    @observable errorTopic = false;

    @action
    getListNotification(page) {
        this.isLoading = true;
        this.error = false;
        notificationApi(page).then(res => {
            this.data = res.data.paginator.current_page == 1 ? res.data.notifications : [...this.data, ...res.data.notifications];
            this.current_page = res.data.paginator.current_page;
            this.total_pages = res.data.paginator.total_pages;
            this.isLoading = false;
            this.error = false;
        })
            .catch(err => {
                console.log(err);
                this.isLoading = false;
                this.error = true;
            })
    }
    @action
    getTopicInNotification(id) {
        this.isLoadingTopic = true;
        this.errorTopic = false;
        getTopicApi(id).then(res => {
            this.topicData = res.data;
            this.isLoadingTopic = false;
            this.errorTopic = false;
        })
            .catch(err => {
                this.errorTopic = true;
            })
    }
    @action
    getProductsInTopic(id, page) {
        this.getProductsInTopic(id, page).then(res => {

        })
            .catch(err => {

            })
    }
}