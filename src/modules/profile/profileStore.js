import { observable, action, computed } from "mobx";
import { userProfileApi, updateProfileApi, getDetailPortfolioApi, getPortfolioApi } from "./profileApi";
import { Alert, AsyncStorage } from "react-native";
export default getProfileStore = new class  GetProfileStore {
    @observable user = {};
    @observable updateUser = {};
    @observable isLoading = false;
    @observable error = false;
    @observable isLoadingUpdate = false;
    @observable progress = [];
    @observable isLoadingPortfolio = false;
    @observable portfolio = [];
    @observable blogs = [];
    @observable isLoadingMore = false;
    @observable isLoadingRefresh = false;
    @observable dataPortfolio = [];
    @observable blogs1 = [];
    @observable blogs2 = [];
    @observable blogs3 = [];

    @action
    getProfile() {
        this.isLoading = true;
        userProfileApi().then(res => {
            this.isLoading = false;
            this.user = res.data.data;
            this.progress = res.data.data.progress;
            this.updateUser = res.data.data;
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
            Alert.alert("Thông báo", "Cập nhật tài khoản thành công")
        })
            .catch(err => {
                this.isLoadingUpdate = false;
                Alert.alert("Thông báo", "Cập nhật thất bại, mời bạn kiểm tra đường truyền")
            })
    }
    @action
    getPortfolio() {
        this.isLoadingPortfolio = true;
        getPortfolioApi().then ( res => {
            this.isLoadingPortfolio = false;
            
            this.blogs = res.data.blogs.map((item, id) => {return { ...item, id_render: id + 1}});
            this.blogs1 = this.blogs.filter(e => {return e.id_render % 3 == 1});
            this.blogs2 = this.blogs.filter(e => {return e.id_render % 3 == 2});
            this.blogs3 = this.blogs.filter(e => {
              return e.id_render % 3 == 0;
            });
            
        })
            .catch (err => {
                this.isLoadingPortfolio = false;
                Alert.alert("Thông báo", "Cập nhật thất bại, mời bạn kiểm tra đường truyền");
            })
    }

}();