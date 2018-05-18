import { observable, action, computed } from "mobx";
import { userProfileApi } from "./profileApi";
import { Alert, AsyncStorage } from "react-native";
export default  getProfileStore = new class GetProfileStore  {
    @observable user = {};
    @observable isloading = false;
    @observable error = false;

    @action 
    getProfile(){
        this.isLoading = true;
        userProfileApi().then(res => {
            console.log(res)
            this.isLoading = false;
            this.user= res.data.user; 
            this.error= false;
            
        })
            .catch(err => {
                this.isLoading = false;
                this.error = true;
            })
    }
}