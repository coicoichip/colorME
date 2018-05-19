
import { observable, action, computed } from "mobx";
import { loginApi } from "./loginApi";
import { Alert, AsyncStorage } from "react-native"
import { NavigationActions } from "react-navigation";
import { STRINGS } from "../../constants";
import { resetScreen } from '../../helper';

export default loginStore = new class LoginStore {
    @observable login = { email: "", password: "" };
    @observable loginStatus = false;
    @observable token = null;
    @observable isLoading = false;
    @observable error = false;
    @observable result = false;
    @observable isGetLocalData = false;
    @observable status = 0;
    @observable user = {};

    @action
    loginUser(navigation) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (this.login.email == '' || this.login.password == '') {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.EMPTY_INFOR);
            return;
        } if (reg.test(this.login.email) == false) {
            Alert.alert(STRINGS.HAVE_ERROR, STRINGS.WRONG_EMAIL);
            return;
        }
        this.isLoading = true;
        loginApi(this.login).then(res => {
            if (navigation) {
                resetScreen(navigation, 'Drawer');
            }
            this.isLoading = false;
            this.token = res.data.token;
            this.user = res.data.user;
            this.status = res.status;
            this.loginStatus = true;
            AsyncStorage.setItem('@UserToken', res.data.token);
            AsyncStorage.setItem('@username', res.data.user.username)
        })
            .catch(err => {
                this.isLoading = false;
                Alert.alert(STRINGS.LOGIN_ERROR, STRINGS.MESSAGE_LOGIN_ERROR)
            })
    }

    @action
    logout(navigation) {
        AsyncStorage.removeItem('@UserToken').then(res => {
            resetScreen(navigation, 'Login');
        });
    }
    @action 
    async saveData(){
       try{
           await AsyncStorage.setItem('email', this.login.email)
           await AsyncStorage.setItem('password', this.login.password)
       }
       catch (err){

       }
    }
    @action
    async getData(){
        try{
             const email = await AsyncStorage.getItem('email');
             const password = await AsyncStorage.getItem('password')
             const username = await AsyncStorage.getItem('@usermame')
             this.login = {
                 email : email,
                 password : password
             }
             
        }
        catch (err){}
    }
}