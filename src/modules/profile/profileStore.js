import { observable, action, computed } from "mobx";
import { userProfileApi, updateProfileApi, getDetailPortfolioApi, getPortfolioApi } from "./profileApi";
import { Alert, AsyncStorage } from "react-native";
import _ from "lodash"
// function gridPosts(posts){
//     posts = posts.map((post, index) => {
//         return {
//             ...post,
//             key: index
//         }
//     });
    
//     postsGrid = _.groupBy(posts, ({element, key}) => {
//         return Math.floor(key  / 3);
//     });
//     postsGrid = _.toArray(postsGrid);
//     return postsGrid;
// }
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
            Alert.alert("Thông báo", "Cập nhật tài khoản thành công")
        })
            .catch(err => {
                this.isLoadingUpdate = false;
                Alert.alert("Thông báo", ", mời bạn kiểm tra đường truyền")
            })
    }
    @action
    getPortfolio(){
        this.isLoadingPortfolio = true;
        getPortfolioApi().then (res => {
            this.isLoadingPortfolio = false;
            console.log(res.data.blogs)
            this.blogs = res.data.blogs
            
        })
            .catch (err => {
                this.isLoadingPortfolio = false;
                this.error = true;
                console.log(err)
                Alert.alert("Thông báo", ", mời bạn kiểm tra đường truyền");
            })
    }
    
    

}();