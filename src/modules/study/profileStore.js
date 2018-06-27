import { observable, action, computed } from "mobx";
import { userProfileApi, updateProfileApi } from "./profileApi";
import { Alert, AsyncStorage } from "react-native";
import Analytics from 'appcenter-analytics';
import { STRINGS } from '../../constants'
export default getProfileStore = new class GetProfileStore {
    @observable user = {};
    @observable updateUser = {};
    @observable isLoading = false;
    @observable error = false;
    @observable isLoadingUpdate = false;
    @observable progress = [];
    @observable registers = [];
    @action
    getProfile() {
        this.isLoading = true;
        userProfileApi().then(res => {
            this.isLoading = false;
            this.user = res.data.data;
            this.progress = res.data.data.progress;
            this.updateUser = res.data.data;
            this.registers = res.data.data.registers;
            this.error = false;
            //console.log(this.user);
        })
            .catch(err => {
                this.isLoading = false;
                this.error = true;
            })
    }
    @action
    updateProfile(user) {
        this.isLoadingUpdate = true;
        updateProfileApi(user).then((res) => {
            this.isLoadingUpdate = false;
            this.user = user;
            Alert.alert("Thông báo", "Cập nhật tài khoản thành công");
            Analytics.trackEvent(STRINGS.ACTION_UPDATE_PROFILE_STUDENT, {});

        })
            .catch(err => {
                this.isLoadingUpdate = false;
                Alert.alert("Thông báo", "Cập nhật thất bại, mời bạn kiểm tra đường truyền")
            })
    }

}