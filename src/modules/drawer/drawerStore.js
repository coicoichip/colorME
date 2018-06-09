import { observable, action, computed } from "mobx";
import { getProfileApi } from "./drawerApi";
import { Alert, AsyncStorage } from "react-native";
import Analytics from 'appcenter-analytics';
import { STRINGS } from "../../constants";


export const drawerStore = new class DrawerStore {
    @observable user = {};
    @observable isLoadingProfile = false;
    @observable errorProfile = false;

    @action
    getProfile() {
        getProfileApi().then(res => {
            this.user = res.data.data.user;
            this.isLoadingProfile = true;
            Analytics.trackEvent(STRINGS.ACTION_LOGOUT, {})
        })
            .catch(err => {
                this.isLoadingProfile = false;
                this.errorProfile = true;
                Analytics.trackEvent(STRINGS.ACTION_LOGOUT_FAIL, {})
            })
    }
}