import { observable, action, computed } from "mobx";
import { getProfileApi } from "./drawerApi";
import { Alert, AsyncStorage } from "react-native";
export const drawerStore = new class DrawerStore {
    @observable user = {};
    @observable isLoadingProfile = false;
    @observable errorProfile = false;

    @action
    getProfile() {
        getProfileApi().then(res => {
            this.user = res.data.data.user;
            this.isLoadingProfile = true;
        })
            .catch(err => {
                this.isLoadingProfile = false;
                this.errorProfile = true;
            })
    }
}