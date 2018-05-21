import { observable, action, computed } from "mobx";
import { userProfileApi, updateProfileApi } from "./profileApi";
import { Alert, AsyncStorage } from "react-native";
export default getProfileStore = new class GetProfileStore {
    @observable user = {};
    @observable updateUser = {};
    @observable isLoading = false;
    @observable error = false;
    @observable isLoadingUpdate = false;
    @observable progress = [];

    @action
    getProfile() {
        this.isLoading = true;
        userProfileApi().then(res => {
            this.isLoading = false;
            this.user = res.data.data;
            this.progress = res.data.data.progress;
            this.updateUser = res.data.data;
            this.error = false;
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
            Alert.alert("Thông báo", "Cập nhật tài khoản thành công")
        })
            .catch(err => {
                this.isLoadingUpdate = false;
                Alert.alert("Thông báo", "Cập nhật thất bại, mời bạn kiểm tra đường truyền")
            })
    }

}