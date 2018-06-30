import { observable, action, computed } from "mobx";
import { userProfileApi, updateProfileApi, getDetailPortfolioApi, getPortfolioApi , reserveStudyApi} from "./profileApi";
import { Alert, AsyncStorage } from "react-native";
import _ from "lodash"
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
    @observable isLoadingPortfolio = false;
    @observable portfolio = [];
    @observable blogs = [];
    @observable isLoadingMore = false;
    @observable isLoadingRefresh = false;
    @observable dataPortfolio = [];
    @observable modalReserve = false;
    @observable isLoadingReserve = false;
    @action
    getProfile() {
        this.isLoading = true;
        userProfileApi().then(res => {
            // console.log(res.data.data.registers)
            this.isLoading = false;
            this.user = res.data.data;
            this.progress = res.data.data.progress;
            this.updateUser = res.data.data;
            this.error = false;
            //console.log(this.user);
        })
            .catch(err => {
                console.log(err)
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
            Analytics.trackEvent(STRINGS.ACTION_UPDATE_PROFILE + ': ' + user.email, {})

        })
            .catch(err => {
                this.isLoadingUpdate = false;
                Alert.alert("Thông báo", ", mời bạn kiểm tra đường truyền");
                Analytics.trackEvent(STRINGS.ACTION_UPDATE_PROFILE_FAIL + ': ' + user.email, {})

            })
    }
    @action
    getPortfolio() {
        this.isLoadingPortfolio = true;
        getPortfolioApi().then(res => {
            this.isLoadingPortfolio = false;
            console.log(res.data.blogs)
            this.blogs = res.data.blogs

        })
            .catch(err => {
                this.isLoadingPortfolio = false;
                this.error = true;
                console.log(err)
                Alert.alert("Thông báo", ", mời bạn kiểm tra đường truyền");
            })
    }
    @action
    reserveStudy(class_id){
        this.isLoadingReserve = true;
        this.modalReserve = true;
        reserveStudyApi(class_id).then(res=> {
            this.isLoadingReserve = false;
            Alert.alert("Thông báo", "Phản hồi của bạn đã được ghi nhận, chúng tôi sẽ liên lạc với bạn sau",[
                {text : "OK", onPress : ()=> {this.modalReserve = false}}
            ])
        }).catch(err=> {
            this.isLoadingReserve = false;
            Alert.alert("Thông báo", "Kết nối thất bại, kiểm tra lại đường truyền",[
                {text : "OK", onPress : () => {this.modalReserve = false}}
            ])
        })
    }



}();